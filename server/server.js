// server.js
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());              // allow all origins
app.use(express.json());

// MongoDB
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/flipcart";

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB error:", err.message));

// Routes
const authRoutes = require("./route/usercrud");
const productRoutes = require("./route/ProductCrud");
const orderRoutes = require("./route/orderroute");

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);

app.get("/health", (_req, res) => res.send("✅ Server is running fine"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running at ${PORT}`));
