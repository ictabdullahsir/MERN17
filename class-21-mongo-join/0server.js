const dns = require("dns");
dns.setServers(["8.8.8.8", "1.1.1.1"]);

const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

const MONGODB_URI = "mongodb+srv://bsse1106_db_user:GlgnLuyiXXjJ3wds@cluster0.m3zhjem.mongodb.net/";

async function connectToDatabase() {
  try {
    await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 8000, // fail fast instead of hanging forever
    });
    console.log("Connected to MongoDB!");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
  }
}

// Block API requests until DB is actually connected, so the browser
// never gets an empty/hanging response.
app.use((req, res, next) => {
  if (mongoose.connection.readyState !== 1) {
    return res.status(503).json({
      status: "error",
      error: "Database not connected yet. Check server terminal logs / MongoDB Atlas Network Access (IP whitelist).",
    });
  }
  next();
});

const BookSchema = new mongoose.Schema({
  title: String,
  price: Number,
  category: String,
  salesCount: Number,
  inStock: Boolean,
  authorId: mongoose.Schema.Types.ObjectId,
  tags: [String],
});

const AuthorSchema = new mongoose.Schema({
  name: String,
  country: String,
});

const Book = mongoose.model("Book", BookSchema);
const Author = mongoose.model("Author", AuthorSchema);

// ---------- GET: author list (for dropdown in the form) ----------
app.get("/authors", async (req, res) => {
  try {
    const authors = await Author.find().sort({ name: 1 });
    res.json({ status: "success", data: authors });
  } catch (err) {
    res.status(500).json({ status: "error", error: err.message });
  }
});

// ---------- POST: create author ----------
app.post("/authors", async (req, res) => {
  try {
    const { name, country } = req.body;
    const author = await Author.create({ name, country });
    res.status(201).json({ status: "success", data: author });
  } catch (err) {
    res.status(500).json({ status: "error", error: err.message });
  }
});

// ---------- POST: create book ----------
app.post("/books", async (req, res) => {
  try {
    const { title, price, category, salesCount, inStock, authorId, tags } = req.body;
    const book = await Book.create({
      title,
      price: Number(price),
      category,
      salesCount: Number(salesCount) || 0,
      inStock: Boolean(inStock),
      authorId: authorId || null,
      tags: Array.isArray(tags)
        ? tags
        : (tags || "").split(",").map(t => t.trim()).filter(Boolean),
    });
    res.status(201).json({ status: "success", data: book });
  } catch (err) {
    res.status(500).json({ status: "error", error: err.message });
  }
});

app.get("/books", async (req, res) => {
  try {
    const books = await Book.aggregate([
      { $match: { price: { $gte: 10 } } },
      {
        $group: {
          _id: "$category",
          totalBooks: { $sum: 1 },
          totalSales: { $sum: "$salesCount" },
          avgPrice: { $avg: "$price" },
        },
      },
      {
        $project: {
          _id: 0,
          category: "$_id",
          totalBooks: 1,
          totalSales: 1,
          avgPrice: 1,
        },
      },
    ]);
    res.json({ status: "success", results: books.length, data: books });
  } catch (err) {
    res.status(500).json({ status: "error", error: err.message });
  }
});

app.get("/book-with-authors", async (req, res) => {
  try {
    const booksWithAuthors = await Book.aggregate([
      {
        $lookup: {
          from: "authors",
          localField: "authorId",
          foreignField: "_id",
          as: "authorDetails",
        },
      },
      { $unwind: "$authorDetails" },
      {
        $project: {
          _id: 0,
          title: 1,
          price: 1,
          category: 1,
          inStock: 1,
          tags: 1,
          author_name: "$authorDetails.name",
          authorCountry: "$authorDetails.country",
        },
      },
    ]);
    res.json({ status: "success", data: booksWithAuthors });
  } catch (err) {
    res.status(500).json({ status: "error", error: err.message });
  }
});

app.listen(4000, async () => {
  await connectToDatabase();
  console.log("Server is running on port 4000");
});
