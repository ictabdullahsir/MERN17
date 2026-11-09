# Student Management System

Next.js (App Router) + Tailwind CSS + MongoDB + Mongoose দিয়ে তৈরি CRUD অ্যাপ।

## চালানোর নিয়ম

1. `npm install`
2. `.env.example` কপি করে `.env` বানান এবং `MONGODB_URI` ঠিক করুন
   - লোকাল MongoDB: `mongodb://127.0.0.1:27017/student-management`
   - MongoDB Atlas: `mongodb+srv://<user>:<password>@<cluster>.mongodb.net/student-management`
3. `npm run dev`
4. ব্রাউজারে খুলুন: http://localhost:3000

## ফোল্ডার স্ট্রাকচার

```
app/
  api/students/route.js        GET (সব), POST (নতুন)
  api/students/[id]/route.js   PUT (এডিট), DELETE (মুছুন)
  layout.js, page.js, globals.css
components/StudentManager.js   ফর্ম ও টেবিল (Client Component)
lib/mongodb.js                 MongoDB connection
lib/apiError.js                এরর হ্যান্ডলিং
models/Student.js              Mongoose Schema ও Model
```

## সমস্যা হলে

- **"MongoDB-তে কানেক্ট করা যায়নি"** — Atlas → Network Access-এ আপনার IP (বা টেস্টের জন্য `0.0.0.0/0`) যোগ করুন। পাসওয়ার্ডে `@ : / ?` থাকলে সেগুলো URL-encode করুন।
- `.env` বদলালে `npm run dev` বন্ধ করে আবার চালান।
