import {
  type User,
  type InsertUser,
  type NewsletterSubscriber,
  type InsertNewsletterSubscriber,
  type ContactSubmission,
  type InsertContactSubmission,
  users,
  newsletterSubscribers,
  contactSubmissions,
} from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  getNewsletterSubscriberByEmail(
    email: string,
  ): Promise<NewsletterSubscriber | undefined>;
  createNewsletterSubscriber(
    subscriber: InsertNewsletterSubscriber,
  ): Promise<NewsletterSubscriber>;
  deleteNewsletterSubscriber(email: string): Promise<void>;

  createContactSubmission(
    data: InsertContactSubmission & {
      ipAddress?: string;
      userAgent?: string;
      metadata?: string;
    },
  ): Promise<ContactSubmission>;
}

export class DbStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.username, username));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  async getNewsletterSubscriberByEmail(
    email: string,
  ): Promise<NewsletterSubscriber | undefined> {
    const [subscriber] = await db
      .select()
      .from(newsletterSubscribers)
      .where(eq(newsletterSubscribers.email, email));
    return subscriber;
  }

  async createNewsletterSubscriber(
    insertSubscriber: InsertNewsletterSubscriber,
  ): Promise<NewsletterSubscriber> {
    const [subscriber] = await db
      .insert(newsletterSubscribers)
      .values({
        email:            insertSubscriber.email,
        firstName:        insertSubscriber.firstName || null,
        lastName:         insertSubscriber.lastName || null,
        country:          insertSubscriber.country || null,
        favoritePlatform: insertSubscriber.favoritePlatform || null,
        preferences:      insertSubscriber.preferences ?? null,
      })
      .returning();
    return subscriber;
  }

  async deleteNewsletterSubscriber(email: string): Promise<void> {
    await db
      .delete(newsletterSubscribers)
      .where(eq(newsletterSubscribers.email, email.toLowerCase().trim()));
  }

  async createContactSubmission(
    data: InsertContactSubmission & {
      ipAddress?: string;
      userAgent?: string;
      metadata?: string;
    },
  ): Promise<ContactSubmission> {
    const [submission] = await db
      .insert(contactSubmissions)
      .values({
        firstName:   data.firstName || null,
        lastName:    data.lastName || null,
        email:       data.email,
        phone:       data.phone || null,
        country:     data.country || null,
        subject:     data.subject,
        enquiryType: data.enquiryType ?? "general",
        message:     data.message,
        metadata:    data.metadata ?? null,
        consent:     data.consent ?? true,
        ipAddress:   data.ipAddress ?? null,
        userAgent:   data.userAgent ?? null,
      })
      .returning();
    return submission;
  }
}

export const storage = new DbStorage();
