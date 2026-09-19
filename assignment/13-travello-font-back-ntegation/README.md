# Travello Class 5 - Full React + Express Project

A complete beginner-friendly Travello demo with:

- React + Vite + Tailwind CSS
- React Router
- Axios API integration
- Express backend
- JWT authentication
- Register / Login / Logout
- Protected Dashboard
- Tours list, search, details
- Booking creation and My Bookings
- JSON file database for easy local running

> This project uses a JSON file database so you can run it without MongoDB or MySQL.
> You can later replace `server/data/db.json` with MongoDB/MySQL.

## Requirements

- Node.js 18+
- npm
- VS Code

## Project structure

```text
travello-class5/
├── client/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── .env.example
│   ├── index.html
│   ├── package.json
│   ├── postcss.config.js
│   ├── tailwind.config.js
│   └── vite.config.js
├── server/
│   ├── data/db.json
│   ├── middleware/authMiddleware.js
│   ├── routes/authRoutes.js
│   ├── routes/tourRoutes.js
│   ├── routes/bookingRoutes.js
│   ├── server.js
│   ├── .env.example
│   └── package.json
└── README.md
```

## How to run

### 1. Extract ZIP

Extract the project and open the root folder in VS Code.

### 2. Run backend

Open Terminal 1:

```bash
cd server
npm install
```

Create `.env` from `.env.example`.

Windows CMD:

```bash
copy .env.example .env
```

PowerShell:

```powershell
Copy-Item .env.example .env
```

Start backend:

```bash
npm run dev
```

Backend URL:

```text
http://localhost:5000
```

Test:

```text
http://localhost:5000/api/health
```

### 3. Run frontend

Open Terminal 2 from the project root:

```bash
cd client
npm install
```

Create `.env` from `.env.example`.

Windows CMD:

```bash
copy .env.example .env
```

PowerShell:

```powershell
Copy-Item .env.example .env
```

Start frontend:

```bash
npm run dev
```

Frontend URL:

```text
http://localhost:5173
```

## Demo account

You can register a new account from:

```text
http://localhost:5173/register
```

Or use:

```text
Email: demo@travello.com
Password: 123456
```

## API endpoints

| Method | URL | Auth |
|---|---|---|
| GET | `/api/health` | No |
| POST | `/api/auth/register` | No |
| POST | `/api/auth/login` | No |
| GET | `/api/auth/me` | Yes |
| GET | `/api/tours` | No |
| GET | `/api/tours/:id` | No |
| POST | `/api/bookings` | Yes |
| GET | `/api/bookings/my` | Yes |

## Important adjustments

### Backend URL

Edit:

```text
client/.env
```

```env
VITE_API_URL=http://localhost:5000/api
```

For hosting, replace it with your live backend URL.

### JWT secret

Edit:

```text
server/.env
```

```env
JWT_SECRET=change_this_to_a_long_random_secret
```

### Database

The demo stores data in:

```text
server/data/db.json
```

Do not use this JSON database for high-traffic production hosting. Use MongoDB, MySQL, or PostgreSQL for production.

## Troubleshooting

### Port 5000 already in use

Change `PORT` in `server/.env`:

```env
PORT=5001
```

Then update `client/.env`:

```env
VITE_API_URL=http://localhost:5001/api
```

Restart both servers.

### CORS error

Make sure backend is running and the frontend API URL matches the backend port.

### Token problem

Logout, remove browser localStorage key `token`, and login again.

### Tailwind not working

Stop the frontend and run:

```bash
npm install
npm run dev
```

## Production note

This is a learning/demo project. Before production use:

- Use a real database
- Use HTTPS
- Use secure HttpOnly cookies or a carefully designed token strategy
- Validate all request data on the server
- Add rate limiting
- Add payment provider verification
- Add admin authorization
- Never commit `.env` files
