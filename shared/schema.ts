import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, pgEnum } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export const newsletterSubscribers = pgTable("newsletter_subscribers", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: text("email").notNull().unique(),
  name: text("name"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertNewsletterSubscriberSchema = createInsertSchema(
  newsletterSubscribers,
)
  .pick({
    email: true,
    name: true,
  })
  .extend({
    email: z.string().email(),
    name: z.string().trim().min(1).optional().or(z.literal("")),
  });

export type InsertNewsletterSubscriber = z.infer<
  typeof insertNewsletterSubscriberSchema
>;
export type NewsletterSubscriber = typeof newsletterSubscribers.$inferSelect;

// ─── Contact submissions ──────────────────────────────────────────────────────
export const contactStatusEnum = pgEnum("contact_status", ["pending", "read", "replied"]);

export const contactSubmissions = pgTable("contact_submissions", {
  id:          varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name:        text("name"),
  email:       text("email").notNull(),
  subject:     text("subject").notNull(),
  enquiryType: text("enquiry_type").notNull().default("general"),
  message:     text("message").notNull(),
  status:      contactStatusEnum("status").notNull().default("pending"),
  ipAddress:   text("ip_address"),
  userAgent:   text("user_agent"),
  createdAt:   timestamp("created_at").notNull().defaultNow(),
});

export const insertContactSubmissionSchema = createInsertSchema(contactSubmissions)
  .pick({ name: true, email: true, subject: true, enquiryType: true, message: true })
  .extend({
    name:        z.string().trim().max(100).optional().or(z.literal("")),
    email:       z.string().email("Please enter a valid email address"),
    subject:     z.string().trim().min(2, "Subject is required").max(200),
    enquiryType: z.enum(["booking", "press", "business", "general"]).default("general"),
    message:     z.string().trim().min(10, "Message must be at least 10 characters").max(5000, "Message is too long"),
  });

export type InsertContactSubmission = z.infer<typeof insertContactSubmissionSchema>;
export type ContactSubmission = typeof contactSubmissions.$inferSelect;
