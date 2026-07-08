import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertNewsletterSubscriberSchema } from "@shared/schema";
import { fromError } from "zod-validation-error";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // put application routes here
  // prefix all routes with /api

  app.post("/api/newsletter", async (req, res) => {
    try {
      const data = insertNewsletterSubscriberSchema.parse(req.body);

      const existing = await storage.getNewsletterSubscriberByEmail(
        data.email,
      );
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
        const message = fromError(err).toString();
        return res.status(400).json({ message });
      }
      console.error(err);
      return res.status(500).json({ message: "Failed to subscribe." });
    }
  });

  return httpServer;
}
