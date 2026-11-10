import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-slate-800 text-slate-200">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-3 px-4 py-6 text-sm md:flex-row">
        <p>© {new Date().getFullYear()} Weather App. All rights reserved.</p>

        <div className="flex gap-4">
          <Link href="/about" className="hover:underline">
            About
          </Link>
          <Link href="/services" className="hover:underline">
            Services
          </Link>
          <Link href="/contact" className="hover:underline">
            Contact
          </Link>
        </div>

        <p>
          Data by{" "}
          <a
            href="https://open-meteo.com/"
            target="_blank"
            rel="noreferrer"
            className="underline"
          >
            Open-Meteo
          </a>
        </p>
      </div>
    </footer>
  );
}
