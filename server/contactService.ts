/**
 * contactService — centralized contact form submission logic.
 *
 * One shared submit() function handles DB persistence + email dispatch.
 * Named entry-points (submitBooking, submitGeneral, etc.) enforce correct
 * enquiryType so routes never have to pass it manually.
 */
import { storage } from "./storage";
import { sendContactNotification, sendContactConfirmation } from "./email";
import { sanitizeFields } from "./sanitize";
import type { InsertContactSubmission } from "@shared/schema";

export interface SubmissionMeta {
  ipAddress?: string;
  userAgent?: string;
}

export interface SubmitResult {
  success: boolean;
  submissionId?: string;
}

type SubmitData = InsertContactSubmission & { metadata?: string };

async function submit(
  data: SubmitData,
  meta: SubmissionMeta,
): Promise<SubmitResult> {
  const timestamp = new Date().toUTCString();

  // Defense-in-depth: strip any HTML/script markup from free-text fields
  // before they're persisted or emailed, beyond what zod validation already enforces.
  data = sanitizeFields(data, ["firstName", "lastName", "subject", "message"]);

  const submission = await storage.createContactSubmission({
    ...data,
    ipAddress: meta.ipAddress,
    userAgent: meta.userAgent,
  });

  const fullName = [data.firstName, data.lastName]
    .filter(Boolean)
    .join(" ")
    .trim();

  // Emails fire concurrently — errors are logged but never surface to the caller
  Promise.allSettled([
    sendContactNotification({
      name: fullName,
      email: data.email,
      phone: data.phone || undefined,
      country: data.country || undefined,
      subject: data.subject,
      enquiryType: data.enquiryType ?? "general",
      message: data.message,
      metadata: data.metadata || undefined,
      ipAddress: meta.ipAddress,
      userAgent: meta.userAgent,
      timestamp,
    }),
    sendContactConfirmation({ name: fullName, email: data.email }),
  ]).then((results) => {
    results.forEach((r, i) => {
      if (r.status === "rejected") {
        const label = i === 0 ? "notification" : "confirmation";
        console.error(`[contactService] ${label} email failed:`, r.reason);
      }
    });
  });

  return { success: true, submissionId: submission.id };
}

export const contactService = {
  /** Auto-dispatches based on data.enquiryType — preferred for route handlers. */
  async submit(data: SubmitData, meta: SubmissionMeta): Promise<SubmitResult> {
    return submit(data, meta);
  },

  async submitGeneral(data: InsertContactSubmission, meta: SubmissionMeta) {
    return submit({ ...data, enquiryType: "general" }, meta);
  },

  async submitBooking(data: SubmitData, meta: SubmissionMeta) {
    return submit({ ...data, enquiryType: "booking" }, meta);
  },

  async submitBusiness(data: InsertContactSubmission, meta: SubmissionMeta) {
    return submit({ ...data, enquiryType: "business" }, meta);
  },

  async submitPress(data: InsertContactSubmission, meta: SubmissionMeta) {
    return submit({ ...data, enquiryType: "press" }, meta);
  },

  async submitCollaboration(
    data: InsertContactSubmission,
    meta: SubmissionMeta,
  ) {
    return submit({ ...data, enquiryType: "collaboration" }, meta);
  },

  async submitLicensing(data: InsertContactSubmission, meta: SubmissionMeta) {
    return submit({ ...data, enquiryType: "licensing" }, meta);
  },
};
