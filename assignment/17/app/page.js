import StudentManager from "@/components/StudentManager";

export default function Home() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <header className="mb-8">
        <h1 className="text-3xl font-semibold tracking-tight">
          Student Management System
        </h1>
        <p className="mt-1 text-ink/70">
          Student যুক্ত করুন, তথ্য দেখুন, সম্পাদনা করুন বা মুছে ফেলুন।
        </p>
      </header>
      <StudentManager />
    </main>
  );
}
