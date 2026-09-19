import { useEffect, useState } from "react";
import { getMyBookings } from "../api/bookingApi";

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getMyBookings()
      .then((data) => setBookings(data.bookings || []))
      .catch((err) => setError(err.response?.data?.message || "Failed to load bookings"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="p-10 text-center">Loading bookings...</p>;
  if (error) return <p className="p-10 text-center text-red-600">{error}</p>;

  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <h1 className="text-4xl font-extrabold">My Bookings</h1>

      {bookings.length === 0 ? (
        <p className="mt-8 text-slate-600">You have no bookings yet.</p>
      ) : (
        <div className="mt-8 space-y-4">
          {bookings.map((booking) => (
            <div key={booking.id} className="rounded-2xl bg-white p-6 shadow">
              <h2 className="text-xl font-bold">{booking.tourTitle}</h2>
              <p className="mt-2">Date: {booking.date}</p>
              <p>Guests: {booking.guests}</p>
              <p>Total: ৳{booking.totalPrice}</p>
              <p className="mt-2 font-semibold text-orange-600">
                Status: {booking.status}
              </p>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
