

const dns = require("dns");
dns.setServers(["8.8.8.8", "1.1.1.1"]);
const express = require("express");
const mongoose = require("mongoose");
const app = express();
app.use(express.json());

 const MONGODB_URI = "mongodb+srv://ictabdullahsir_db_user:oC0ZqA1mN1vPJTWW@cluster0.bna5sft.mongodb.net/ostad";

async function connectToDatabase() {
  try {
    await mongoose.connect(MONGODB_URI)
    console.log("Connected to MongoDB!");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

const productSchema = new mongoose.Schema({
  name : { type: String, required: true },
  description : { type: String, required: true },
  price : { type: Number, required: true },
}, { timestamps: true });

const Product = mongoose.model("Product", productSchema);

app.post("/products", async (req, res) => {
  const info = req.body
  try {
    const newProdcut = await Product.create(info)
    res.status(201).json({ status: "success", data: newProdcut })
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
})

app.get("/products", async (req, res) => {
  try {
    const products = await Product.find()
    res.status(200).json({ status: "success", data: products })
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
})

// write an api to get a SINGLE product
// write here

app.delete("/products/:id", async (req, res) => {
  const productId = req.params.id;
  try {
    const deletedProduct = await Product.findByIdAndDelete(productId);
    if (!deletedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.status(200).json({ status: "success", data: deletedProduct });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.put("/products/:id", async (req, res) => {
  const productId = req.params.id;
  const info = req.body;
  try {
    const updatedProduct = await Product.findByIdAndUpdate(productId, info, {new : true})
    res.status(200).json({ status: "success", data: updatedProduct })
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
})

app.listen(4000, async () => {
  await connectToDatabase();
  console.log("Server is running on port 4000");
});
