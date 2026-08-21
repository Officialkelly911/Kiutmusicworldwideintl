import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, pgEnum, boolean } from "drizzle-orm/pg-core";
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
  firstName: text("first_name"),
  lastName: text("last_name"),
  country: text("country"),
  favoritePlatform: text("favorite_platform"),
  favoriteGenre: text("favorite_genre"),
  preferences: text("preferences").array(),
  consent: boolean("consent").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertNewsletterSubscriberSchema = createInsertSchema(
  newsletterSubscribers,
)
  .pick({
    email: true,
    firstName: true,
    lastName: true,
    country: true,
    favoritePlatform: true,
    favoriteGenre: true,
    preferences: true,
  })
  .extend({
    email: z.string().email(),
    firstName: z.string().trim().min(1).max(80).optional().or(z.literal("")),
    lastName: z.string().trim().min(1).max(80).optional().or(z.literal("")),
    country: z.string().trim().max(100).optional().or(z.literal("")),
    favoritePlatform: z.string().trim().max(50).optional().or(z.literal("")),
    favoriteGenre: z.string().trim().max(80).optional().or(z.literal("")),
    preferences: z.array(z.string()).optional(),
    consent: z.boolean().refine((v) => v === true, "Consent is required to subscribe."),
  });

export type InsertNewsletterSubscriber = z.infer<
  typeof insertNewsletterSubscriberSchema
>;
export type NewsletterSubscriber = typeof newsletterSubscribers.$inferSelect;

// ─── Contact submissions ──────────────────────────────────────────────────────
export const contactStatusEnum = pgEnum("contact_status", ["pending", "read", "replied"]);

export const contactSubmissions = pgTable("contact_submissions", {
  id:          varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  firstName:   text("first_name"),
  lastName:    text("last_name"),
  email:       text("email").notNull(),
  phone:       text("phone"),
  country:     text("country"),
  subject:     text("subject").notNull(),
  enquiryType: text("enquiry_type").notNull().default("general"),
  message:     text("message").notNull(),
  /** JSON string — stores inquiry-type-specific fields (booking details, etc.) */
  metadata:    text("metadata"),
  consent:     boolean("consent").notNull().default(true),
  status:      contactStatusEnum("status").notNull().default("pending"),
  ipAddress:   text("ip_address"),
  userAgent:   text("user_agent"),
  createdAt:   timestamp("created_at").notNull().defaultNow(),
});

// Kept in one place so the form dropdown, backend validation, and email
// subject-tagging can never drift out of sync — add a new enquiry type here only.
export const CONTACT_ENQUIRY_TYPES = ["booking", "press", "collaboration", "licensing", "business", "general"] as const;

export const insertContactSubmissionSchema = createInsertSchema(contactSubmissions)
  .pick({ firstName: true, lastName: true, email: true, phone: true, country: true, subject: true, enquiryType: true, message: true })
  .extend({
    firstName:   z.string().trim().min(1, "First name is required").max(80),
    lastName:    z.string().trim().min(1, "Last name is required").max(80),
    email:       z.string().email("Please enter a valid email address"),
    phone:       z.string().trim().max(30).optional().or(z.literal("")),
    country:     z.string().trim().min(1, "Country is required").max(100),
    subject:     z.string().trim().min(2, "Subject is required").max(200),
    enquiryType: z.enum(CONTACT_ENQUIRY_TYPES).default("general"),
    message:     z.string().trim().min(10, "Message must be at least 10 characters").max(5000, "Message is too long"),
    consent:     z.boolean().refine((v) => v === true, "Please confirm you agree before submitting."),
    /** Optional JSON metadata for inquiry-type-specific fields (booking details, etc.) */
    metadata:    z.string().max(2000).optional(),
  });

export type InsertContactSubmission = z.infer<typeof insertContactSubmissionSchema>;
export type ContactSubmission = typeof contactSubmissions.$inferSelect;
