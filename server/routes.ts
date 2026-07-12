import type { Express, Request } from "express";
import { createServer, type Server } from "http";
import rateLimit from "express-rate-limit";
import { storage } from "./storage";
import { insertNewsletterSubscriberSchema, insertContactSubmissionSchema } from "@shared/schema";
import { fromError } from "zod-validation-error";
import { sendContactNotification, sendContactConfirmation } from "./email";
import { addMailchimpSubscriber, tagMailchimpSubscriber } from "./mailchimp";
import { sendWelcomeEmail } from "./newsletter-email";

// ─── Rate limiters ────────────────────────────────────────────────────────────
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: "Too many submissions. Please try again in 15 minutes." },
});

const newsletterLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: "Too many requests. Please try again later." },
});

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {

  // ── Newsletter ──────────────────────────────────────────────────────────────
  app.post("/api/newsletter", newsletterLimiter, async (req, res) => {
    try {
      // source lets the frontend tell us where the signup came from
      // e.g. "Newsletter Page", "Homepage Footer" — used for Mailchimp tagging
      const { source = "Newsletter Page", ...rawBody } = req.body ?? {};
      const data = insertNewsletterSubscriberSchema.parse(rawBody);

      // Duplicate check — still succeed gracefully for the UX
      const existing = await storage.getNewsletterSubscriberByEmail(data.email);
      if (existing) {
        return res.status(200).json({ message: "You're already subscribed." });
      }

      // Persist to DB
      await storage.createNewsletterSubscriber(data);

      // Mailchimp + welcome email — fire concurrently, never block the response
      Promise.allSettled([
        addMailchimpSubscriber({ email: data.email, firstName: data.firstName ?? undefined, lastName: data.lastName ?? undefined, source })
          .then(() => tagMailchimpSubscriber(data.email, source)),
        sendWelcomeEmail({ email: data.email, firstName: data.firstName ?? undefined }),
      ]).then((results) => {
        results.forEach((r, i) => {
          if (r.status === "rejected") {
            const label = i === 0 ? "mailchimp" : "welcome-email";
            console.error(`[newsletter] ${label} failed:`, r.reason);
          }
        });
      });

      return res.status(201).json({ message: "Subscribed successfully." });
    } catch (err: any) {
      if (err?.name === "ZodError") {
        return res.status(400).json({ message: fromError(err).toString() });
      }
      console.error("[newsletter]", err);
      return res.status(500).json({ message: "Failed to subscribe. Please try again." });
    }
  });

  // ── Contact form ────────────────────────────────────────────────────────────
  app.post("/api/contact", contactLimiter, async (req: Request, res) => {
    try {
      const data = insertContactSubmissionSchema.parse(req.body);

      const ipAddress =
        (req.headers["x-forwarded-for"] as string)?.split(",")[0]?.trim() ||
        req.socket.remoteAddress ||
        undefined;
      const userAgent = (req.headers["user-agent"] as string) || undefined;
      const timestamp = new Date().toUTCString();

      await storage.createContactSubmission({ ...data, ipAddress, userAgent });

      const fullName = [data.firstName, data.lastName].filter(Boolean).join(" ").trim();

      const emailResults = await Promise.allSettled([
        sendContactNotification({
          name:        fullName,
          email:       data.email,
          phone:       data.phone || undefined,
          country:     data.country || undefined,
          subject:     data.subject,
          enquiryType: data.enquiryType ?? "general",
          message:     data.message,
          ipAddress,
          userAgent,
          timestamp,
        }),
        sendContactConfirmation({ name: fullName, email: data.email }),
      ]);

      emailResults.forEach((r, i) => {
        if (r.status === "rejected") {
          console.error(`[contact] email ${i === 0 ? "notification" : "confirmation"} failed:`, r.reason);
        }
      });

      return res.status(200).json({ message: "Message sent successfully." });
    } catch (err: any) {
      if (err?.name === "ZodError") {
        return res.status(400).json({ message: fromError(err).toString() });
      }
      console.error("[contact]", err);
      return res.status(500).json({ message: "Failed to send message. Please try again." });
    }
  });

  return httpServer;
}
