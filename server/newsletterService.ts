/**
 * newsletterService — centralized newsletter subscription logic.
 *
 * All routes call this service instead of wiring storage/mailchimp/email
 * inline. Swap the underlying provider (Mailchimp → ConvertKit → Brevo)
 * by editing syncProvider() only — no route changes needed.
 */
import { storage } from "./storage";
import { addMailchimpSubscriber, tagMailchimpSubscriber } from "./mailchimp";
import { sendWelcomeEmail } from "./newsletter-email";
import type { InsertNewsletterSubscriber } from "@shared/schema";

export interface SubscribeOptions extends InsertNewsletterSubscriber {
  /** Where the signup originated — used for Mailchimp tagging. */
  source?: string;
}

export interface SubscribeResult {
  success: boolean;
  duplicate: boolean;
  subscriberId?: string;
}

export const newsletterService = {
  /** Returns true when the email is already in the database. */
  async checkDuplicate(email: string): Promise<boolean> {
    const existing = await storage.getNewsletterSubscriberByEmail(
      email.toLowerCase().trim(),
    );
    return !!existing;
  },

  /**
   * Subscribe a new member.
   * - Duplicate emails resolve gracefully (success: true, duplicate: true).
   * - Side-effects (Mailchimp sync, welcome email) fire in the background
   *   so the HTTP response is never blocked by third-party latency.
   */
  async subscribe(opts: SubscribeOptions): Promise<SubscribeResult> {
    const { source = "Newsletter Page", ...data } = opts;

    const isDuplicate = await this.checkDuplicate(data.email);
    if (isDuplicate) {
      return { success: true, duplicate: true };
    }

    const subscriber = await storage.createNewsletterSubscriber(data);

    // Fire-and-forget — errors are logged but don't fail the subscription.
    Promise.allSettled([
      addMailchimpSubscriber({
        email: data.email,
        firstName: data.firstName ?? undefined,
        lastName: data.lastName ?? undefined,
        source,
      }).then(() => tagMailchimpSubscriber(data.email, source)),
      sendWelcomeEmail({
        email: data.email,
        firstName: data.firstName ?? undefined,
      }),
    ]).then((results) => {
      results.forEach((r, i) => {
        if (r.status === "rejected") {
          const label = i === 0 ? "mailchimp" : "welcome-email";
          console.error(`[newsletterService] ${label} failed:`, r.reason);
        }
      });
    });

    return { success: true, duplicate: false, subscriberId: subscriber.id };
  },

  /**
   * Remove a subscriber from the local database.
   * External provider (Mailchimp) unsubscribe must be handled separately
   * via the provider dashboard or their own unsubscribe link.
   */
  async unsubscribe(email: string): Promise<{ success: boolean }> {
    try {
      await storage.deleteNewsletterSubscriber(email.toLowerCase().trim());
      return { success: true };
    } catch (err) {
      console.error("[newsletterService] unsubscribe error:", err);
      return { success: false };
    }
  },

  /**
   * Manually trigger a provider sync for an existing subscriber.
   * Useful for retries or when adding a new provider mid-lifecycle.
   */
  async syncProvider(
    email: string,
    opts: { firstName?: string; lastName?: string; source?: string },
  ): Promise<void> {
    const { source = "Manual Sync", firstName, lastName } = opts;
    try {
      await addMailchimpSubscriber({ email, firstName, lastName, source });
      await tagMailchimpSubscriber(email, source);
    } catch (err) {
      console.error("[newsletterService] syncProvider error:", err);
    }
  },
};
