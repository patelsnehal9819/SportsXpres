import React from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  IconButton,
  Rating,
} from '@mui/material';
import {
  Delete,
  ShoppingCart,
  ArrowBack,
  Favorite,
} from '@mui/icons-material';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { formatINR } from '../utils/currencyFormatter';
import toast from 'react-hot-toast';
import '../App.css';

const Wishlist = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { wishlistItems, removeFromWishlist } = useWishlist();

  const handleAddToCart = (item) => {
    addToCart({
      _id: item.productId,
      name: item.name,
      price: item.price,
      brand: item.brand,
      image: item.image
    });
    removeFromWishlist(item.productId);
    toast.success(`${item.name} moved to cart!`);
  };

  if (wishlistItems.length === 0) {
    return (
      <Container sx={{ py: 8, textAlign: 'center' }}>
        <Favorite sx={{ fontSize: 80, color: '#ccc', mb: 3 }} />
        <Typography variant="h5" gutterBottom>
          Your wishlist is empty
        </Typography>
        <Button
          variant="contained"
          component={Link}
          to="/products"
          startIcon={<ArrowBack />}
          sx={{ bgcolor: '#fb641b' }}
        >
          Browse Products
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        My Wishlist ({wishlistItems.length})
      </Typography>

      <Grid container spacing={3}>
        {wishlistItems.map((item) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={item.productId}>
            <Card sx={{ height: '100%', position: 'relative' }}>
              <IconButton
                sx={{ position: 'absolute', top: 8, right: 8, bgcolor: 'white' }}
                onClick={() => removeFromWishlist(item.productId)}
              >
                <Delete color="error" />
              </IconButton>

              <Box
                className={`product-image-${item.category || 'default'} product-image-container`}
                sx={{
                  height: 180,
                  width: '100%',
                  backgroundSize: 'contain',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                  cursor: 'pointer'
                }}
                onClick={() => navigate(`/products/${item.productId}`)}
              />

              <CardContent>
                <Typography variant="caption" color="text.secondary">
                  {item.brand}
                </Typography>
                <Typography variant="h6" sx={{ fontSize: '16px', fontWeight: 600 }}>
                  {item.name}
                </Typography>
                <Rating value={4.5} size="small" readOnly />
                <Typography variant="h6" color="primary.main" fontWeight="bold">
                  {formatINR(item.price)}
                </Typography>
              </CardContent>

              <Box sx={{ p: 2, pt: 0 }}>
                <Button
                  fullWidth
                  variant="contained"
                  startIcon={<ShoppingCart />}
                  onClick={() => handleAddToCart(item)}
                  sx={{ bgcolor: '#fb641b' }}
                >
                  Move to Cart
                </Button>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Wishlist;