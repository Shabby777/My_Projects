# Career Architect

Career Architect is a polished job-tracker MVP built with Next.js, TypeScript, and Tailwind CSS. It turns the original static `stitch_add_edit_job` prototypes into a working web app with authentication, dashboard metrics, job CRUD flows, notes, interview events, and a calendar view.

## What’s Included

- Demo sign-in flow with protected app routes
- Dashboard powered by stored application data
- Job list, create, edit, and detail pages
- Notes and interview/follow-up event management
- Monthly interview calendar with today agenda
- Shared editorial design system inspired by the prototype screens

## Tech Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- NextAuth credentials auth
- Zod validation
- Prisma schema included for future DB-backed persistence

## Current Persistence Model

The app currently runs on a local JSON data store at `data/demo-db.json` through `lib/store.ts`.

Why:
- The Prisma schema and client setup are present in the repo.
- In this environment, Prisma’s local schema engine was not reliable enough to finish the local database setup cleanly.
- To keep the MVP fully usable, runtime persistence was implemented with a repo-local JSON store while preserving the same route and domain structure.

Prisma remains in:
- `prisma/schema.prisma`
- `package.json`

If you want to swap to a real DB later, the app structure is already close to that shape.

## Demo Login

- Email: `architect@demo.app`
- Password: `career-architect`

## Project Structure

- `app/`
  Next.js routes, layouts, and server actions
- `components/`
  Reusable UI pieces like the shell, status badges, and job form
- `lib/`
  Auth config, validation, store logic, queries, and shared utilities
- `data/demo-db.json`
  Seeded local application data
- `stitch_add_edit_job/`
  Original HTML prototype/reference screens
- `DESIGN.md`
  High-level design notes for the implemented app

## Getting Started

1. Install dependencies:

```bash
npm install --legacy-peer-deps
```

2. Start the dev server:

```bash
npm run dev
```

3. Open:

```text
http://localhost:3000
```

4. Sign in with the demo credentials above.

## Scripts

- `npm run dev`
  Start the local dev server
- `npm run build`
  Create a production build
- `npm run start`
  Run the production build
- `npm run test`
  Run the test command currently configured for the repo
- `npm run prisma:generate`
  Regenerate Prisma client from the schema
- `npm run prisma:push`
  Attempt to push the Prisma schema to a local database

## Verification Status

- `npm run build`: passes
- `npm run test`: currently limited by sandbox/process restrictions in this environment

## Notes

- The app seeds its demo dataset automatically if `data/demo-db.json` does not exist.
- The prototype folder is intentionally preserved as a design reference and is not used directly at runtime.
- `.env.example` contains the minimal local env values used for this MVP.
