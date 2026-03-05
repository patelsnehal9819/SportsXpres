const express = require('express');
const router = express.Router();
const AISize = require('../models/AISize');

// Save AI size recommendation
router.post('/save', async (req, res) => {
  try {
    const sizeData = req.body;
    sizeData.recommendationId = 'AI' + Date.now() + Math.floor(Math.random() * 1000);
    
    const recommendation = new AISize(sizeData);
    await recommendation.save();
    
    res.status(201).json({ 
      success: true, 
      message: 'Size recommendation saved',
      recommendation 
    });
  } catch (error) {
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