import React, { useState, useEffect } from 'react';
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
  CircularProgress,
  Breadcrumbs,
  Link,
} from '@mui/material';
import {
  ShoppingCart,
  LocalShipping,
  Home,
} from '@mui/icons-material';
import { useParams, useNavigate, Link as RouterLink } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';
import '../App.css';

// Format price in Indian Rupees
const formatPrice = (price) => {
  return `₹${price?.toLocaleString('en-IN') || 0}`;
};

const sportNames = {
  'cricket': 'Cricket',
  'football': 'Football',
  'basketball': 'Basketball',
  'badminton': 'Badminton',
  'gym-fitness': 'Gym & Fitness',
  'running': 'Running'
};

// Simple keyword matching for sports
const sportKeywords = {
  'cricket': ['cricket', 'bat', 'helmet', 'guard', 'pad', 'stump', 'kookaburra', 'gray-nicolls', 'masuri', 'sg'],
  'football': ['football', 'soccer', 'predator', 'mercurial', 'future', 'orbita', 'al rihla', 'germany', 'argentina', 'brazil', 'england', 'spain', 'france'],
  'basketball': ['basketball', 'hoop', 'lebron', 'kyrie', 'lakers', 'bulls', 'nets', 'warriors', 'celtics', 'spalding', 'wilson'],
  'badminton': ['badminton', 'yonex', 'shuttle', 'racket', 'li-ning', 'victor', 'aerosensa', 'astrox', 'voltric'],
  'gym-fitness': ['gym', 'dumbbell', 'kettlebell', 'bench', 'weight', 'mat', 'cockatoo', 'kore', 'bodymax', 'resistance'],
  'running': ['run', 'shoe', 'sock', 'belt', 'hydration', 'protein', 'pegasus', 'ultraboost', 'asics', 'new balance']
};

const SportCategory = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const BASE_URL = 'https://solid-fishstick-7v74445764vj3pjgx-5000.app.github.dev';

  useEffect(() => {
    fetchProducts();
  }, [category]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      console.log(`🔍 Fetching all products...`);
      
      const response = await fetch(`${BASE_URL}/api/products?limit=1000`);
      const data = await response.json();
      
      if (data.success && data.data) {
        console.log(`✅ Found ${data.data.length} total products`);
        
        // Filter products by checking if they match the sport category
        const keywords = sportKeywords[category] || [];
        const filtered = data.data.filter(product => {
          const name = (product.name || '').toLowerCase();
          const brand = (product.brand || '').toLowerCase();
          
          // Check if product name or brand contains any keyword for this sport
          return keywords.some(keyword => 
            name.includes(keyword.toLowerCase()) || 
            brand.includes(keyword.toLowerCase())
          );
        });
        
        console.log(`✅ Found ${filtered.length} products for ${category}`);
        setProducts(filtered);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (product, e) => {
    e.stopPropagation();
    addToCart(product);
    toast.success(`${product.name} added to cart!`);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4, bgcolor: '#f1f3f6', minHeight: '100vh' }}>
      {/* Breadcrumb */}
      <Breadcrumbs sx={{ mb: 3 }}>
        <Link component={RouterLink} to="/" underline="hover" color="inherit">
          <Home sx={{ mr: 0.5, fontSize: 18 }} />
          Home
        </Link>
        <Link component={RouterLink} to="/sports-page" underline="hover" color="inherit">
          Sports
        </Link>
        <Typography color="text.primary">{sportNames[category] || category}</Typography>
      </Breadcrumbs>

      {/* Header */}
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4">{sportNames[category] || category} Equipment</Typography>
        <Chip label={`${products.length} items`} color="primary" />
      </Box>

      {/* Products Grid */}
      {products.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h6" gutterBottom>
            No {sportNames[category] || category} products found
          </Typography>
          <Button 
            variant="contained" 
            onClick={() => navigate('/products')}
            sx={{ mt: 2, bgcolor: '#fb641b' }}
          >
            View All Products
          </Button>
        </Box>
      ) : (
        <Grid container spacing={2}>
          {products.map((product) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={product._id}>
              <Card 
                sx={{ 
                  height: '100%', 
                  cursor: 'pointer',
                  '&:hover': { boxShadow: 6 }
                }}
                onClick={() => navigate(`/products/${product._id}`)}
              >
                <Box
                  className="product-image-container"
                  sx={{
                    height: 160,
                    backgroundImage: `url(${product.imageUrl})`,
                    backgroundSize: 'contain',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    bgcolor: '#fff',
                    p: 2
                  }}
                />
                <CardContent>
                  <Typography variant="caption" color="text.secondary">{product.brand}</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>{product.name}</Typography>
                  <Typography variant="h6" sx={{ color: '#2ecc71', fontWeight: 'bold', my: 1 }}>
                    {formatPrice(product.discountedPrice || product.price)}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 1 }}>
                    <LocalShipping sx={{ fontSize: 14, color: '#00a650' }} />
                    <Typography variant="caption" sx={{ color: '#00a650' }}>Free Shipping</Typography>
                  </Box>
                  <Button
                    fullWidth
                    variant="contained"
                    size="small"
                    startIcon={<ShoppingCart />}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddToCart(product, e);
                    }}
                    sx={{ bgcolor: '#fb641b' }}
                  >
                    Add to Cart
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default SportCategory;