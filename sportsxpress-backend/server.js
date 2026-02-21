const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');  // Changed from ./src/config/db
const errorHandler = require('./middleware/errorMiddleware'); // Changed from ./src/middleware

// Load env vars
dotenv.config();

// Connect to database
connectDB();

// Route files
const authRoutes = require('./routes/authRoutes'); // Changed from ./src/routes
// Add other routes as you create them

const app = express();

// Body parser
app.use(express.json());

// Enable CORS
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true,
}));

// Mount routers
app.use('/api/auth', authRoutes);
// Add other routes: app.use('/api/products', productRoutes);

// Base route
app.get('/', (req, res) => {
  res.json({ 
    message: 'Welcome to SportsXpress API',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      products: '/api/products',
      orders: '/api/orders',
      users: '/api/users',
    }
  });
});

// Error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`❌ Error: ${err.message}`);
  // Close server & exit process
  server.close(() => process.exit(1));
});