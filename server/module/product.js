// models/product.js
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true }, // NOT "desc"
  price: { type: Number, required: true },
  imgurl: { type: String, required: true },
  stock: { type: Number, required: true },
});

module.exports = mongoose.model("Product", productSchema);
