const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  orderId: { type: String, required: true, unique: true },
  customerName: { type: String, required: true },
  customerEmail: { type: String, required: true },
  totalAmount: { type: Number, required: true },
  products: [
    {
      productName: { type: String, required: true },
      quantity: { type: Number, required: true },
      totalPrice: { type: Number, required: true }
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model('orders', OrderSchema);
