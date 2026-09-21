# Gosu Academy India website

React and Vite website for Gosu Academy's India programs. The repository includes the public site, Paddle checkout, the talent directory, admin tools, database migrations, and transactional email handlers.

## Requirements

- Node.js 22 or newer
- npm
- A Postgres database
- Paddle and Resend accounts for payments and email

## Local setup

```bash
npm ci
cp .env.example .env.local
npm run db:apply
npm run dev
```

Fill in `.env.local` before running database-backed or server-side features. Never commit that file. Set `RESEND_API_KEY` before enabling talent authentication in production; without it, the development fallback writes email content to server logs.

## Available commands

```bash
npm run dev          # Start the Vite development server
npm run build        # Type-check and build the production bundle
npm run test         # Run the test suite
npm run lint         # Run oxlint
npm run i18n:audit   # Check Hindi translation coverage
npm run db:apply     # Apply the database schema and migrations
```

## Deployment

The project is configured for Vercel. `vercel.json` sends client-side routes to `index.html` while keeping `/api/*` routes available as serverless functions.

Another hosting provider must supply:

- SPA fallback routing to `index.html`
- A compatible runtime for the handlers under `api/`
- Raw request-body access for Paddle webhook verification
- The environment variables listed in `.env.example`

Database setup files are under `db/`. Apply `db/schema.sql` and the migrations before enabling checkout or the talent directory.

See [`HANDOFF.md`](HANDOFF.md) for the short pre-launch checklist.
