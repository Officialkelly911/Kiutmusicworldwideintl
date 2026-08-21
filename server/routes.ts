import type { Express, Request } from "express";
import { createServer, type Server } from "http";
import rateLimit from "express-rate-limit";
import { insertNewsletterSubscriberSchema, insertContactSubmissionSchema } from "@shared/schema";
import { fromError } from "zod-validation-error";
import { newsletterService } from "./newsletterService";
import { contactService } from "./contactService";

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
  app: Express,
): Promise<Server> {

  // ── Newsletter ──────────────────────────────────────────────────────────────
  app.post("/api/newsletter", newsletterLimiter, async (req, res) => {
    try {
      // Honeypot — bots fill this invisible field, humans never see it
      const { source = "Newsletter Page", website: honeypot, ...rawBody } = req.body ?? {};
      if (honeypot) {
        // Silently fake success so bots don't learn the field is checked
        return res.status(201).json({ message: "Subscribed successfully." });
      }

      const data = insertNewsletterSubscriberSchema.parse(rawBody);
      const result = await newsletterService.subscribe({ ...data, source });

      if (result.duplicate) {
        return res.status(200).json({
          message: "You're already subscribed.",
          duplicate: true,
        });
      }

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
      // Honeypot — bots fill this invisible field, humans never see it
      const { website: honeypot, ...body } = req.body ?? {};
      if (honeypot) {
        return res.status(200).json({ message: "Message sent successfully." });
      }

      const data = insertContactSubmissionSchema.parse(body);

      const ipAddress =
        (req.headers["x-forwarded-for"] as string)?.split(",")[0]?.trim() ||
        req.socket.remoteAddress ||
        undefined;
      const userAgent = (req.headers["user-agent"] as string) || undefined;

      await contactService.submit(data, { ipAddress, userAgent });

      return res.status(200).json({ message: "Message sent successfully." });
    } catch (err: any) {
      if (err?.name === "ZodError") {
        return res.status(400).json({ message: fromError(err).toString() });
      }
      console.error("[contact]", err);
      return res.status(500).json({ message: "Failed to send message. Please try again." });
    }
  });

  // ── Newsletter unsubscribe ──────────────────────────────────────────────────
  app.post("/api/newsletter/unsubscribe", async (req, res) => {
    try {
      const { email } = req.body ?? {};
      if (!email || typeof email !== "string") {
        return res.status(400).json({ message: "Email is required." });
      }
      await newsletterService.unsubscribe(email);
      return res.status(200).json({ message: "Unsubscribed successfully." });
    } catch (err) {
      console.error("[newsletter/unsubscribe]", err);
      return res.status(500).json({ message: "Failed to unsubscribe. Please try again." });
    }
  });

  return httpServer;
}
