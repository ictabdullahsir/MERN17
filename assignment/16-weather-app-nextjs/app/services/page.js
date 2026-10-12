export const metadata = { title: "Services | Weather App" };

const services = [
  {
    icon: "🌡️",
    title: "Temperature",
    text: "বর্তমান তাপমাত্রা °C-তে দেখুন।",
  },
  {
    icon: "💧",
    title: "Humidity",
    text: "বাতাসের আর্দ্রতার শতকরা হার জানুন।",
  },
  {
    icon: "🌬️",
    title: "Wind Speed",
    text: "বাতাসের গতিবেগ km/h-এ দেখুন।",
  },
  {
    icon: "🕒",
    title: "Time & Interval",
    text: "Data কখনকার এবং কত সেকেন্ড পরপর update হয়, তা জানুন।",
  },
];

export default function ServicesPage() {
  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold">Services</h1>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {services.map((s) => (
          <div key={s.title} className="rounded-xl bg-white p-5 shadow">
            <div className="text-3xl">{s.icon}</div>
            <h2 className="mt-2 text-xl font-semibold">{s.title}</h2>
            <p className="text-slate-600">{s.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
