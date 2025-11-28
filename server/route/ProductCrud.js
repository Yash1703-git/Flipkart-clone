const express = require('express');
const Product = require('./../module/product');
const product = require('./../module/product');
const router = express.Router();

// Create Product
router.post("/create", async (req, res) => {
  try {
  let data;

  // Check if request body is array or single object
  if (Array.isArray(req.body)) {
    data = await Product.insertMany(req.body);
  } else {
    data = await Product.create(req.body);
  }

  res.status(201).json({ message: "Product created successfully", data });
} catch (error) {
  console.error("Error creating product:", error);
  res.status(500).json({ message: "Error creating product", error: error.message });
}
});

// List Products
router.get('/list', async (_req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products', error: error.message });
  }
});

// Update Product
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, imgurl, stock } = req.body;

    // Validation
    if (!name || !description || !price || !imgurl || !stock) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { name, description, price, imgurl, stock },
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ message: "Product updated successfully", product: updatedProduct });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error updating product", error: err.message });
  }
});

// Delete Product
router.delete('/:id', async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'Product deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting product', error: error.message });
  }
});

module.exports = router;
