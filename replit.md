# KIUT. — Music Artist Website

## Overview
Full-stack music artist website for **KIUT.** — Afro-Caribbean Sound, Global Energy.

Pages: Home, Music, Videos, About, Newsletter  
Features: animated loading screen, mini audio player, smooth page transitions (Framer Motion)

## Stack
- **Frontend:** React 19, Vite, TailwindCSS 4, Radix UI, shadcn/ui, Framer Motion, Wouter (routing)
- **Backend:** Express.js (TypeScript), `tsx` dev server
- **Database:** PostgreSQL via Replit's built-in DB + Drizzle ORM
- **Auth:** Passport.js (local strategy), express-session
- **State:** TanStack Query, React Context (PlayerContext)

## Running the app
```
npm run dev          # dev server on port 5000
npm run build        # production build → dist/
npm run start        # run production build
npm run db:push      # push schema changes to the database
```

## Project structure
```
client/src/          # React frontend
  pages/             # Home, Music, Videos, About, Newsletter
  components/        # Navigation, MiniPlayer, UI components
  context/           # PlayerContext (audio player state)
server/              # Express backend
  index.ts           # App entry point
  routes.ts          # API routes
  storage.ts         # Storage interface (MemStorage by default)
shared/
  schema.ts          # Drizzle schema (users table)
drizzle.config.ts    # Drizzle Kit config
```

## Environment
- `SESSION_SECRET` — required (set in Replit Secrets ✓)
- `DATABASE_URL` — runtime-managed by Replit (auto-provisioned ✓)

## User preferences
