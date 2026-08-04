post   http://localhost:4000/books

postman body

raw josn


{
    "title": "story1",
    "price": 1200,
    "category": "book",
    "salesCount": 2,
   "authorId": ""
}



MongoDB & CRUD Basics | SQL vs. NoSQL (MongoDB Basics) | MongoDB Atlas & Compass Setup | Storing & Reading Documents | Advanced Filtering (Operators, Sorting, Pagination) | Updating & Deleting Data

Deciphered ambiguous MongoDB curriculum request and structured educational response
Deciphered ambiguous MongoDB curriculum request and structured educational response

আপনার লিস্টের প্রতিটা টপিক নিয়ে সংক্ষেপে বলছি:

SQL vs. NoSQL (MongoDB Basics)
SQL রিলেশনাল, ফিক্সড স্কিমা, টেবিল-রো-কলাম স্ট্রাকচার (MySQL, PostgreSQL)। MongoDB হলো NoSQL, ডকুমেন্ট-বেজড, স্কিমা ফ্লেক্সিবল — ডেটা থাকে BSON (JSON-এর মতো) ফরম্যাটে, কালেকশন/ডকুমেন্ট আকারে।

MongoDB Atlas & Compass Setup

Atlas: MongoDB-র ক্লাউড হোস্টেড ভার্সন — ফ্রি ক্লাস্টার বানিয়ে কানেকশন স্ট্রিং নিয়ে অ্যাপে যুক্ত করা যায়।
Compass: GUI টুল, ডেটা ভিজুয়ালি দেখা-এডিট করার জন্য।

Storing & Reading Documents
insertOne() / insertMany() দিয়ে ডেটা সেভ, find() / findOne() দিয়ে রিড। প্রতিটা ডকুমেন্টের একটা ইউনিক _id থাকে।

Advanced Filtering (Operators, Sorting, Pagination)

Operators: $eq, $gt, $lt, $in, $and, $or ইত্যাদি দিয়ে কন্ডিশনাল কুয়েরি।
Sorting: .sort({ field: 1/-1 })
Pagination: .skip() আর .limit() একসাথে ব্যবহার করে।

Updating & Deleting Data

Update: updateOne(), updateMany() — $set, $inc, $push ইত্যাদি অপারেটর দিয়ে।
Delete: deleteOne(), deleteMany()।

আপনি কি এগুলো নিয়ে কোনো প্র্যাকটিক্যাল কোড উদাহরণ (Node.js/Express দিয়ে CRUD API) চান, নাকি এটা basicchemistrybd প্রজেক্টের জন্য নতুন কোনো ফিচার নিয়ে কাজ করছেন?

Operators: $eq, $gt, $lt, $in, $and, $or ইত্যাদি দিয়ে কন্ডিশনাল কুয়েরি। with exple

MongoDB অপারেটরগুলির উদাহরণ সহ বাংলায় ব্যাখ্যা প্রস্তুত করেছে।
MongoDB অপারেটরগুলির উদাহরণ সহ বাংলায় ব্যাখ্যা প্রস্তুত করেছে।

এখানে প্রতিটা অপারেটরের উদাহরণ দিচ্ছি, ধরে নিচ্ছি একটা students কালেকশন আছে:

js
{ name: "Rafi", age: 22, group: "Science", marks: 85 }
{ name: "Nadia", age: 19, group: "Commerce", marks: 60 }
{ name: "Tanvir", age: 25, group: "Science", marks: 45 }

$eq — সমান কিনা চেক করে

js
db.students.find({ group: { $eq: "Science" } })
// শর্টকাট: db.students.find({ group: "Science" })

$gt — নির্দিষ্ট মানের চেয়ে বেশি

js
db.students.find({ marks: { $gt: 60 } })
// marks 60 এর বেশি এমন সবাই (Rafi আসবে)

$lt — নির্দিষ্ট মানের চেয়ে কম

js
db.students.find({ age: { $lt: 20 } })
// বয়স 20 এর কম (Nadia আসবে)

$in — একাধিক মানের যেকোনো একটার সাথে মিললে

js
db.students.find({ group: { $in: ["Science", "Arts"] } })
// group Science অথবা Arts হলে (Rafi, Tanvir আসবে)

$and — একাধিক শর্ত সব মিলতে হবে

js
db.students.find({
  $and: [
    { group: "Science" },
    { marks: { $gt: 50 } }
  ]
})
// Science গ্রুপে এবং marks 50 এর বেশি (শুধু Rafi)

$or — যেকোনো একটা শর্ত মিললেই হবে

js
db.students.find({
  $or: [
    { age: { $lt: 20 } },
    { marks: { $gt: 80 } }
  ]
})
// বয়স 20 এর কম অথবা marks 80 এর বেশি (Nadia, Rafi)

একসাথে combine করে ব্যবহার (কম্পাউন্ড কুয়েরি)

js
db.students.find({
  group: "Science",
  marks: { $gte: 50, $lte: 90 }
})
// $and লিখতে হয়নি, একাধিক ফিল্ড আলাদাভাবে দিলে এমনিতেই AND হিসেবে কাজ করে

চাইলে $ne (not equal), $gte/$lte, বা $nin নিয়েও বলতে পারি — এগুলো এই সেটেরই এক্সটেনশন।
