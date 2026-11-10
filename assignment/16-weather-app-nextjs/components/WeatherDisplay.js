"use client";
import { useEffect, useState } from "react";

export default function WeatherDisplay() {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/weather")
      .then((res) => res.json())
      .then((data) => (data.error ? setError(data.error) : setWeather(data)))
      .catch(() => setError("কিছু একটা সমস্যা হয়েছে"));
  }, []);

  if (error) {
    return <p className="rounded bg-red-100 p-4 text-red-600">{error}</p>;
  }

  if (!weather) {
    return <p className="p-4 text-slate-500">Loading...</p>;
  }

  const items = [
    { label: "Temperature", value: weather.temperature, icon: "🌡️" },
    { label: "Humidity", value: weather.humidity, icon: "💧" },
    { label: "Wind Speed", value: weather.windSpeed, icon: "🌬️" },
    { label: "Time", value: weather.time, icon: "🕒" },
    { label: "Interval", value: weather.interval, icon: "⏱️" },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <div
          key={item.label}
          className="rounded-xl bg-white p-5 shadow transition hover:shadow-md"
        >
          <div className="text-3xl">{item.icon}</div>
          <p className="mt-2 text-sm text-slate-500">{item.label}</p>
          <p className="text-xl font-semibold">{item.value}</p>
        </div>
      ))}
    </div>
  );
}
