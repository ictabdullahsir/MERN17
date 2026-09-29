import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../api/authApi";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError("");
      await registerUser(form);
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="mx-auto mt-12 max-w-md px-6">
      <h1 className="text-3xl font-extrabold">Create Account</h1>
      <form onSubmit={submit} className="mt-6 space-y-4 rounded-2xl bg-white p-6 shadow">
        <input
          placeholder="Full name"
          required
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full rounded-lg border p-3"
        />
        <input
          type="email"
          placeholder="Email"
          required
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full rounded-lg border p-3"
        />
        <input
          type="password"
          placeholder="Password (minimum 6 characters)"
          minLength="6"
          required
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="w-full rounded-lg border p-3"
        />
        {error && <p className="text-red-600">{error}</p>}
        <button disabled={loading} className="w-full rounded-lg bg-blue-600 p-3 font-bold text-white">
          {loading ? "Creating..." : "Register"}
        </button>
      </form>
      <p className="mt-5">
        Already registered? <Link to="/login" className="text-blue-600">Login</Link>
      </p>
    </main>
  );
}
