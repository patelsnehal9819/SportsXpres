const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Import models
require('./models/User');
require('./models/Product');
require('./models/Cart');
require('./models/Order');
require('./models/Feedback');
require('./models/Wishlist');

// Import routes
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes');
const feedbackRoutes = require('./routes/feedbackRoutes');
const wishlistRoutes = require('./routes/wishlistRoutes');
const userRoutes = require('./routes/userRoutes');
const starterKitRoutes = require('./routes/starterKitRoutes');
const aiSizeRoutes = require('./routes/aiSizeRoutes');

const app = express();

// Middleware
app.use(cors({
  origin: [
    'https://solid-fishstick-7v74445764vj3pjgx-3000.app.github.dev',
    'http://localhost:3000',
    'http://localhost:3001'
  ],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.log('❌ MongoDB Error:', err));

// Routes - ALL DATA GOES TO MONGODB ATLAS AUTOMATICALLY
app.use('/api/auth', authRoutes);              // → users collection
app.use('/api/users', userRoutes);             // → users collection
app.use('/api/products', productRoutes);        // → products collection
app.use('/api/cart', cartRoutes);               // → carts collection
app.use('/api/orders', orderRoutes);            // → orders collection
app.use('/api/feedback', feedbackRoutes);       // → feedbacks collection
app.use('/api/wishlist', wishlistRoutes);       // → wishlists collection
app.use('/api/starter-kit', starterKitRoutes);
app.use('/api/ai-size', aiSizeRoutes);

// Test route
app.get('/api/test', (req, res) => {
  res.json({ success: true, message: 'API is working!' });
});

// Root route
app.get('/', (req, res) => {
  res.json({ 
    success: true, 
    message: 'SportsXpress API',
    collections: ['users', 'products', 'carts', 'orders', 'feedbacks', 'wishlists']
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log('📦 Collections: users, products, carts, orders, feedbacks, wishlists');
});