import React from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  IconButton,
  Rating,
  Chip,
  Paper,
  Divider,
} from '@mui/material';
import {
  Favorite,
  Delete,
  ShoppingCart,
  ArrowBack,
  Share,
} from '@mui/icons-material';
import { useNavigate, Link } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { formatINR } from '../utils/currencyFormatter';
import toast from 'react-hot-toast';

const Wishlist = () => {
  const { wishlistItems, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleAddToCart = (product) => {
    addToCart(product);
    removeFromWishlist(product.id);
    toast.success(`${product.name} moved to cart!`);
  };

  const handleShareWishlist = () => {
    if (navigator.share) {
      navigator.share({
        title: 'My SportsXpress Wishlist',
        text: `Check out my wishlist with ${wishlistItems.length} items!`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Wishlist link copied!');
    }
  };

  if (wishlistItems.length === 0) {
    return (
      <Box sx={{ p: 2, textAlign: 'center', pt: 8 }}>
        <Favorite sx={{ fontSize: 80, color: '#ccc', mb: 3 }} />
        <Typography variant="h6" gutterBottom>
          Your wishlist is empty
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          Save your favorite items here and shop them later!
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
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6" fontWeight="bold">
          My Wishlist ({wishlistItems.length})
        </Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <IconButton size="small" onClick={handleShareWishlist} sx={{ bgcolor: '#f5f5f5' }}>
            <Share fontSize="small" />
          </IconButton>
          <IconButton size="small" onClick={clearWishlist} sx={{ bgcolor: '#f5f5f5' }}>
            <Delete fontSize="small" />
          </IconButton>
        </Box>
      </Box>

      <Divider sx={{ mb: 2 }} />

      {/* Wishlist Grid */}
      <Grid container spacing={2}>
        {wishlistItems.map((item) => (
          <Grid item xs={6} key={item.id}>
            <Card sx={{ 
              borderRadius: 2,
              position: 'relative',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
            }}>
              {/* Remove Button */}
              <IconButton
                sx={{ position: 'absolute', top: 4, right: 4, bgcolor: 'white', zIndex: 1 }}
                size="small"
                onClick={() => removeFromWishlist(item.id)}
              >
                <Delete sx={{ color: '#f44336', fontSize: 20 }} />
              </IconButton>

              <CardMedia
                component="img"
                height="120"
                image={item.image || 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'}
                alt={item.name}
                sx={{ objectFit: 'cover', cursor: 'pointer' }}
                onClick={() => navigate(`/products/${item.id}`)}
              />

              <CardContent sx={{ p: 1.5, flexGrow: 1 }}>
                <Typography variant="caption" color="text.secondary">
                  {item.brand}
                </Typography>
                <Typography 
                  variant="body2" 
                  sx={{ fontWeight: 600, mb: 0.5, cursor: 'pointer' }}
                  onClick={() => navigate(`/products/${item.id}`)}
                  noWrap
                >
                  {item.name}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                  <Rating value={item.rating || 4.5} size="small" readOnly />
                  <Typography variant="caption" sx={{ ml: 0.5 }}>
                    ({item.reviews || 0})
                  </Typography>
                </Box>
                <Typography variant="body2" color="primary.main" fontWeight="bold">
                  {formatINR(item.price)}
                </Typography>
                {item.discount > 0 && (
                  <Typography variant="caption" color="success.main">
                    {item.discount}% off
                  </Typography>
                )}
              </CardContent>

              <Button
                fullWidth
                variant="contained"
                size="small"
                startIcon={<ShoppingCart />}
                onClick={() => handleAddToCart(item)}
                sx={{ 
                  borderRadius: 0,
                  borderBottomLeftRadius: 8,
                  borderBottomRightRadius: 8,
                  bgcolor: '#fb641b',
                  py: 1,
                }}
              >
                Move to Cart
              </Button>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Total Value */}
      <Paper sx={{ mt: 3, p: 2, borderRadius: 2, bgcolor: '#f5f5f5' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="body1">Total Value</Typography>
          <Typography variant="h6" color="primary.main" fontWeight="bold">
            {formatINR(wishlistItems.reduce((sum, item) => sum + item.price, 0))}
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default Wishlist;