// server.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();

// ===== Allowed Origins =====
const allowedOrigins = [
  "http://localhost:5173",                             // Local dev
  "https://flipkart-clone-pi-neon.vercel.app",        // Your live frontend
  "https://flipkart-clone-o1bx.onrender.com"          // Backend (optional)
];

// ===== Middleware =====
app.use(cors());
app.use(express.json());


// ===== MongoDB Connection =====
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/flipcart';

mongoose
  .connect(MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB error:', err.message));

// ===== Import Routes =====
const authRoutes = require('./route/usercrud');
const productRoutes = require('./route/ProductCrud');
const orderRoutes = require('./route/orderroute');

// ===== API Routes =====
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

// ===== Health Check =====
app.get('/health', (_req, res) => res.send('✅ Server is running fine'));

// ===== Start Server =====
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running at ${PORT}`));
