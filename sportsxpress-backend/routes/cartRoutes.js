const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');

// Get user's cart
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

// Add item to cart
router.post('/add', async (req, res) => {
  try {
    const { userId, productId, name, price, quantity, size, color, image } = req.body;
    
    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      cart = new Cart({ user: userId, items: [] });
    }
    
    const existingItemIndex = cart.items.findIndex(item => 
      item.productId.toString() === productId && 
      item.size === size && 
      item.color === color
    );
    
    if (existingItemIndex > -1) {
      cart.items[existingItemIndex].quantity += quantity;
    } else {
      cart.items.push({
        productId,
        name,
        price,
        quantity,
        size,
        color,
        image
      });
    }
    
    await cart.save();
    res.json({ success: true, cart });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Update cart item quantity
router.put('/update', async (req, res) => {
  try {
    const { userId, productId, quantity, size, color } = req.body;
    
    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return res.status(404).json({ success: false, message: 'Cart not found' });
    }
    
    const itemIndex = cart.items.findIndex(item => 
      item.productId.toString() === productId && 
      item.size === size && 
      item.color === color
    );
    
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

// Remove item from cart
router.delete('/remove', async (req, res) => {
  try {
    const { userId, productId, size, color } = req.body;
    
    const cart = await Cart.findOne({ user: userId });
    if (cart) {
      cart.items = cart.items.filter(item => 
        !(item.productId.toString() === productId && 
          item.size === size && 
          item.color === color)
      );
      await cart.save();
    }
    
    res.json({ success: true, cart });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Clear cart
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

module.exports = router;