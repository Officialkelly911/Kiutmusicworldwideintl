---
name: Performance — bundle splitting and lazy loading
description: Vite manualChunks strategy, React.lazy route splitting, and production compression setup.
---

## Rule
All application routes must use `React.lazy()` + `Suspense`. All vendor dependencies must be split via `manualChunks` in `vite.config.ts`. Compression middleware must be production-only.

**Why:** Before Phase 13, the entire app shipped as one monolithic bundle. Any dependency update busted the full cache. React.lazy splits each page into its own chunk; manualChunks isolates vendor libraries so a framer-motion update doesn't bust the react cache.

## Chunk map (vite.config.ts manualChunks)
```
vendor-react   — react + react-dom
vendor-motion  — framer-motion
vendor-radix   — @radix-ui/*
vendor-query   — @tanstack/react-query
vendor-icons   — lucide-react
vendor-router  — wouter
vendor-misc    — remaining node_modules
```
Page chunks are emitted automatically via React.lazy dynamic imports.

## React.lazy pattern (App.tsx)
```tsx
const Home = lazy(() => import("@/pages/Home"));
// Wrap routes in <Suspense fallback={<PageFallback />}>
```
`PageFallback` is a minimal gold spinner with `role="status"` aria label.

## Compression (server/index.ts)
```ts
if (process.env.NODE_ENV === "production") {
  app.use(compression({ threshold: 1024, level: 6 }));
}
```
Never enable in development — interferes with Vite HMR websocket.

## Cache-Control (server/static.ts)
- Hashed JS/CSS (`*-[hash].js`): `public, max-age=31536000, immutable`
- Images / audio / WebP: `public, max-age=604800` (7 days)
- HTML + manifests: `no-cache, no-store, must-revalidate`

## Font loading (client/index.html)
Google Fonts uses `media="print" onload="this.media='all'"` to defer loading until after first paint. `<noscript>` fallback present.
