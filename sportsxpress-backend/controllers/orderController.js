const Order = require('../models/Order');
const User = require('../models/User');
const { sendOrderSMS } = require('../services/smsService');

// @desc    Create new order
// @route   POST /api/orders
exports.createOrder = async (req, res) => {
  try {
    const orderData = req.body;
    orderData.orderId = 'ORD' + Date.now() + Math.floor(Math.random() * 1000);
    
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
};

// @desc    Get orders by user ID
// @route   GET /api/orders/user/:userId
exports.getUserOrders = async (req, res) => {
  try {
    const { userId } = req.params;
    console.log('🔍 Fetching orders for user:', userId);
    
    const orders = await Order.find({ user: userId }).sort('-createdAt');
    
    console.log(`✅ Found ${orders.length} orders for user ${userId}`);
    
    res.json({ 
      success: true, 
      orders,
      count: orders.length 
    });
  } catch (error) {
    console.error('❌ Error fetching user orders:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get single order by orderId
// @route   GET /api/orders/:orderId
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findOne({ orderId: req.params.orderId });
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }
    res.json({ success: true, order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update order status
// @route   PUT /api/orders/:orderId/status
exports.updateOrderStatus = async (req, res) => {
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
};