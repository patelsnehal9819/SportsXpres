const express = require('express');
const router = express.Router();
const Feedback = require('../models/Feedback');
const Order = require('../models/Order');

// Submit feedback
router.post('/', async (req, res) => {
  try {
    const { orderId } = req.body;
    
    const existingFeedback = await Feedback.findOne({ orderId });
    if (existingFeedback) {
      return res.status(400).json({
        success: false,
        message: 'Feedback already submitted for this order'
      });
    }
    
    const feedback = new Feedback(req.body);
    await feedback.save();
    
    await Order.findOneAndUpdate(
      { orderId },
      { feedback: feedback._id }
    );
    
    res.status(201).json({ success: true, feedback });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get all feedback
router.get('/all', async (req, res) => {
  try {
    const feedback = await Feedback.find()
      .populate('user', 'name email')
      .sort('-createdAt');
    res.json({ success: true, feedback });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get feedback by order
router.get('/order/:orderId', async (req, res) => {
  try {
    const feedback = await Feedback.findOne({ orderId: req.params.orderId })
      .populate('user', 'name email');
    res.json({ success: true, feedback });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get feedback by user
router.get('/user/:userId', async (req, res) => {
  try {
    const feedback = await Feedback.find({ user: req.params.userId })
      .sort('-createdAt');
    res.json({ success: true, feedback });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;