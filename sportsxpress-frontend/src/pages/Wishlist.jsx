import React from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Rating,
  Chip,
  IconButton,
  Divider,
} from '@mui/material';
import {
  ShoppingCart,
  Delete,
  Favorite,
  LocalShipping,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';

// Format price in Indian Rupees
const formatPrice = (price) => {
  return `₹${price?.toLocaleString('en-IN') || 0}`;
};

const Wishlist = () => {
  const navigate = useNavigate();
  const { wishlistItems, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleAddToCart = (product) => {
    addToCart(product);
    toast.success(`${product.name} added to cart!`);
  };

  const handleRemoveFromWishlist = (productId, productName) => {
    removeFromWishlist(productId);
    toast.success(`${productName} removed from wishlist`);
  };

  const handleMoveToCart = (product) => {
    addToCart(product);
    removeFromWishlist(product._id);
    toast.success(`${product.name} moved to cart!`);
  };

  if (wishlistItems.length === 0) {
    return (
      <Container maxWidth="lg" sx={{ py: 8, textAlign: 'center' }}>
        <Favorite sx={{ fontSize: 80, color: '#ccc', mb: 2 }} />
        <Typography variant="h5" gutterBottom>Your Wishlist is Empty</Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Save your favorite items here and shop them later!
        </Typography>
        <Button 
          variant="contained" 
          onClick={() => navigate('/products')}
          sx={{ bgcolor: '#fb641b' }}
        >
          Continue Shopping
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4, bgcolor: '#f1f3f6', minHeight: '100vh' }}>
      {/* Header */}
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Typography variant="h4" fontWeight="bold">My Wishlist</Typography>
          <Typography variant="body2" color="text.secondary">
            {wishlistItems.length} items saved
          </Typography>
        </Box>
        <Button 
          variant="outlined" 
          color="error" 
          onClick={clearWishlist}
        >
          Clear Wishlist
        </Button>
      </Box>

      {/* Wishlist Items Grid */}
      <Grid container spacing={2}>
        {wishlistItems.map((product) => {
          const discount = product.discountPercentage || 
            (product.originalPrice > product.price ? 
              Math.floor(((product.originalPrice - product.price) / product.originalPrice) * 100) : 20);

          return (
            <Grid item xs={12} sm={6} md={4} lg={3} key={product._id}>
              <Card 
                sx={{ 
                  height: '100%', 
                  display: 'flex', 
                  flexDirection: 'column',
                  position: 'relative',
                  cursor: 'pointer',
                  '&:hover': { boxShadow: 6 }
                }}
                onClick={() => navigate(`/products/${product._id}`)}
              >
                {/* Delete Button */}
                <IconButton
                  sx={{
                    position: 'absolute',
                    top: 8,
                    right: 8,
                    zIndex: 10,
                    bgcolor: 'white',
                    boxShadow: 1,
                    '&:hover': { bgcolor: '#ff4444', color: 'white' }
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveFromWishlist(product._id, product.name);
                  }}
                >
                  <Delete />
                </IconButton>

                {/* Discount Badge */}
                {discount > 0 && (
                  <Chip 
                    label={`${discount}% OFF`} 
                    size="small" 
                    sx={{ 
                      position: 'absolute', 
                      top: 8, 
                      left: 8, 
                      bgcolor: '#ff4444', 
                      color: 'white',
                      fontWeight: 'bold'
                    }} 
                  />
                )}

                {/* Product Image */}
                <Box
                  sx={{
                    height: 180,
                    width: '100%',
                    backgroundImage: `url(${product.image})`,
                    backgroundSize: 'contain',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    backgroundColor: '#ffffff',
                    borderBottom: '1px solid #eee',
                    p: 2
                  }}
                />

                <CardContent sx={{ p: 1.5 }}>
                  <Typography variant="caption" color="text.secondary">
                    {product.brand}
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600, height: 40, overflow: 'hidden' }}>
                    {product.name}
                  </Typography>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, flexWrap: 'wrap', mt: 0.5 }}>
                    <Typography variant="caption" sx={{ color: '#00a650', fontWeight: 'bold' }}>
                      {discount}% off
                    </Typography>
                    <Typography variant="caption" sx={{ textDecoration: 'line-through', color: '#999' }}>
                      {formatPrice(product.originalPrice)}
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#2ecc71' }}>
                      {formatPrice(product.price)}
                    </Typography>
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 0.5 }}>
                    <Rating value={parseFloat(product.rating) || 4} size="small" readOnly />
                    <Chip label="Assured" size="small" sx={{ height: 16, fontSize: '8px', bgcolor: '#ffc107' }} />
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <LocalShipping sx={{ fontSize: 14, color: '#00a650' }} />
                    <Typography variant="caption" sx={{ color: '#00a650' }}>Free Delivery</Typography>
                  </Box>
                </CardContent>

                <Divider />

                <Box sx={{ p: 1.5, display: 'flex', gap: 1 }}>
                  <Button
                    fullWidth
                    variant="contained"
                    size="small"
                    startIcon={<ShoppingCart />}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleMoveToCart(product);
                    }}
                    sx={{ bgcolor: '#fb641b' }}
                  >
                    Move to Cart
                  </Button>
                </Box>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
};

export default Wishlist;