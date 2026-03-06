const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');

// IMPORTANT: Specific routes must come BEFORE dynamic routes
// ✅ ADD TO CART - SPECIFIC ROUTE FIRST
router.post('/add', async (req, res) => {
  try {
    console.log('📥 ADD TO CART - Request received:', req.body);
    const { userId, productId, name, price, quantity, image, brand, category } = req.body;
    
    // Validate required fields
    if (!userId || !productId) {
      return res.status(400).json({ 
        success: false, 
        message: 'Missing required fields' 
      });
    }

    let cart = await Cart.findOne({ user: userId });
    
    if (!cart) {
      cart = new Cart({ user: userId, items: [] });
    }
    
    // Check if product already exists
    const existingItemIndex = cart.items.findIndex(
      item => item.productId.toString() === productId
    );
    
    if (existingItemIndex > -1) {
      // Update quantity
      cart.items[existingItemIndex].quantity += quantity || 1;
    } else {
      // Add new item
      cart.items.push({
        productId,
        name,
        price,
        quantity: quantity || 1,
        image,
        brand,
        category
      });
    }
    
    await cart.save();
    
    res.json({ 
      success: true, 
      message: 'Item added to cart',
      cart 
    });
  } catch (error) {
    console.error('❌ Error adding to cart:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// ✅ REMOVE FROM CART - SPECIFIC ROUTE
router.delete('/remove', async (req, res) => {
  try {
    const { userId, productId } = req.body;
    
    const cart = await Cart.findOne({ user: userId });
    if (cart) {
      cart.items = cart.items.filter(item => item.productId.toString() !== productId);
      await cart.save();
    }
    
    res.json({ success: true, cart });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ✅ UPDATE QUANTITY - SPECIFIC ROUTE
router.put('/update', async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;
    
    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return res.status(404).json({ success: false, message: 'Cart not found' });
    }
    
    const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);
    
    if (itemIndex > -1) {
      if (quantity <= 0) {
        cart.items.splice(itemIndex, 1);
      } else {
        cart.items[itemIndex].quantity = quantity;
      }
      await cart.save();
    }
    
    res.json({ success: true, cart });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ✅ CLEAR CART - SPECIFIC ROUTE
router.delete('/clear/:userId', async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.params.userId });
    if (cart) {
      cart.items = [];
      await cart.save();
    }
    res.json({ success: true, message: 'Cart cleared' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ✅ GET USER CART - DYNAMIC ROUTE (MUST COME LAST)
router.get('/:userId', async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.params.userId });
    
    if (!cart) {
      cart = new Cart({ user: req.params.userId, items: [] });
      await cart.save();
    }
    
    res.json({ success: true, cart });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;