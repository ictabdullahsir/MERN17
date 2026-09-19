import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getTourById } from "../api/tourApi";

export default function TourDetails() {
  const { id } = useParams();
  const [tour, setTour] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    getTourById(id)
      .then((data) => setTour(data.tour))
      .catch((err) => setError(err.response?.data?.message || "Tour not found"));
  }, [id]);

  if (error) return <p className="p-10 text-center text-red-600">{error}</p>;
  if (!tour) return <p className="p-10 text-center">Loading tour...</p>;

  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <div className="grid gap-10 md:grid-cols-2">
        <img src={tour.image} alt={tour.title} className="h-96 w-full rounded-2xl object-cover" />
        <div>
          <p className="font-semibold text-blue-600">{tour.destination}</p>
          <h1 className="mt-2 text-4xl font-extrabold">{tour.title}</h1>
          <p className="mt-5 leading-7 text-slate-600">{tour.description}</p>
          <p className="mt-5 text-3xl font-bold text-blue-600">৳{tour.price}</p>
          <p className="mt-2 text-slate-600">Duration: {tour.duration}</p>
          <Link
            to={`/booking/${tour.id}`}
            className="mt-7 inline-block rounded-xl bg-green-600 px-6 py-3 font-bold text-white"
          >
            Book Now
          </Link>
        </div>
      </div>
    </main>
  );
}
