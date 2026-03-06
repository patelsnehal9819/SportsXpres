const express = require('express');
const router = express.Router();
const AISize = require('../models/AISize');

// Handle preflight requests
router.options('/save', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', 'https://solid-fishstick-7v74445764vj3pjgx-3000.app.github.dev');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.sendStatus(200);
});

// Save AI size recommendation
router.post('/save', async (req, res) => {
  try {
    console.log('📥 Saving AI size:', req.body);
    
    const sizeData = req.body;
    sizeData.recommendationId = 'AI' + Date.now() + Math.floor(Math.random() * 1000);
    
    const recommendation = new AISize(sizeData);
    await recommendation.save();
    
    console.log('✅ AI size saved with ID:', recommendation._id);
    res.status(201).json({ 
      success: true, 
      message: 'Size recommendation saved',
      recommendation 
    });
  } catch (error) {
    console.error('❌ Error saving AI size:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get user's size recommendations
router.get('/user/:userId', async (req, res) => {
  try {
    const recommendations = await AISize.find({ user: req.params.userId })
      .sort('-createdAt');
    res.json({ success: true, recommendations });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;