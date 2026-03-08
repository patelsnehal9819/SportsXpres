const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const User = require('../models/User');
const { sendOrderSMS } = require('../services/smsService');

// Create new order
router.post('/', async (req, res) => {
  try {
    const orderData = req.body;
    orderData.orderId = 'ORD' + Date.now() + Math.floor(Math.random() * 1000);
    
    // ✅ FIX: Check if user ID is provided
    if (!orderData.user) {
      return res.status(400).json({ 
        success: false, 
        message: 'User ID is required' 
      });
    }
    
    const order = new Order(orderData);
    await order.save();
    
    console.log('✅ Order saved:', order.orderId);
    console.log('👤 Order belongs to user:', order.user);
    
    // Send order confirmation SMS
    try {
      const user = await User.findById(orderData.user);
      if (user && user.phone) {
        sendOrderSMS(user.phone, user.name, order.orderId, orderData.total).catch(err => {
          console.error('❌ Failed to send order SMS:', err.message);
        });
        console.log('📱 Order confirmation SMS queued for:', user.phone);
      }
    } catch (smsError) {
      console.error('❌ Error sending order SMS:', smsError.message);
      // Don't fail the order if SMS fails
    }
    
    res.status(201).json({ 
      success: true, 
      message: 'Order placed successfully!',
      order 
    });
    
  } catch (error) {
    console.error('❌ Order creation error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get user's orders
router.get('/user/:userId', async (req, res) => {
  try {
    const orders = await Order.find({ user: req.params.userId }).sort('-createdAt');
    res.json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get single order by orderId
router.get('/:orderId', async (req, res) => {
  try {
    const order = await Order.findOne({ orderId: req.params.orderId });
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }
    res.json({ success: true, order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Update order status
router.put('/:orderId/status', async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findOneAndUpdate(
      { orderId: req.params.orderId },
      { status },
      { new: true }
    );
    res.json({ success: true, order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;