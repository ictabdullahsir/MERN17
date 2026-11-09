"use client";

import { useEffect, useState } from "react";

const EMPTY_FORM = { name: "", email: "", phone: "", department: "" };

const inputClass =
  "w-full rounded-md border border-ink/20 bg-white px-3 py-2 text-sm outline-none focus:border-pine-600 focus:ring-2 focus:ring-pine-600/20";

const FIELDS = [
  { name: "name", label: "Name", type: "text" },
  { name: "email", label: "Email", type: "email" },
  { name: "phone", label: "Phone", type: "tel" },
  { name: "department", label: "Department", type: "text" },
];

export default function StudentManager() {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState(EMPTY_FORM);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // READ
  async function loadStudents() {
    try {
      const res = await fetch("/api/students");
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail ? `${data.error} (${data.detail})` : data.error);
      setStudents(data);
    } catch (err) {
      setError(err.message || "তথ্য আনা যায়নি");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadStudents();
  }, []);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function resetForm() {
    setForm(EMPTY_FORM);
    setEditingId(null);
    setError("");
  }

  // CREATE ও UPDATE
  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setError("");

    try {
      const res = await fetch(
        editingId ? `/api/students/${editingId}` : "/api/students",
        {
          method: editingId ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail ? `${data.error} (${data.detail})` : data.error);

      resetForm();
      await loadStudents();
    } catch (err) {
      setError(err.message || "সংরক্ষণ করা যায়নি");
    } finally {
      setSaving(false);
    }
  }

  function startEdit(student) {
    setEditingId(student._id);
    setForm({
      name: student.name,
      email: student.email,
      phone: student.phone,
      department: student.department,
    });
    setError("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // DELETE
  async function handleDelete(student) {
    if (!window.confirm(`${student.name}-কে ডিলিট করবেন?`)) return;

    try {
      const res = await fetch(`/api/students/${student._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail ? `${data.error} (${data.detail})` : data.error);

      if (editingId === student._id) resetForm();
      await loadStudents();
    } catch (err) {
      setError(err.message || "ডিলিট করা যায়নি");
    }
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[320px_1fr]">
      {/* ফর্ম */}
      <section className="h-fit rounded-xl border border-ink/10 bg-white p-5">
        <h2 className="mb-4 text-lg font-semibold">
          {editingId ? "Student-এর তথ্য সম্পাদনা" : "নতুন Student যুক্ত করুন"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          {FIELDS.map((f) => (
            <div key={f.name}>
              <label htmlFor={f.name} className="mb-1 block text-sm font-medium">
                {f.label}
              </label>
              <input
                id={f.name}
                name={f.name}
                type={f.type}
                value={form[f.name]}
                onChange={handleChange}
                required
                className={inputClass}
              />
            </div>
          ))}

          {error && (
            <p role="alert" className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">
              {error}
            </p>
          )}

          <div className="flex gap-2 pt-1">
            <button
              type="submit"
              disabled={saving}
              className="flex-1 rounded-md bg-pine-600 px-4 py-2 text-sm font-medium text-white hover:bg-pine-700 focus:outline-none focus:ring-2 focus:ring-pine-600/40 disabled:opacity-60"
            >
              {saving
                ? "সংরক্ষণ হচ্ছে..."
                : editingId
                ? "পরিবর্তন সংরক্ষণ"
                : "Student যুক্ত করুন"}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                className="rounded-md border border-ink/20 px-4 py-2 text-sm hover:bg-paper"
              >
                বাতিল
              </button>
            )}
          </div>
        </form>
      </section>

      {/* তালিকা */}
      <section className="rounded-xl border border-ink/10 bg-white">
        <div className="flex items-center justify-between border-b border-ink/10 px-5 py-4">
          <h2 className="text-lg font-semibold">সব Student</h2>
          <span className="text-sm text-ink/60">মোট {students.length} জন</span>
        </div>

        {loading ? (
          <p className="px-5 py-10 text-center text-ink/60">লোড হচ্ছে...</p>
        ) : students.length === 0 ? (
          <p className="px-5 py-10 text-center text-ink/60">
            এখনো কোনো Student নেই। ফর্ম থেকে প্রথম Student যুক্ত করুন।
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-paper text-ink/70">
                <tr>
                  <th className="px-5 py-3 font-medium">Name</th>
                  <th className="px-5 py-3 font-medium">Email</th>
                  <th className="px-5 py-3 font-medium">Phone</th>
                  <th className="px-5 py-3 font-medium">Department</th>
                  <th className="px-5 py-3 text-right font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {students.map((s) => (
                  <tr
                    key={s._id}
                    className={`border-t border-ink/10 ${
                      editingId === s._id ? "bg-pine-600/5" : ""
                    }`}
                  >
                    <td className="px-5 py-3 font-medium">{s.name}</td>
                    <td className="px-5 py-3">{s.email}</td>
                    <td className="px-5 py-3">{s.phone}</td>
                    <td className="px-5 py-3">{s.department}</td>
                    <td className="whitespace-nowrap px-5 py-3 text-right">
                      <button
                        onClick={() => startEdit(s)}
                        className="rounded-md px-3 py-1 text-pine-700 hover:bg-pine-600/10"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(s)}
                        className="ml-1 rounded-md px-3 py-1 text-red-700 hover:bg-red-50"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
