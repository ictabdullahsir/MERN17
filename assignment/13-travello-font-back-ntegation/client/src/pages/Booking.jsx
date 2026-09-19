import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getTourById } from "../api/tourApi";
import { createBooking } from "../api/bookingApi";

export default function Booking() {
  const { tourId } = useParams();
  const navigate = useNavigate();
  const [tour, setTour] = useState(null);
  const [form, setForm] = useState({ date: "", guests: 1 });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getTourById(tourId)
      .then((data) => setTour(data.tour))
      .catch(() => setError("Tour not found"));
  }, [tourId]);

  const submit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError("");
      await createBooking({ tourId, ...form, guests: Number(form.guests) });
      navigate("/my-bookings");
    } catch (err) {
      setError(err.response?.data?.message || "Booking failed");
    } finally {
      setLoading(false);
    }
  };

  if (error) return <p className="p-10 text-center text-red-600">{error}</p>;
  if (!tour) return <p className="p-10 text-center">Loading...</p>;

  return (
    <main className="mx-auto mt-12 max-w-md px-6">
      <h1 className="text-3xl font-extrabold">Book {tour.title}</h1>
      <p className="mt-2 text-blue-600">Price per guest: ৳{tour.price}</p>

      <form onSubmit={submit} className="mt-6 space-y-4 rounded-2xl bg-white p-6 shadow">
        <label className="block">
          <span className="mb-1 block font-semibold">Travel date</span>
          <input
            type="date"
            required
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
            className="w-full rounded-lg border p-3"
          />
        </label>

        <label className="block">
          <span className="mb-1 block font-semibold">Guests</span>
          <input
            type="number"
            min="1"
            required
            value={form.guests}
            onChange={(e) => setForm({ ...form, guests: e.target.value })}
            className="w-full rounded-lg border p-3"
          />
        </label>

        <p className="font-bold">
          Estimated total: ৳{tour.price * Number(form.guests || 0)}
        </p>

        {error && <p className="text-red-600">{error}</p>}

        <button disabled={loading} className="w-full rounded-lg bg-green-600 p-3 font-bold text-white">
          {loading ? "Submitting..." : "Confirm Booking"}
        </button>
      </form>
    </main>
  );
}
