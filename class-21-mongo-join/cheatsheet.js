/**
 * MongoDB Aggregation Pipeline Cheatsheet
 * 
 * RUN IT:
 * node aggregation-cheatsheet.js
 */

const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

// ==========================================
// 1. SETUP SCHEMAS & MODELS FOR JOINING ($lookup)
// ==========================================

// Author Model
const Author = mongoose.model('Author', new mongoose.Schema({
  name: String,
  country: String
}));

// Book Model (linked to Author via authorId)
const Book = mongoose.model('Book', new mongoose.Schema({
  title: String,
  price: Number,
  category: String,
  salesCount: Number,
  authorId: mongoose.Schema.Types.ObjectId
}));


// ==========================================
// 2. WHAT IS AN AGGREGATION PIPELINE?
// ==========================================
/**
 * Think of an Aggregation Pipeline as a Factory Assembly Line!
 * Raw Documents ──> [Stage 1: Filter] ──> [Stage 2: Group] ──> [Stage 3: Format] ──> Final Result
 * 
 * Each stage takes input data, transforms it, and passes the result to the next stage.
 */


// ==========================================
// 3. COMPLETE AGGREGATION DEMO ROUTE
// ==========================================

app.get('/api/analytics/books', async (req, res) => {
  try {
    const stats = await Book.aggregate([

      // ──────────────────────────────────────────
      // STAGE 1: $match (Filtering Data)
      // Works just like normal .find() queries. Filter out what you don't need FIRST!
      // ──────────────────────────────────────────
      {
        $match: {
          price: { $gte: 10 },        // Only books $10 or more
          category: { $ne: 'Draft' }   // Exclude 'Draft' category
        }
      },

      // ──────────────────────────────────────────
      // STAGE 2: $group (Grouping & Calculating Statistics)
      // Groups documents by a specific field and calculates metrics ($sum, $avg, $min, $max)
      // ──────────────────────────────────────────
      {
        $group: {
          _id: '$category',                     // Group books by category field
          totalBooks: { $sum: 1 },              // Count total books in each category
          totalSales: { $sum: '$salesCount' },  // Add up all salesCount numbers
          avgPrice: { $avg: '$price' },         // Calculate average price
          cheapest: { $min: '$price' },         // Find lowest price
          priciest: { $max: '$price' }          // Find highest price
        }
      },

      // ──────────────────────────────────────────
      // STAGE 3: $project (Selecting & Formatting Fields)
      // Reshapes the output. Use 1 to keep, 0 to hide, or create new computed fields.
      // ──────────────────────────────────────────
      {
        $project: {
          _id: 0,                               // Hide MongoDB default _id
          categoryName: '$_id',                 // Rename '_id' to 'categoryName'
          totalBooks: 1,
          totalSales: 1,
          // Round average price to 2 decimal places using $round operator
          averagePriceFormatted: { $round: ['$avgPrice', 2] }
        }
      },

      // ──────────────────────────────────────────
      // STAGE 4: $sort (Sorting Results)
      // 1 = Ascending, -1 = Descending
      // ──────────────────────────────────────────
      {
        $sort: { totalSales: -1 } // Highest sales first
      }

    ]);

    res.json({ status: 'success', results: stats.length, data: stats });
  } catch (err) {
    res.status(500).json({ status: 'error', error: err.message });
  }
});


// ==========================================
// 4. JOINING COLLECTIONS ($lookup)
// ==========================================
// $lookup acts like a SQL JOIN. It connects two collections together.

app.get('/api/books-with-authors', async (req, res) => {
  try {
    const booksWithAuthors = await Book.aggregate([

      // STAGE 1: Join 'authors' collection with 'books'
      {
        $lookup: {
          from: 'authors',          // Target collection name (must match database collection name, usually lowercased & plural)
          localField: 'authorId',   // Field inside the Book document
          foreignField: '_id',      // Matching field inside the Author document
          as: 'authorDetails'       // Name of the array field where joined data will be placed
        }
      },

      // STAGE 2: $unwind (Flattens the joined array)
      // $lookup returns an array like `[ { name: 'John' } ]`.
      // $unwind converts `authorDetails: [...]` into a clean object `authorDetails: {...}`
      {
        $unwind: '$authorDetails'
      },

      // STAGE 3: Pick only the clean fields you want to send back
      {
        $project: {
          title: 1,
          price: 1,
          category: 1,
          authorName: '$authorDetails.name',
          authorCountry: '$authorDetails.country'
        }
      }

    ]);

    res.json({ status: 'success', data: booksWithAuthors });
  } catch (err) {
    res.status(500).json({ status: 'error', error: err.message });
  }
});


// ==========================================
// 5. START SERVER
// ==========================================
mongoose.connect('mongodb+srv://bsse1106_db_user:GlgnLuyiXXjJ3wds@cluster0.m3zhjem.mongodb.net/')
  .then(() => {
    app.listen(4000, () => console.log('Server running on http://localhost:4000'));
  });