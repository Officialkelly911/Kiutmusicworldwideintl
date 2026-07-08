/**
 * Mailchimp Marketing API helpers.
 * Uses the native fetch (Node 18+) — no extra package needed.
 *
 * Required env vars (set as Replit Secrets):
 *   MAILCHIMP_API_KEY       — found in Mailchimp → Account → Extras → API keys
 *   MAILCHIMP_SERVER_PREFIX — the prefix in your API key (e.g. "us14")
 *   MAILCHIMP_AUDIENCE_ID   — the list/audience ID to subscribe to
 */

import { createHash } from "crypto";

function cfg() {
  const apiKey       = process.env.MAILCHIMP_API_KEY;
  const serverPrefix = process.env.MAILCHIMP_SERVER_PREFIX;
  const audienceId   = process.env.MAILCHIMP_AUDIENCE_ID;
  if (!apiKey || !serverPrefix || !audienceId) {
    throw new Error(
      "Mailchimp is not configured. Set MAILCHIMP_API_KEY, MAILCHIMP_SERVER_PREFIX, and MAILCHIMP_AUDIENCE_ID."
    );
  }
  return { apiKey, serverPrefix, audienceId };
}

function baseUrl(serverPrefix: string) {
  return `https://${serverPrefix}.api.mailchimp.com/3.0`;
}

function subscriberHash(email: string) {
  return createHash("md5").update(email.toLowerCase().trim()).digest("hex");
}

function authHeader(apiKey: string) {
  return "Basic " + Buffer.from(`anystring:${apiKey}`).toString("base64");
}

/** Tags applied to every new subscriber from the website. */
const SITE_TAGS = [
  { name: "Source: Website",         status: "active" as const },
  { name: "Artist: Kiut",            status: "active" as const },
  { name: "Interest: General Updates", status: "active" as const },
];

/**
 * Upsert a subscriber into the Mailchimp audience (PUT = add or update).
 * Returns the Mailchimp member object.
 */
export async function addMailchimpSubscriber(params: {
  email: string;
  name?: string;
  source?: string;
}) {
  const { apiKey, serverPrefix, audienceId } = cfg();
  const hash = subscriberHash(params.email);
  const url  = `${baseUrl(serverPrefix)}/lists/${audienceId}/members/${hash}`;

  const [firstName, ...rest] = (params.name ?? "").trim().split(" ");
  const lastName = rest.join(" ");

  const body = {
    email_address: params.email.toLowerCase().trim(),
    status_if_new: "subscribed",
    merge_fields: {
      ...(firstName ? { FNAME: firstName } : {}),
      ...(lastName  ? { LNAME: lastName  } : {}),
    },
  };

  const res = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type":  "application/json",
      "Authorization": authHeader(apiKey),
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(`Mailchimp member upsert failed: ${JSON.stringify(err)}`);
  }

  return res.json();
}

/**
 * Apply tags to a subscriber.
 * The source param adds a "Signup: <source>" tag in addition to site-wide tags.
 */
export async function tagMailchimpSubscriber(email: string, source?: string) {
  const { apiKey, serverPrefix, audienceId } = cfg();
  const hash = subscriberHash(email);
  const url  = `${baseUrl(serverPrefix)}/lists/${audienceId}/members/${hash}/tags`;

  const signupTag = source
    ? [{ name: `Signup: ${source}`, status: "active" as const }]
    : [{ name: "Signup: Website Newsletter", status: "active" as const }];

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type":  "application/json",
      "Authorization": authHeader(apiKey),
    },
    body: JSON.stringify({ tags: [...SITE_TAGS, ...signupTag] }),
  });

  // 204 = success with no body; anything else is an error
  if (!res.ok && res.status !== 204) {
    const err = await res.json().catch(() => ({}));
    throw new Error(`Mailchimp tag failed: ${JSON.stringify(err)}`);
  }
}
