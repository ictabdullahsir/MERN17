import { NextResponse } from "next/server";

// ভ্যালিডেশন/ডুপ্লিকেট/কানেকশন এরর থেকে ব্যবহারকারীর জন্য বার্তা তৈরি
export function errorResponse(error) {
  if (error.name === "ValidationError") {
    const message = Object.values(error.errors)
      .map((e) => e.message)
      .join(", ");
    return NextResponse.json({ error: message }, { status: 400 });
  }
  if (error.code === 11000) {
    return NextResponse.json(
      { error: "এই ইমেইল দিয়ে আগেই একজন Student আছে" },
      { status: 409 }
    );
  }
  if (error.name === "CastError") {
    return NextResponse.json({ error: "ভুল ID" }, { status: 400 });
  }

  console.error("API error:", error);

  // mongodb+srv লিংকের DNS (SRV) লুকআপ ব্যর্থ — Atlas বা পাসওয়ার্ডের সমস্যা নয়
  if (/querySrv|ENOTFOUND|ESERVFAIL|ETIMEOUT/i.test(String(error.message || ""))) {
    return NextResponse.json(
      {
        error:
          "Atlas-এর ঠিকানা (DNS) খুঁজে পাওয়া যাচ্ছে না। Atlas থেকে 'non-SRV' (mongodb://...) কানেকশন স্ট্রিং নিয়ে .env-এ বসান, অথবা অন্য নেটওয়ার্ক/VPN ব্যবহার করুন।",
        detail: String(error.message || ""),
      },
      { status: 503 }
    );
  }

  // ডাটাবেসে কানেক্ট করা যায়নি (Atlas IP whitelist, ভুল পাসওয়ার্ড, DNS ইত্যাদি)
  const msg = String(error.message || "");
  if (/ServerSelection|ECONNREFUSED|ENOTFOUND|querySrv|ETIMEOUT|authentication failed|bad auth/i.test(error.name + " " + msg)) {
    return NextResponse.json(
      {
        error:
          "MongoDB-তে কানেক্ট করা যায়নি। Atlas-এর Network Access-এ আপনার IP যোগ করুন এবং .env-এর ইউজারনেম/পাসওয়ার্ড চেক করুন।",
        detail: msg,
      },
      { status: 503 }
    );
  }

  return NextResponse.json(
    { error: "সার্ভারে সমস্যা হয়েছে", detail: msg },
    { status: 500 }
  );
}
