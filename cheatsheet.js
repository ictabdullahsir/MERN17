/**
 * MongoDB & CRUD Basics Cheatsheet
 * 
 * RUN IT:
 * node mongodb-cheatsheet.js
 */

const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

// ==========================================
// 1. SQL VS. NOSQL (THE QUICK COMPARISON)
// ==========================================
/**
 * SQL (Relational)            MongoDB (NoSQL)
 * ─────────────────           ──────────────────
 * Database                    Database
 * Table                       Collection
 * Row                         Document (BSON / JSON-like object)
 * Column                      Field
 * Rigid Schema (Tables)       Flexible Schema (Documents can vary)
 */


// ==========================================
// 2. CONNECTING TO MONGODB (ATLAS / COMPASS)
// ==========================================
// Local Compass URI: "mongodb://127.0.0.1:27017/myDatabase"
// Atlas (Cloud) URI: "mongodb+srv://<user>:<password>@cluster0.mongodb.net/myDatabase"

const MONGO_URI = 'mongodb://127.0.0.1:27017/shopApp';

mongoose.connect(MONGO_URI)
  .then(() => console.log(' Connected to MongoDB!'))
  .catch((err) => console.error(' Connection Error:', err));


// ==========================================
// 3. DEFINE SCHEMA & MODEL
// ==========================================
// Schema: Defines the structure/blueprint of documents in a collection
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, default: 'General' },
  inStock: { type: Boolean, default: true },
  tags: [String]
}, { timestamps: true }); // Automatically adds createdAt and updatedAt fields

// Model: The tool used to perform CRUD operations on the 'products' collection
const Product = mongoose.model('Product', productSchema);


// ==========================================
// 4. CREATE (STORING DOCUMENTS)
// ==========================================
app.post('/products', async (req, res) => {
  try {
    // Create & save a single document
    const newProduct = await Product.create(req.body);
    res.status(201).json({ status: 'success', data: newProduct });
  } catch (err) {
    res.status(400).json({ status: 'fail', error: err.message });
  }
});


// ==========================================
// 5. READ & ADVANCED FILTERING (OPERATORS, SORTING, PAGINATION)
// ==========================================
app.get('/products', async (req, res) => {
  try {
    // --- A. Query Operators ---
    // $gt  = greater than       | $gte = greater than or equal
    // $lt  = less than          | $lte = less than or equal
    // $in  = in array           | $regex = pattern match (search)

    // Example query parameters: /products?minPrice=50&category=Tech&page=1&limit=5
    const { minPrice, category, search, page = 1, limit = 5, sortBy = 'price' } = req.query;

    const filter = {};

    // Filter by minimum price ($gte)
    if (minPrice) filter.price = { $gte: Number(minPrice) };

    // Exact match filter
    if (category) filter.category = category;

    // Search term match ($regex, 'i' = case-insensitive)
    if (search) filter.name = { $regex: search, $options: 'i' };

    // --- B. Pagination & Sorting ---
    const skip = (Number(page) - 1) * Number(limit);

    const products = await Product.find(filter)
      .sort({ [sortBy]: 1 }) // 1 = Ascending, -1 = Descending
      .skip(skip)            // Skip items for previous pages
      .limit(Number(limit)); // Limit number of items returned

    const totalCount = await Product.countDocuments(filter);

    res.json({
      status: 'success',
      results: products.length,
      totalCount,
      page: Number(page),
      data: products
    });
  } catch (err) {
    res.status(500).json({ status: 'error', error: err.message });
  }
});

// Read single document by ID
app.get('/products/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(400).json({ error: 'Invalid ID format' });
  }
});


// ==========================================
// 6. UPDATE (MODIFICATION OPERATORS)
// ==========================================
app.put('/products/:id', async (req, res) => {
  try {
    // { new: true } returns the updated document instead of the old one
    // { runValidators: true } ensures updates respect Schema rules
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedProduct) return res.status(404).json({ error: 'Product not found' });
    res.json({ status: 'success', data: updatedProduct });
  } catch (err) {
    res.status(400).json({ status: 'fail', error: err.message });
  }
});


// ==========================================
// 7. DELETE (REMOVING DATA)
// ==========================================
app.delete('/products/:id', async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) return res.status(404).json({ error: 'Product not found' });

    // 204 No Content (or 200 with confirmation message)
    res.status(200).json({ status: 'success', message: 'Product deleted successfully' });
  } catch (err) {
    res.status(400).json({ status: 'fail', error: err.message });
  }
});


// ==========================================
// 8. START SERVER
// ==========================================
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});