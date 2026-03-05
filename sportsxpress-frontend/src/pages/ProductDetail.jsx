import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Button,
  Box,
  Rating,
  Chip,
  Divider,
  Breadcrumbs,
  IconButton,
  TextField,
  Alert,
  CircularProgress,
} from '@mui/material';
import {
  ShoppingCart,
  LocalShipping,
  Security,
  Remove,
  Add,
  ArrowBack,
} from '@mui/icons-material';
import { useCart } from '../context/CartContext';
import { formatINR } from '../utils/currencyFormatter';
import toast from 'react-hot-toast';
import '../App.css';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState('');

  const BASE_URL = 'https://solid-fishstick-7v74445764vj3pjgx-5000.app.github.dev';

  useEffect(() => {
    if (id) {
      fetchProduct();
    }
  }, [id]);

  const fetchProduct = async () => {
    setLoading(true);
    setError('');
    
    try {
      console.log('🔍 Looking for product with ID:', id);
      
      const response = await fetch(`${BASE_URL}/api/products`);
      const data = await response.json();
      
      if (data.success && data.products) {
        // Find the product by _id
        const foundProduct = data.products.find(p => p._id === id);
        
        if (foundProduct) {
          console.log('✅ Found product:', foundProduct.name);
          setProduct(foundProduct);
        } else {
          console.log('❌ Product not found with ID:', id);
          setError('Product not found');
        }
      } else {
        setError('Failed to load products');
      }
    } catch (error) {
      console.error('❌ Error:', error);
      setError('Failed to load product');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    if (!product) return;
    addToCart({ ...product, quantity });
    toast.success(`${product.name} added to cart!`);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error || !product) {
    return (
      <Container sx={{ py: 8, textAlign: 'center' }}>
        <Typography variant="h5" gutterBottom color="error">
          {error || 'Product not found'}
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          Product ID: {id}
        </Typography>
        <Button
          variant="contained"
          component={Link}
          to="/products"
          startIcon={<ArrowBack />}
          sx={{ mt: 2, bgcolor: '#fb641b' }}
        >
          Browse Products
        </Button>
      </Container>
    );
  }

  // Calculate discount (random for now - you can replace with actual data)
  const discount = Math.floor(Math.random() * 40) + 20;
  const originalPrice = Math.round(product.price * (1 + discount/100));

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Breadcrumbs sx={{ mb: 3 }}>
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>Home</Link>
        <Link to="/products" style={{ textDecoration: 'none', color: 'inherit' }}>Products</Link>
        <Typography color="text.primary">{product.name}</Typography>
      </Breadcrumbs>

      <Grid container spacing={4}>
        {/* Product Image */}
        <Grid item xs={12} md={6}>
          <Paper 
            elevation={3} 
            sx={{ 
              p: 3, 
              bgcolor: '#ffffff', 
              borderRadius: 3,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              minHeight: 400
            }}
          >
            <Box
              className={`product-image-${product.category || 'default'} product-image-container`}
              sx={{
                width: '100%',
                height: 350,
                backgroundSize: 'contain',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundColor: '#ffffff',
                borderRadius: 2,
              }}
            />
          </Paper>
        </Grid>

        {/* Product Details */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 4, borderRadius: 3 }}>
            {/* Hot Deal Badge */}
            {discount > 30 && (
              <Chip 
                label="Hot Deal" 
                size="small" 
                sx={{ bgcolor: '#ff6b6b', color: 'white', fontWeight: 'bold', mb: 1 }} 
              />
            )}

            {/* Brand */}
            <Typography variant="subtitle1" color="text.secondary" gutterBottom>
              {product.brand}
            </Typography>

            {/* Product Name */}
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              {product.name}
            </Typography>

            {/* Price Section */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
              <Typography variant="body2" sx={{ color: '#00a650', fontWeight: 'bold' }}>
                {discount}% off
              </Typography>
              <Typography variant="body2" sx={{ textDecoration: 'line-through', color: '#999' }}>
                {formatINR(originalPrice)}
              </Typography>
              <Typography variant="h4" color="primary.main" fontWeight="bold">
                {formatINR(product.price)}
              </Typography>
            </Box>

            {/* Special Offer */}
            <Typography variant="caption" sx={{ color: '#00a650', display: 'block', fontWeight: 500, mb: 1 }}>
              WOW! {formatINR(Math.floor(product.price * 0.4))} with 3 offers
            </Typography>

            {/* Rating */}
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Rating value={product.rating || 4.5} readOnly precision={0.5} />
              <Typography variant="body2" sx={{ ml: 1 }}>
                ({product.reviews || 245} reviews)
              </Typography>
              <Chip
                label="Assured"
                size="small"
                sx={{ ml: 2, bgcolor: '#ffc107', color: '#000', fontWeight: 'bold' }}
              />
            </Box>

            {/* Delivery Info */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
              <LocalShipping sx={{ color: '#00a650', fontSize: 20 }} />
              <Typography variant="body2" sx={{ color: '#00a650', fontWeight: 500 }}>
                Express
              </Typography>
              <Typography variant="body2" color="text.secondary">
                • Delivery by {new Date(Date.now() + 4*24*60*60*1000).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
              </Typography>
            </Box>

            {/* Quantity */}
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <Typography variant="subtitle1" fontWeight="bold" sx={{ mr: 2 }}>
                Quantity:
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <IconButton
                  size="small"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  sx={{ border: '1px solid #ddd' }}
                >
                  <Remove />
                </IconButton>
                <TextField
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  size="small"
                  sx={{ width: 60, mx: 1 }}
                  inputProps={{ style: { textAlign: 'center' } }}
                />
                <IconButton
                  size="small"
                  onClick={() => setQuantity(quantity + 1)}
                  sx={{ border: '1px solid #ddd' }}
                >
                  <Add />
                </IconButton>
              </Box>
            </Box>

            {/* Add to Cart Button */}
            <Button
              fullWidth
              variant="contained"
              size="large"
              startIcon={<ShoppingCart />}
              onClick={handleAddToCart}
              sx={{ 
                bgcolor: '#fb641b',
                '&:hover': { bgcolor: '#f4511e' },
                py: 1.5,
                mb: 3
              }}
            >
              Add to Cart
            </Button>

            {/* Delivery Info Footer */}
            <Divider sx={{ my: 2 }} />
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <LocalShipping sx={{ mr: 1, color: '#4caf50' }} />
                <Typography variant="body2">Free Delivery</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Security sx={{ mr: 1, color: '#4caf50' }} />
                <Typography variant="body2">Secure Payment</Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProductDetail;