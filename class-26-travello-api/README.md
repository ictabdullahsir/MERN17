# Travello — corrected backend + React frontend

This package fixes the missing backend runtime files and adds a complete Vite/React frontend mapped to the existing API.

## Backend
1. `cd backend`
2. Copy `.env.example` to `.env` and set `MONGODB_URI` and `JWT_SECRET`.
3. `npm install`
4. `npm run dev`

API: `http://localhost:5000/api`
Swagger: `http://localhost:5000/api-docs`

Create an admin:
`npm run create-admin -- admin@example.com Password123 "Travello Admin"`

## Frontend
1. `cd frontend`
2. `npm install`
3. Copy `.env.example` to `.env`
4. `npm run dev`

Frontend: `http://localhost:5173`

## API mapping
- POST `/auth/register`
- POST `/auth/verify-otp`
- POST `/auth/resend-otp`
- POST `/auth/login`
- GET `/auth/me`
- GET/POST `/destinations`
- GET/PATCH/DELETE `/destinations/:id`
- GET/POST `/tours`
- GET/PATCH/DELETE `/tours/:id`
- POST `/bookings`
- GET `/bookings/my`
- GET `/bookings` (admin)
- PATCH `/bookings/:id/cancel`
- PATCH `/bookings/:id/status` (admin)

The frontend automatically sends `Authorization: Bearer <token>` after login/verification.
