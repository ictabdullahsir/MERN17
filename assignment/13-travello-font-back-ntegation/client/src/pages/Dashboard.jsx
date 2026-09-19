import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <main className="mx-auto max-w-7xl px-6 py-12">
      <h1 className="text-4xl font-extrabold">
        Welcome, {user?.name || "Traveler"}!
      </h1>
      <p className="mt-2 text-slate-600">{user?.email}</p>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        <Link to="/my-bookings" className="rounded-2xl bg-white p-7 shadow hover:shadow-lg">
          <h2 className="text-xl font-bold">My Bookings</h2>
          <p className="mt-2 text-slate-600">View your booking history.</p>
        </Link>
        <Link to="/tours" className="rounded-2xl bg-white p-7 shadow hover:shadow-lg">
          <h2 className="text-xl font-bold">Explore Tours</h2>
          <p className="mt-2 text-slate-600">Find your next adventure.</p>
        </Link>
        <div className="rounded-2xl bg-white p-7 shadow">
          <h2 className="text-xl font-bold">Account</h2>
          <p className="mt-2 text-slate-600">Your account is active.</p>
        </div>
      </div>
    </main>
  );
}
