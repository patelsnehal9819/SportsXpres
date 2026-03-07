const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const nodemailer = require('nodemailer'); // Add this import
require('dotenv').config();

// Import models
require('./models/User');
require('./models/Product');
require('./models/Cart');
require('./models/Order');
require('./models/Feedback');
require('./models/Wishlist');
require('./models/AISize');
require('./models/StarterKit');

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

// ========== UPDATED CORS CONFIGURATION ==========
app.use(cors({
  origin: [
    'https://solid-fishstick-7v74445764vj3pjgx-3000.app.github.dev',
    'http://localhost:3000',
    'http://localhost:3001'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
  credentials: true,
  optionsSuccessStatus: 200
}));

// Handle preflight requests for all routes
app.options('*', cors());

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

// ========== DIRECT EMAIL TEST ROUTE (NO DEPENDENCIES) ==========
app.get('/api/test-email-direct', async (req, res) => {
  try {
    console.log('\n📧 ========== DIRECT EMAIL TEST ==========');
    console.log('📧 EMAIL_USER:', process.env.EMAIL_USER || '❌ NOT SET');
    console.log('📧 EMAIL_PASS length:', process.env.EMAIL_PASS?.length || 0);
    
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      throw new Error('EMAIL_USER or EMAIL_PASS not set in .env file');
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    // Test connection
    await transporter.verify();
    console.log('✅ SMTP Connection successful');

    // Send test email
    const mailOptions = {
      from: `"SportsXpress Test" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER, // Send to yourself
      subject: '✅ Direct Test Email from SportsXpress',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 2px solid #4caf50; border-radius: 10px;">
          <h1 style="color: #4caf50; text-align: center;">✅ Email Working!</h1>
          <p style="font-size: 16px;">Your SportsXpress email configuration is working correctly.</p>
          <p style="color: #666;">Time: ${new Date().toLocaleString()}</p>
          <hr>
          <p style="font-size: 14px; color: #999;">This is a direct test from your backend server.</p>
        </div>
      `
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Email sent successfully!');
    console.log('📧 Message ID:', info.messageId);
    console.log('📧 ========== TEST COMPLETE ==========\n');
    
    res.json({ 
      success: true, 
      message: '✅ Test email sent! Check your inbox.',
      messageId: info.messageId,
      to: process.env.EMAIL_USER
    });
    
  } catch (error) {
    console.error('\n❌ EMAIL TEST FAILED:');
    console.error('   Error code:', error.code);
    console.error('   Error message:', error.message);
    if (error.code === 'EAUTH') {
      console.error('\n🔧 FIX THIS BY:');
      console.error('   1. Go to https://myaccount.google.com/apppasswords');
      console.error('   2. Generate a NEW app password');
      console.error('   3. Update your .env file with the new password (NO SPACES)');
      console.error('   4. Make sure EMAIL_USER is your full Gmail address');
      console.error('   5. Restart the server\n');
    }
    
    res.status(500).json({ 
      success: false, 
      error: error.message,
      code: error.code
    });
  }
});

// Test email route (using config)
app.get('/api/test-email', async (req, res) => {
  try {
    console.log('📧 Testing email configuration...');
    console.log('📧 EMAIL_USER:', process.env.EMAIL_USER);
    console.log('📧 EMAIL_PASS exists:', !!process.env.EMAIL_PASS);
    
    const { sendWelcomeEmail } = require('./config/emailConfig');
    const result = await sendWelcomeEmail(process.env.EMAIL_USER, 'Test User');
    
    if (result) {
      res.json({ success: true, message: 'Test email sent successfully! Check your inbox.' });
    } else {
      res.status(500).json({ success: false, message: 'Failed to send test email' });
    }
  } catch (error) {
    console.error('❌ Test email error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Root route
app.get('/', (req, res) => {
  res.json({ 
    success: true, 
    message: 'SportsXpress API',
    collections: ['users', 'products', 'carts', 'orders', 'feedbacks', 'wishlists', 'starterkits', 'aisizes']
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log('📦 Collections: users, products, carts, orders, feedbacks, wishlists, starterkits, aisizes');
  console.log('📧 Test email at: /api/test-email-direct');
});// trigger restart
