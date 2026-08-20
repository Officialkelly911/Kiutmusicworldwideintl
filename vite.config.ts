import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import { fileURLToPath } from "url";
import {
  ROUTE_SEO_PLACEHOLDER,
  renderRouteSEOTags,
  resolveRouteSEO,
} from "./shared/seo";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [
    {
      name: "kiut-route-seo-shell",
      transformIndexHtml(html: string, context) {
        if (!html.includes(ROUTE_SEO_PLACEHOLDER)) {
          throw new Error("Missing route SEO placeholder in client/index.html");
        }
        return html.replace(
          ROUTE_SEO_PLACEHOLDER,
          renderRouteSEOTags(resolveRouteSEO(context.originalUrl ?? context.path)),
        );
      },
    },
    react(),
    tailwindcss(),
  ],
  root: path.resolve(__dirname, "client"),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "client/src"),
      "@shared": path.resolve(__dirname, "shared"),
    },
  },
  build: {
    outDir: path.resolve(__dirname, "dist/public"),
    emptyOutDir: true,
    // Raise the inline-asset threshold — small images/fonts stay as data URIs
    assetsInlineLimit: 4096,
    // Generate sourcemaps only in CI/staging; omit for production builds
    sourcemap: false,
    // Chunk size warning threshold
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        /**
         * Manual chunk strategy — splits the monolithic bundle into
         * independently cacheable pieces. Hashed filenames mean a changed
         * vendor-motion chunk does NOT bust the vendor-react cache, and
         * vice versa.
         */
        manualChunks(id: string) {
          // React core + scheduler (react-dom peer) — changes rarely, very long cache TTL
          if (
            id.includes("node_modules/react/") ||
            id.includes("node_modules/react-dom/") ||
            id.includes("node_modules/scheduler/") ||
            id.includes("node_modules/react-is/")
          ) {
            return "vendor-react";
          }
          // Framer Motion — large, isolated, update independently
          if (id.includes("node_modules/framer-motion")) {
            return "vendor-motion";
          }
          // Radix UI primitives — large collection, changes infrequently
          if (id.includes("node_modules/@radix-ui")) {
            return "vendor-radix";
          }
          // TanStack Query — data-fetching layer
          if (id.includes("node_modules/@tanstack")) {
            return "vendor-query";
          }
          // Lucide icons — can be large depending on tree-shaking
          if (id.includes("node_modules/lucide-react")) {
            return "vendor-icons";
          }
          // Wouter + other small routing helpers
          if (id.includes("node_modules/wouter")) {
            return "vendor-router";
          }
          // Remaining node_modules go into a shared vendor chunk
          if (id.includes("node_modules/")) {
            return "vendor-misc";
          }
          // Application code splits naturally by route (via React.lazy in App.tsx)
        },
        // Consistent asset filename format for long-term caching
        assetFileNames: "assets/[name]-[hash][extname]",
        chunkFileNames: "assets/[name]-[hash].js",
        entryFileNames: "assets/[name]-[hash].js",
      },
    },
  },
});
