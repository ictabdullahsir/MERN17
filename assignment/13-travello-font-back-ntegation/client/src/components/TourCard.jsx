import { Link } from "react-router-dom";

export default function TourCard({ tour }) {
  return (
    <article className="overflow-hidden rounded-2xl bg-white shadow transition hover:-translate-y-1 hover:shadow-xl">
      <img
        src={tour.image}
        alt={tour.title}
        className="h-52 w-full object-cover"
      />

      <div className="p-5">
        <p className="text-sm text-blue-600">{tour.destination}</p>
        <h2 className="mt-1 text-xl font-bold">{tour.title}</h2>
        <p className="mt-2 line-clamp-2 text-slate-600">{tour.description}</p>

        <div className="mt-4 flex items-center justify-between">
          <span className="font-bold text-blue-600">৳{tour.price}</span>
          <Link
            to={`/tours/${tour.id}`}
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm text-white"
          >
            Details
          </Link>
        </div>
      </div>
    </article>
  );
}
