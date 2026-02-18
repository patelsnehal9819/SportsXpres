import React from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  IconButton,
  TextField,
  Divider,
  Chip,
  Alert,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
} from '@mui/material';
import {
  Delete,
  Add,
  Remove,
  ShoppingCart,
  ArrowBack,
  Payment,
} from '@mui/icons-material';
import { useCart } from '../context/CartContext';
import { useNavigate, Link } from 'react-router-dom';
import { formatINR } from '../utils/currencyFormatter';
import toast from 'react-hot-toast';

const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();

  const handleQuantityChange = (itemId, newQuantity) => {
    if (newQuantity > 0) {
      updateQuantity(itemId, newQuantity);
    }
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      toast.error('Your cart is empty');
      return;
    }
    navigate('/checkout');
  };

  const subtotal = getCartTotal();
  const shipping = subtotal > 500 ? 0 : 40;
  const tax = subtotal * 0.1;
  const total = subtotal + shipping + tax;

  if (cartItems.length === 0) {
    return (
      <Box sx={{ p: 2, textAlign: 'center', pt: 8 }}>
        <ShoppingCart sx={{ fontSize: 80, color: '#ccc', mb: 3 }} />
        <Typography variant="h6" gutterBottom>
          Your cart is empty
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          Looks like you haven't added anything yet.
        </Typography>
        <Button
          variant="contained"
          component={Link}
          to="/products"
          startIcon={<ArrowBack />}
          sx={{ bgcolor: '#fb641b', borderRadius: 2, px: 4 }}
        >
          Shop Now
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" fontWeight="bold" gutterBottom>
        Shopping Cart ({cartItems.length})
      </Typography>

      {/* Cart Items */}
      <Paper sx={{ borderRadius: 2, mb: 2, overflow: 'hidden' }}>
        <List sx={{ p: 0 }}>
          {cartItems.map((item) => (
            <Box key={item.id}>
              <ListItem alignItems="flex-start" sx={{ p: 2 }}>
                <ListItemAvatar sx={{ minWidth: 70 }}>
                  <Avatar
                    src={item.image || 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'}
                    variant="rounded"
                    sx={{ width: 60, height: 60 }}
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography variant="subtitle2" fontWeight="bold">
                      {item.name}
                    </Typography>
                  }
                  secondary={
                    <Box>
                      <Typography variant="caption" color="text.secondary">
                        {item.brand}
                      </Typography>
                      {item.selectedSize && (
                        <Chip 
                          label={`Size: ${item.selectedSize}`} 
                          size="small" 
                          sx={{ ml: 1, height: 20 }}
                        />
                      )}
                    </Box>
                  }
                />
              </ListItem>

              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: 2, pb: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <IconButton 
                    size="small" 
                    onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                    sx={{ border: '1px solid #ddd', borderRadius: 1 }}
                  >
                    <Remove fontSize="small" />
                  </IconButton>
                  <TextField
                    size="small"
                    value={item.quantity}
                    onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value) || 1)}
                    sx={{ width: 50, mx: 1 }}
                    inputProps={{ style: { textAlign: 'center' } }}
                  />
                  <IconButton 
                    size="small" 
                    onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                    sx={{ border: '1px solid #ddd', borderRadius: 1 }}
                  >
                    <Add fontSize="small" />
                  </IconButton>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography fontWeight="bold" color="primary.main">
                    {formatINR(item.price * item.quantity)}
                  </Typography>
                  <IconButton size="small" onClick={() => removeFromCart(item.id)}>
                    <Delete fontSize="small" color="error" />
                  </IconButton>
                </Box>
              </Box>
              <Divider />
            </Box>
          ))}
        </List>
      </Paper>

      {/* Order Summary */}
      <Paper sx={{ p: 2, borderRadius: 2, mb: 2 }}>
        <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
          Order Summary
        </Typography>
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography variant="body2">Subtotal</Typography>
          <Typography variant="body2">{formatINR(subtotal)}</Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography variant="body2">Shipping</Typography>
          <Typography variant="body2" color="success.main">
            {shipping === 0 ? 'Free' : formatINR(shipping)}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography variant="body2">Tax (10%)</Typography>
          <Typography variant="body2">{formatINR(tax)}</Typography>
        </Box>
        <Divider sx={{ my: 1 }} />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography variant="subtitle1" fontWeight="bold">Total</Typography>
          <Typography variant="h6" color="primary.main" fontWeight="bold">
            {formatINR(total)}
          </Typography>
        </Box>

        {subtotal < 500 && (
          <Alert severity="info" sx={{ mt: 1, py: 0 }}>
            Add {formatINR(500 - subtotal)} more for free shipping
          </Alert>
        )}
      </Paper>

      {/* Checkout Button */}
      <Button
        fullWidth
        variant="contained"
        size="large"
        onClick={handleCheckout}
        startIcon={<Payment />}
        sx={{ 
          bgcolor: '#fb641b',
          borderRadius: 2,
          py: 1.5,
          mb: 2,
        }}
      >
        Proceed to Checkout
      </Button>

      {/* Clear Cart */}
      <Button
        fullWidth
        variant="outlined"
        onClick={clearCart}
        sx={{ borderRadius: 2 }}
      >
        Clear Cart
      </Button>
    </Box>
  );
};

export default Cart;