# Morya Plus Backend

## Local Setup

1. Copy `.env.example` to `.env` and update MySQL credentials.
2. Open MySQL Workbench and run `backend/database/schema.sql`.
3. Install dependencies with `npm install`.
4. Start backend: `npm run dev:backend` (defaults to `http://127.0.0.1:5001`).
5. Start frontend: `npm run dev`.

Default admin:

- Login URL: `/morya_plus_the_admin_access_mp/login`
- Email/username: `moryaplushospital2026@gmail.com`
- Password: `Morya_Plus-Hospital2026`

## Deployment Notes

- Host the React build on Vercel or static hosting.
- Host `backend/` on a Node.js server such as Hostinger VPS/Node hosting.
- Set production values for `CLIENT_URL`, `DB_*`, `JWT_SECRET`, and `VITE_API_URL`.
- Keep `backend/uploads` writable on the backend server.
