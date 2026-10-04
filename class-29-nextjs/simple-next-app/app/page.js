"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  async function load() {
    const res = await fetch("/api/tasks");
    setTasks(await res.json());
  }

  useEffect(() => {
    load();
  }, []);

  async function addTask() {
    if (!title.trim()) return;
    await fetch("/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
    });
    setTitle("");
    load();
  }

  async function removeTask(id) {
    await fetch(`/api/tasks?id=${id}`, { method: "DELETE" });
    load();
  }

  return (
    <main style={{ maxWidth: 480, margin: "60px auto", padding: 24, background: "#fff", borderRadius: 12 }}>
      <h1 style={{ marginTop: 0 }}>My Tasks</h1>

      <div style={{ display: "flex", gap: 8 }}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTask()}
          placeholder="Add a task"
          style={{ flex: 1, padding: 10, fontSize: 16 }}
        />
        <button onClick={addTask} style={{ padding: "10px 16px", fontSize: 16, cursor: "pointer" }}>
          Add
        </button>
      </div>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {tasks.map((t) => (
          <li key={t.id} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid #eee" }}>
            {t.title}
            <button onClick={() => removeTask(t.id)} style={{ cursor: "pointer" }}>Delete</button>
          </li>
        ))}
      </ul>
      {tasks.length === 0 && <p>No tasks yet. Add one above.</p>}
    </main>
  );
}
