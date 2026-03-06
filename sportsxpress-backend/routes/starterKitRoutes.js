const express = require('express');
const router = express.Router();
const StarterKit = require('../models/StarterKit');

// Handle preflight requests
router.options('/save', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', 'https://solid-fishstick-7v74445764vj3pjgx-3000.app.github.dev');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.sendStatus(200);
});

// Save starter kit
router.post('/save', async (req, res) => {
  try {
    console.log('📥 Saving starter kit:', req.body);
    
    const kitData = req.body;
    kitData.kitId = 'KIT' + Date.now() + Math.floor(Math.random() * 1000);
    
    const kit = new StarterKit(kitData);
    await kit.save();
    
    console.log('✅ Kit saved with ID:', kit._id);
    res.status(201).json({ 
      success: true, 
      message: 'Starter kit saved successfully',
      kit 
    });
  } catch (error) {
    console.error('❌ Error saving kit:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get user's saved kits
router.get('/user/:userId', async (req, res) => {
  try {
    const kits = await StarterKit.find({ user: req.params.userId })
      .sort('-createdAt');
    res.json({ success: true, kits });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;