import { useEffect, useState } from "react";
import { getTours } from "../api/tourApi";
import TourCard from "../components/TourCard";

export default function Tours() {
  const [tours, setTours] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const timer = setTimeout(async () => {
      try {
        setLoading(true);
        setError("");
        const data = await getTours(search);
        setTours(data.tours || []);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load tours");
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [search]);

  return (
    <main className="mx-auto max-w-7xl px-6 py-12">
      <h1 className="text-4xl font-extrabold">Explore Tours</h1>
      <p className="mt-2 text-slate-600">Search and choose your next destination.</p>

      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search by tour or destination..."
        className="mt-7 w-full max-w-lg rounded-xl border bg-white p-3 outline-none focus:border-blue-500"
      />

      {loading && <p className="mt-8">Loading tours...</p>}
      {error && <p className="mt-8 text-red-600">{error}</p>}

      {!loading && !error && (
        <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {tours.map((tour) => <TourCard key={tour.id} tour={tour} />)}
        </div>
      )}

      {!loading && !error && tours.length === 0 && (
        <p className="mt-8 text-slate-600">No tours found.</p>
      )}
    </main>
  );
}
