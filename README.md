# NHTD Agency Full-Stack Starter

A Next.js website with public pages, contact submissions, job applications with resume upload, SQLite storage, optional Resend email alerts, and a private admin dashboard.

## Run locally

1. Install Node.js 20 or newer.
2. Copy `.env.example` to `.env`.
3. Change `ADMIN_EMAIL`, `ADMIN_PASSWORD`, and `SESSION_SECRET`.
4. Run:

```bash
npm install
npm run db:push
npm run dev
```

Open `http://localhost:3000`. Admin: `http://localhost:3000/admin`.

## Email notifications

Forms work without email configuration and are still saved to SQLite. To enable notifications, create a Resend account and fill in `RESEND_API_KEY`, `NOTIFICATION_EMAIL`, and `EMAIL_FROM`.

## Important production notes

- SQLite and local `uploads/` are convenient for local testing. Before deploying to Vercel, move the database to hosted PostgreSQL and resumes to private object storage such as S3, Cloudflare R2, or Supabase Storage.
- Do not use public forms to collect medical records or protected health information.
- Replace all placeholder company information and have NHTD program language reviewed before launch.
- Use a long unique admin password and session secret.
