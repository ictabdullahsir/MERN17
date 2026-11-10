import { NextResponse } from "next/server";

// In-memory storage (resets when the server restarts)
let tasks = [{ id: 1, title: "Learn Next.js" }];
let nextId = 2;

// GET /api/tasks -> list tasks
export async function GET() {
  return NextResponse.json(tasks);
}

// POST /api/tasks -> add a task  { "title": "..." }
export async function POST(request) {
  const { title } = await request.json();
  if (!title || !title.trim()) {
    return NextResponse.json({ error: "Title is required" }, { status: 400 });
  }
  const task = { id: nextId++, title: title.trim() };
  tasks.push(task);
  return NextResponse.json(task, { status: 201 });
}

// DELETE /api/tasks?id=1 -> remove a task
export async function DELETE(request) {
  const id = Number(new URL(request.url).searchParams.get("id"));
  tasks = tasks.filter((t) => t.id !== id);
  return NextResponse.json({ ok: true });
}
