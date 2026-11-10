# Simple Next.js App (Frontend + Backend)

A minimal Next.js project where the frontend (React page) and backend (API route) live in one app. It is a small task list: add and delete tasks.

## Requirements

- Node.js 18.18 or newer
- npm

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Project structure

```
simple-next-app/
├── app/
│   ├── layout.js            # Root layout
│   ├── page.js              # Frontend page (React)
│   └── api/
│       └── tasks/
│           └── route.js     # Backend API (GET, POST, DELETE)
├── package.json
└── README.md
```

## API

| Method | URL                | Body                | Description   |
|--------|--------------------|---------------------|---------------|
| GET    | `/api/tasks`       | none                | List tasks    |
| POST   | `/api/tasks`       | `{ "title": "..." }`| Add a task    |
| DELETE | `/api/tasks?id=1`  | none                | Delete a task |

Test with curl:

```bash
curl http://localhost:3000/api/tasks
curl -X POST http://localhost:3000/api/tasks -H "Content-Type: application/json" -d '{"title":"Buy milk"}'
```

## Notes

- Tasks are stored in memory, so they reset when the server restarts.
- To persist data, replace the array in `app/api/tasks/route.js` with MongoDB (for example with Mongoose).

## Production

```bash
npm run build
npm start
```
