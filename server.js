const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const productRoutes = require('./routes/productRoutes');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Use Atlas connection on Render, local DB when running locally
const mongoURI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/grocery-aisle-digital-hub-main';

// ✅ MongoDB connection
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: 'shopsmart', // 💡 ensures correct DB name
})
  .then(() => console.log(`✅ MongoDB connected (${mongoURI.includes('127.0.0.1') ? 'Local' : 'Atlas'})`))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// ✅ Health check route
app.get('/', (req, res) => {
  res.send('ShopSmart backend is running 🚀');
});

// ✅ Product API route
app.use('/api/products', productRoutes);

// ✅ Start server (Render uses dynamic port)
const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Server running on port ${PORT}`);
});
