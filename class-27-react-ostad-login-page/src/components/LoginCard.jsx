import { useState } from "react";
import { ArrowRight } from "lucide-react";
import OstadLogo from "./OstadLogo";

function LoginCard() {
  const [tab, setTab] = useState("login");
  const [value, setValue] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value.trim()) {
      setMessage("ফোন নাম্বার বা ইমেইল দিন");
      return;
    }
    setMessage(tab === "login" ? "লগইন করার জন্য পরবর্তী ধাপে যাচ্ছি..." : "নতুন অ্যাকাউন্ট তৈরির জন্য পরবর্তী ধাপে যাচ্ছি...");
  };

  return (
    <main className="flex-1 flex items-center justify-center bg-neutral-50 py-16 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-neutral-100 p-8">
        <div className="flex flex-col items-center mb-6">
          <OstadLogo size={32} />
          <p className="text-sm text-neutral-500 mt-1">স্কিল শিখুন লাইভে</p>
        </div>

        <div className="flex bg-neutral-100 rounded-lg p-1 mb-6">
          <button type="button" onClick={() => { setTab("login"); setMessage(""); }} className={`flex-1 py-2 rounded-md text-sm font-semibold transition-colors ${tab === "login" ? "bg-white shadow text-neutral-900" : "text-neutral-500"}`}>
            লগিন
          </button>
          <button type="button" onClick={() => { setTab("signup"); setMessage(""); }} className={`flex-1 py-2 rounded-md text-sm font-semibold transition-colors ${tab === "signup" ? "bg-white shadow text-neutral-900" : "text-neutral-500"}`}>
            নতুন একাউন্ট
          </button>
        </div>

        <h1 className="text-center text-xl font-bold text-neutral-900 mb-5">
          একাউন্ট {tab === "login" ? "লগিন" : "তৈরি"} করুন
        </h1>

        <form onSubmit={handleSubmit}>
          <label htmlFor="identity" className="block text-sm text-neutral-700 mb-1">ফোন নাম্বার বা ইমেইল দিন</label>
          <input id="identity" type="text" value={value} onChange={(e) => { setValue(e.target.value); setMessage(""); }} placeholder="ফোন নাম্বার বা ইমেইল দিন" className="w-full border border-neutral-200 rounded-lg px-4 py-3 text-sm mb-5 outline-none focus:ring-2 focus:ring-yellow-400" />
          <button type="submit" className="w-full flex items-center justify-center gap-2 bg-yellow-400 hover:bg-yellow-500 transition-colors font-semibold text-neutral-900 py-3 rounded-lg">
            এগিয়ে যাই <ArrowRight size={18} />
          </button>
        </form>

        {message && <p className="text-center text-sm text-neutral-600 mt-3">{message}</p>}

        <div className="flex items-center justify-center gap-2 mt-5 text-sm text-neutral-500">
          <button type="button" onClick={() => setTab(tab === "login" ? "signup" : "login")} className="underline hover:text-neutral-800">
            {tab === "login" ? "নতুন একাউন্ট" : "লগিন করুন"}
          </button>
          <span>•</span>
          <button type="button" className="underline hover:text-neutral-800">পাসওয়ার্ড ভুলে গেছেন</button>
        </div>
      </div>
    </main>
  );
}

export default LoginCard;
