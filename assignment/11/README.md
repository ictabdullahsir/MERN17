# Student Management API

Express + MongoDB (Mongoose) backend with JWT authentication.

## Setup

```bash
npm install
cp .env.example .env   # then fill in MONGODB_URI and JWT_SECRET
npm run dev            # or: npm start
```

## Auth APIs

| Method | Route | Body |
|---|---|---|
| POST | /api/auth/register | `{ "name", "email", "password" }` |
| POST | /api/auth/login | `{ "email", "password" }` → returns `{ token }` |

## Student APIs (JWT protected — send `Authorization: Bearer <token>`)

| Method | Route | Body |
|---|---|---|
| POST | /api/students | `{ "name", "email", "phone", "age", "course" }` |
| GET | /api/students | — |
| GET | /api/students/:id | — |
| PUT | /api/students/:id | any subset of student fields |
| DELETE | /api/students/:id | — |

## Notes

- Passwords are hashed with `bcryptjs` before saving.
- `JWT_SECRET` and `MONGODB_URI` are loaded from `.env` — never commit real credentials.
- Global + auth-route rate limiting is enabled via `express-rate-limit`.
