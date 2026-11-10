export const metadata = { title: "About | Weather App" };

export default function AboutPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">About</h1>
      <p className="text-slate-600">
        Weather App হলো একটি সহজ web application, যা Next.js (App Router) এবং
        Tailwind CSS দিয়ে তৈরি। এর উদ্দেশ্য হলো এক নজরে বর্তমান আবহাওয়ার মূল
        তথ্যগুলো দেখানো।
      </p>
      <p className="text-slate-600">
        আবহাওয়ার data আসে{" "}
        <a
          href="https://open-meteo.com/"
          target="_blank"
          rel="noreferrer"
          className="text-sky-600 underline"
        >
          Open-Meteo
        </a>{" "}
        থেকে, যা সম্পূর্ণ free এবং যার জন্য কোনো API key দরকার হয় না। App-এর
        নিজস্ব একটি API route (<code>/api/weather</code>) সেই data এনে সহজ
        আকারে frontend-এ পাঠায়।
      </p>
    </div>
  );
}
