const express = require('express');
const router = express.Router();
// REMOVE THIS LINE: const { protect } = require('../middleware/authMiddleware');
const User = require('../models/User');

// 🟢 PUBLIC - No authentication needed
router.get('/profile', async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json({ success: true, users });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// 🟢 PUBLIC
router.put('/profile', async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id || req.body.id,
      req.body,
      { new: true }
    ).select('-password');
    res.json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;