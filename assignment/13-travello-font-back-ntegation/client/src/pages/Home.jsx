import { Link } from "react-router-dom";

export default function Home() {
  return (
    <main>
      <section className="bg-gradient-to-r from-blue-700 to-cyan-500 px-6 py-28 text-center text-white">
        <p className="font-semibold uppercase tracking-widest">Travel. Explore. Enjoy.</p>
        <h1 className="mx-auto mt-4 max-w-4xl text-4xl font-extrabold md:text-6xl">
          Discover Your Next Adventure
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-lg text-blue-50">
          Find beautiful destinations and book unforgettable tours with Travello.
        </p>
        <Link
          to="/tours"
          className="mt-8 inline-block rounded-xl bg-white px-7 py-3 font-bold text-blue-700"
        >
          Explore Tours
        </Link>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-6 py-16 md:grid-cols-3">
        {[
          ["Beautiful Destinations", "Discover amazing places and natural beauty."],
          ["Affordable Packages", "Choose a tour that fits your budget."],
          ["Easy Booking", "Book your next trip in a few simple steps."]
        ].map(([title, text]) => (
          <div key={title} className="rounded-2xl bg-white p-7 text-center shadow">
            <h2 className="text-xl font-bold">{title}</h2>
            <p className="mt-3 text-slate-600">{text}</p>
          </div>
        ))}
      </section>
    </main>
  );
}
