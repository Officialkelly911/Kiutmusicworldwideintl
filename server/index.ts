import express, { type Request, Response, NextFunction } from "express";
import compression from "compression";
import helmet from "helmet";
import { registerRoutes } from "./routes";
import { serveStatic } from "./static";
import { createServer } from "http";

// ── Environment validation ────────────────────────────────────────────────────
// Warn at startup for any missing critical variables so issues surface in logs
// immediately rather than silently failing at the first request.
(function validateEnv() {
  const required: Record<string, string> = {
    RESEND_API_KEY:          "email delivery (welcome + contact notifications)",
    CONTACT_FROM_EMAIL:      "the From address on outbound emails",
    MAILCHIMP_API_KEY:       "Mailchimp list sync",
    MAILCHIMP_SERVER_PREFIX: "Mailchimp API region routing",
    MAILCHIMP_AUDIENCE_ID:   "Mailchimp target audience",
    DATABASE_URL:            "PostgreSQL database connection",
  };
  const missing = Object.entries(required).filter(([key]) => !process.env[key]);
  if (missing.length > 0) {
    for (const [key, purpose] of missing) {
      console.warn(`[env] WARNING: ${key} is not set — ${purpose} will be unavailable.`);
    }
  }
})();

const app = express();
const httpServer = createServer(app);

// ── Security headers (Helmet) ─────────────────────────────────────────────────
// Helmet sets X-Content-Type-Options, X-Frame-Options, Referrer-Policy,
// X-DNS-Prefetch-Control, X-Download-Options, X-Permitted-Cross-Domain-Policies,
// Origin-Agent-Cluster, Cross-Origin-*-Policy, and HSTS in production.
// CSP is disabled here — the SPA embeds YouTube iframes, Google Fonts, and
// inline Framer Motion styles that require a carefully tuned allowlist. A
// dedicated CSP pass is recommended before deployment to a hardened environment.
app.use(
  helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false, // required for YouTube iframe embeds
  }),
);
// Permissions-Policy is not set by Helmet — add it explicitly.
app.use((_req, res, next) => {
  res.setHeader("Permissions-Policy", "camera=(), microphone=(), payment=()");
  next();
});

// ── Gzip/Brotli compression (production only) ─────────────────────────────────
// Compresses all text responses (HTML, JS, CSS, JSON, SVG) before sending.
// Skips dev so Vite HMR websocket payloads are never interfered with.
if (process.env.NODE_ENV === "production") {
  app.use(compression({
    // Only compress responses > 1KB (below threshold is not worth the CPU)
    threshold: 1024,
    // Compression level 6 — good balance of speed vs ratio
    level: 6,
    filter: (req, res) => {
      // Don't compress SSE streams or already-encoded responses
      if (req.headers["x-no-compression"]) return false;
      return compression.filter(req, res);
    },
  }));
}

declare module "http" {
  interface IncomingMessage {
    rawBody: unknown;
  }
}

app.use(
  express.json({
    limit: "100kb",
    verify: (req, _res, buf) => {
      req.rawBody = buf;
    },
  }),
);

app.use(express.urlencoded({ extended: false, limit: "100kb" }));

export function log(message: string, source = "express") {
  const formattedTime = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  console.log(`${formattedTime} [${source}] ${message}`);
}

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      log(logLine);
    }
  });

  next();
});

(async () => {
  await registerRoutes(httpServer, app);

  app.use((err: any, req: Request, res: Response, _next: NextFunction) => {
    const requestedStatus = Number(err?.status || err?.statusCode);
    const status = requestedStatus >= 400 && requestedStatus < 500 ? requestedStatus : 500;
    const message = status === 500
      ? "Something went wrong. Please try again."
      : (typeof err?.message === "string" ? err.message : "Unable to complete your request.");

    // Detailed error objects stay in server logs only; never send stack traces
    // or provider/database messages to clients.
    console.error("[http-error]", {
      method: req.method,
      path: req.path,
      status,
      error: err?.stack || err,
    });
    if (!res.headersSent) res.status(status).json({ message });
  });

  // importantly only setup vite in development and after
  // setting up all the other routes so the catch-all route
  // doesn't interfere with the other routes
  if (process.env.NODE_ENV === "production") {
    serveStatic(app);
  } else {
    const { setupVite } = await import("./vite");
    await setupVite(httpServer, app);
  }

  // ALWAYS serve the app on the port specified in the environment variable PORT
  // Other ports are firewalled. Default to 5000 if not specified.
  // this serves both the API and the client.
  // It is the only port that is not firewalled.
  const port = parseInt(process.env.PORT || "5000", 10);
  const listenOptions =
    process.platform === "win32"
      ? {
          port,
          host: "0.0.0.0",
        }
      : {
          port,
          host: "0.0.0.0",
          reusePort: true,
        };

  httpServer.listen(listenOptions, () => {
    log(`serving on port ${port}`);
  });

  const shutdown = (signal: string) => {
    log(`${signal} received; shutting down gracefully`, "server");
    httpServer.close((error) => {
      if (error) {
        console.error("[server] graceful shutdown failed:", error);
        process.exitCode = 1;
      }
      process.exit();
    });
  };
  process.once("SIGTERM", () => shutdown("SIGTERM"));
  process.once("SIGINT", () => shutdown("SIGINT"));
})();
