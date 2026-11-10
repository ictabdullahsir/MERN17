"use client";
import { useState } from "react";

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Demo: এখানে চাইলে API call বা email service যোগ করা যাবে
    console.log("Contact form:", form);
    setSent(true);
    setForm({ name: "", email: "", message: "" });
  };

  const inputClass =
    "w-full rounded border border-slate-300 bg-white p-2 outline-none focus:border-sky-500";

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg space-y-4 rounded-xl bg-white p-6 shadow"
    >
      <div>
        <label className="mb-1 block font-medium" htmlFor="name">
          Name
        </label>
        <input
          id="name"
          name="name"
          required
          value={form.name}
          onChange={handleChange}
          className={inputClass}
        />
      </div>

      <div>
        <label className="mb-1 block font-medium" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          value={form.email}
          onChange={handleChange}
          className={inputClass}
        />
      </div>

      <div>
        <label className="mb-1 block font-medium" htmlFor="message">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          required
          value={form.message}
          onChange={handleChange}
          className={inputClass}
        />
      </div>

      <button
        type="submit"
        className="w-full rounded bg-sky-600 px-4 py-2 font-semibold text-white hover:bg-sky-700 sm:w-auto"
      >
        Send Message
      </button>

      {sent && (
        <p className="rounded bg-green-100 p-3 text-green-700">
          ধন্যবাদ! আপনার message পাঠানো হয়েছে।
        </p>
      )}
    </form>
  );
}
