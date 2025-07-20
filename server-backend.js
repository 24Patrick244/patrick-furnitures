Here's the exact content for `server-backend.js` to paste on GitHub:

Read file: backend/server.js
## **📋 Copy and Paste This Content for `server-backend.js`:**

```javascript
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB (cloud or local)
mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://patrick-furnitures-admin:YOUR_ACTUAL_PASSWORD@cluster0.ashifhg.mongodb.net/patrick-furnitures?retryWrites=true&w=majority&appName=Cluster0', {
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

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});
```

**Copy this entire code block and paste it into the `server-backend.js` file on GitHub!** 🚀
