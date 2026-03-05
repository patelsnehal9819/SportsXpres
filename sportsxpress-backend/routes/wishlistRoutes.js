const express = require('express');
const router = express.Router();
const Wishlist = require('../models/Wishlist');

// Get user's wishlist
router.get('/:userId', async (req, res) => {
  try {
    let wishlist = await Wishlist.findOne({ user: req.params.userId });
    
    if (!wishlist) {
      wishlist = new Wishlist({ user: req.params.userId, items: [] });
      await wishlist.save();
    }
    
    res.json({ success: true, wishlist });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Add to wishlist
router.post('/add', async (req, res) => {
  try {
    const { userId, productId, name, price, brand, image, category } = req.body;
    
    let wishlist = await Wishlist.findOne({ user: userId });
    if (!wishlist) {
      wishlist = new Wishlist({ user: userId, items: [] });
    }
    
    // Check if product already exists
    const exists = wishlist.items.some(item => item.productId.toString() === productId);
    
    if (!exists) {
      wishlist.items.push({
        productId,
        name,
        price,
        brand,
        image,
        category
      });
      await wishlist.save();
    }
    
    res.json({ success: true, wishlist });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Remove from wishlist
router.delete('/remove', async (req, res) => {
  try {
    const { userId, productId } = req.body;
    
    const wishlist = await Wishlist.findOne({ user: userId });
    if (wishlist) {
      wishlist.items = wishlist.items.filter(item => item.productId.toString() !== productId);
      await wishlist.save();
    }
    
    res.json({ success: true, wishlist });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Clear wishlist
router.delete('/clear/:userId', async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({ user: req.params.userId });
    if (wishlist) {
      wishlist.items = [];
      await wishlist.save();
    }
    res.json({ success: true, message: 'Wishlist cleared' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;