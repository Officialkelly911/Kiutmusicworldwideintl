import type { Express, Request } from "express";
import { createServer, type Server } from "http";
import rateLimit from "express-rate-limit";
import { storage } from "./storage";
import { insertNewsletterSubscriberSchema, insertContactSubmissionSchema } from "@shared/schema";
import { fromError } from "zod-validation-error";
import { sendContactNotification, sendContactConfirmation } from "./email";

// ─── Rate limiters ────────────────────────────────────────────────────────────
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
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
      const data = insertNewsletterSubscriberSchema.parse(req.body);
      const existing = await storage.getNewsletterSubscriberByEmail(data.email);
      if (existing) {
        return res.status(200).json({
          message: "You're already subscribed.",
          subscriber: { email: existing.email },
        });
      }
      const subscriber = await storage.createNewsletterSubscriber(data);
      return res.status(201).json({
        message: "Subscribed successfully.",
        subscriber: { email: subscriber.email },
      });
    } catch (err) {
      if (err instanceof Error && err.name === "ZodError") {
        return res.status(400).json({ message: fromError(err).toString() });
      }
      console.error("[newsletter]", err);
      return res.status(500).json({ message: "Failed to subscribe." });
    }
  });

  // ── Contact form ────────────────────────────────────────────────────────────
  app.post("/api/contact", contactLimiter, async (req: Request, res) => {
    try {
      // Validate + sanitize
      const data = insertContactSubmissionSchema.parse(req.body);

      const ipAddress =
        (req.headers["x-forwarded-for"] as string)?.split(",")[0]?.trim() ||
        req.socket.remoteAddress ||
        undefined;
      const userAgent = (req.headers["user-agent"] as string) || undefined;
      const timestamp = new Date().toUTCString();

      // Persist to DB
      await storage.createContactSubmission({ ...data, ipAddress, userAgent });

      // Fire emails concurrently — do not let email failure block the response
      const emailResults = await Promise.allSettled([
        sendContactNotification({
          name:        data.name ?? "",
          email:       data.email,
          subject:     data.subject,
          enquiryType: data.enquiryType ?? "general",
          message:     data.message,
          ipAddress,
          userAgent,
          timestamp,
        }),
        sendContactConfirmation({ name: data.name ?? "", email: data.email }),
      ]);

      // Log email errors without surfacing them to the user
      emailResults.forEach((r, i) => {
        if (r.status === "rejected") {
          console.error(`[contact] email ${i === 0 ? "notification" : "confirmation"} failed:`, r.reason);
        }
      });

      return res.status(200).json({ message: "Message sent successfully." });
    } catch (err: any) {
      if (err?.name === "ZodError") {
        const message = fromError(err).toString();
        return res.status(400).json({ message });
      }
      console.error("[contact]", err);
      return res.status(500).json({ message: "Failed to send message. Please try again." });
    }
  });

  return httpServer;
}
