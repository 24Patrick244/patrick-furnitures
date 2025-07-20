const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/patrick-furnitures', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Product schema
const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  currency: String,
  category: String,
  stock: Number,
  description: String,
  image: String,
});

const Product = mongoose.model('Product', productSchema);

// REST API endpoints

// Get all products
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// Add a new product
app.post('/api/products', async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add product' });
  }
});

// Edit a product
app.put('/api/products/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update product' });
  }
});

// Delete a product
app.delete('/api/products/:id', async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete product' });
  }
});

// Use the port provided by Render, or 10000 locally
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});
