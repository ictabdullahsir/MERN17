const dns = require("dns");
dns.setServers(["8.8.8.8", "1.1.1.1"]);

const express = require("express");
const mongoose = require("mongoose");
const app = express();
app.use(express.json());

const MONGODB_URI = "mongodb+srv://bsse1106_db_user:GlgnLuyiXXjJ3wds@cluster0.m3zhjem.mongodb.net/"

async function connectToDatabase() {
  try {
    await mongoose.connect(MONGODB_URI)
    console.log("Connected to MongoDB!");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

const BookSchema = new mongoose.Schema({
    title: String,
    price: Number,
    category: String,
    salesCount: Number,
    authorId: mongoose.Schema.Types.ObjectId
})

const AuthorSchema = new mongoose.Schema({
    name: String,
    country: String
})

const Book = mongoose.model("Book", BookSchema);
const Author = mongoose.model("Author", AuthorSchema);


app.get("/books", async (req, res) => {
  try {
    const books = await Book.aggregate([
      {
        $match:{
          price: { $gte: 10 }
        }
      },
      {
        $group: {
          _id: "$category",
          totalBooks: { $sum: 1 },
          totalSales: { $sum: "$salesCount" },
          avgPrice: { $avg: "$price" },
        }
      },
      {
        $project: {
          _id: 0,
          category: "$_id",
          totalBooks: 1,
          totalSales: 1,
          avgPrice: 1
        }
      }
    ]);
    res.json({ status: 'success', results: books.length, data: books });
  } catch (err) {
    res.status(500).json({ status: 'error', error: err.message });
  }
})

app.get("/book-with-authors", async (req, res) => {
  try {
    const booksWithAuthors = await Book.aggregate([
      {
        $lookup: {
          from: "authors",
          localField: "authorId",
          foreignField: "_id",
          as: "authorDetails"
        }
      },
      {
        $unwind: "$authorDetails"
      },
      {
        $project: {
          _id: 0,
          title: 1,
          price: 1,
          category: 1,
          author_name: "$authorDetails.name",
          authorCountry: "$authorDetails.country"
        }
      }
    ])
    res.json({ status: 'success', data: booksWithAuthors });
  } catch (err) {
    res.status(500).json({ status: 'error', error: err.message });
  }
})

app.listen(4000, async () => {
  await connectToDatabase();
  console.log("Server is running on port 4000");
});