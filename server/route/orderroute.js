const express = require('express');
const Order = require('./../module/order');
const router = express.Router();

// All Orders (Admin)
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching all orders', error: err.message });
  }
});

// Orders by Email
router.get('/:email', async (req, res) => {
  try {
    const orders = await Order.find({ customerEmail: req.params.email }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching orders', error: err.message });
  }
});

// Create Order
router.post('/', async (req, res) => {
  try {
    const { orderId, customerName, customerEmail, totalAmount, products } = req.body;

    if (!orderId || !customerName || !customerEmail || !totalAmount || !products) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const order = await Order.create({ orderId, customerName, customerEmail, totalAmount, products });
    res.status(201).json({ message: 'Order saved successfully', order });
  } catch (error) {
    res.status(500).json({ message: 'Error saving order', error: error.message });
  }
});
// Example in Express
router.delete("/:id", async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.json({ message: "Order deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete order" });
  }
});


module.exports = router;
