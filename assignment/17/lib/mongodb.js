import dns from "dns";
import mongoose from "mongoose";

// mongodb+srv (querySrv) DNS সমস্যা এড়াতে Google ও Cloudflare DNS ব্যবহার
dns.setServers(["8.8.8.8", "1.1.1.1"]);

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("MONGODB_URI সেট করা নেই — .env ফাইল দেখুন");
}

// Dev মোডে hot reload হলেও যেন বারবার নতুন connection না তৈরি হয়
let cached = global.mongoose;
if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export default async function connectDB() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
      serverSelectionTimeoutMS: 8000, // কানেক্ট না হলে ৮ সেকেন্ডে এরর দেবে
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (error) {
    // ব্যর্থ promise cache করে রাখলে সমস্যা ঠিক করার পরেও আর কানেক্ট হয় না
    cached.promise = null;
    throw error;
  }

  return cached.conn;
}
