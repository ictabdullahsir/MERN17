import WeatherDisplay from "../components/WeatherDisplay";

export default function Home() {
  return (
    <div className="space-y-10">
      <section>
        <h1 className="text-3xl font-bold">Current Weather</h1>
        <p className="mb-6 text-slate-600">Dhaka, Bangladesh</p>
        <WeatherDisplay />
      </section>

      <section className="rounded-xl bg-white p-6 shadow">
        <h2 className="mb-2 text-2xl font-bold">About This App</h2>
        <p className="text-slate-600">
          এটি Next.js ও Tailwind CSS দিয়ে তৈরি একটি Simple Weather App। এখানে
          Open-Meteo-র Free API থেকে বর্তমান temperature, humidity, wind speed,
          সময় এবং data update interval দেখানো হয়। কোনো API key লাগে না।
        </p>
      </section>
    </div>
  );
}
