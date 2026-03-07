import React from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Rating,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { formatINR } from '../utils/currencyFormatter';

const Home = () => {
  const { user, getWelcomeMessage } = useAuth();

  // Most Viewed Products with CORRECT IDs from database
  const mostViewedProducts = [
    { 
      _id: '69abed25fc69d3e5e7e140ef', // SG Abdomen Guard
      name: 'SG Abdomen Guard', 
      brand: 'SG', 
      price: 699, 
      originalPrice: 867,
      rating: 4.5, 
      image: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=500', 
      views: 2345 
    },
    { 
      _id: '69abed25fc69d3e5e7e140f1', // Masuri Cricket Helmet
      name: 'Masuri Cricket Helmet', 
      brand: 'Masuri', 
      price: 3999, 
      originalPrice: 5079,
      rating: 4.9, 
      image: 'https://images.pexels.com/photos/30401163/pexels-photo-30401163.jpeg', 
      views: 1890 
    },
    { 
      _id: '69abed25fc69d3e5e7e140f3', // Select Brillant Ball
      name: 'Select Brillant Ball', 
      brand: 'Select', 
      price: 2499, 
      originalPrice: 3499,
      rating: 4.8, 
      image: 'https://images.unsplash.com/photo-1575361204480-aadea25e6e68?w=500', 
      views: 1567 
    },
    { 
      _id: '69abed25fc69d3e5e7e140f5', // Adidas Backpack
      name: 'Adidas Backpack', 
      brand: 'Adidas', 
      price: 2999, 
      originalPrice: 3999,
      rating: 4.7, 
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500', 
      views: 1432 
    },
    { 
      _id: '69abed25fc69d3e5e7e140f7', // Li-Ning Shuttlecocks
      name: 'Li-Ning Shuttlecocks', 
      brand: 'Li-Ning', 
      price: 399, 
      originalPrice: 599,
      rating: 4.6, 
      image: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=500', 
      views: 1234 
    },
    { 
      _id: '69abed25fc69d3e5e7e140f9', // Nike Elite Basketball
      name: 'Nike Elite Basketball', 
      brand: 'Nike', 
      price: 3499, 
      originalPrice: 4499,
      rating: 4.8, 
      image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=500', 
      views: 1123 
    }
  ];

  const sportsCategories = [
    { name: 'Cricket', icon: '🏏', color: '#4CAF50', path: '/sport/cricket' },
    { name: 'Football', icon: '⚽', color: '#2196F3', path: '/sport/football' },
    { name: 'Badminton', icon: '🏸', color: '#FF9800', path: '/sport/badminton' },
    { name: 'Basketball', icon: '🏀', color: '#F44336', path: '/sport/basketball' },
    { name: 'Gym', icon: '🏋️', color: '#9C27B0', path: '/sport/gym-fitness' },
    { name: 'Running', icon: '🏃', color: '#00BCD4', path: '/sport/running' },
  ];

  return (
    <Box sx={{ p: 2 }}>
      {/* Welcome Message */}
      <Box sx={{ 
        bgcolor: '#1976d2', 
        color: 'white', 
        p: 2, 
        borderRadius: 2,
        mb: 2,
      }}>
        <Typography variant="h6" fontWeight="bold">
          {getWelcomeMessage()}
        </Typography>
        {user && (
          <Typography variant="body2" sx={{ opacity: 0.9 }}>
            Ready to find your next sports gear?
          </Typography>
        )}
      </Box>

      {/* Hero Banner */}
      <Box sx={{ 
        bgcolor: '#1976d2', 
        color: 'white', 
        p: 3, 
        borderRadius: 3,
        mb: 3,
        background: 'linear-gradient(135deg, #1976d2 0%, #2196f3 100%)'
      }}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          SportsXpress
        </Typography>
        <Typography variant="body1" gutterBottom>
          Smart Sports Shopping Made Simple
        </Typography>
        <Typography variant="body2" sx={{ opacity: 0.9, mb: 2 }}>
          Find the perfect equipment with AI-powered recommendations
        </Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button 
            variant="contained" 
            component={Link} 
            to="/ai-size"
            sx={{ 
              bgcolor: '#fb641b', 
              '&:hover': { bgcolor: '#f4511e' },
              borderRadius: 2,
              flex: 1,
              py: 1,
            }}
          >
            Try AI Size
          </Button>
          <Button 
            variant="outlined" 
            component={Link} 
            to="/products" 
            sx={{ 
              color: 'white', 
              borderColor: 'white',
              borderRadius: 2,
              flex: 1,
              py: 1,
            }}
          >
            Shop Now
          </Button>
        </Box>
      </Box>

      {/* Sports Categories */}
      <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
        Shop by Sport
      </Typography>
      <Grid container spacing={1.5} sx={{ mb: 4 }}>
        {sportsCategories.map((sport) => (
          <Grid item xs={4} key={sport.name}>
            <Card 
              component={Link} 
              to={sport.path}
              sx={{ 
                textDecoration: 'none', 
                textAlign: 'center', 
                py: 1.5,
                borderRadius: 2,
                '&:hover': { transform: 'translateY(-2px)' },
              }}
            >
              <Typography sx={{ fontSize: 32 }}>{sport.icon}</Typography>
              <Typography variant="body2" fontWeight="500">{sport.name}</Typography>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Most Viewed Products */}
      <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
        🔥 Most Viewed
      </Typography>
      <Grid container spacing={2} sx={{ mb: 4 }}>
        {mostViewedProducts.map((product) => {
          // Calculate discount percentage
          const discount = product.originalPrice > product.price 
            ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) 
            : 0;

          return (
            <Grid item xs={6} key={product._id}>
              <Card 
                component={Link}
                to={`/products/${product._id}`}
                sx={{ 
                  textDecoration: 'none',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: 2,
                  cursor: 'pointer',
                  transition: 'transform 0.2s',
                  position: 'relative',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 3
                  }
                }}
              >
                {/* Discount Badge */}
                {discount > 0 && (
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 8,
                      left: 8,
                      bgcolor: '#ff4444',
                      color: 'white',
                      px: 1,
                      py: 0.5,
                      borderRadius: 1,
                      fontSize: '12px',
                      fontWeight: 'bold',
                      zIndex: 1
                    }}
                  >
                    {discount}% OFF
                  </Box>
                )}

                <CardMedia
                  component="img"
                  height="140"
                  image={product.image}
                  alt={product.name}
                  sx={{ 
                    objectFit: 'cover',
                    backgroundColor: '#f5f5f5'
                  }}
                />
                <CardContent sx={{ p: 1.5 }}>
                  <Typography variant="caption" color="text.secondary">
                    {product.brand}
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.5 }} noWrap>
                    {product.name}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                    <Rating value={product.rating} size="small" readOnly />
                    <Typography variant="caption" sx={{ ml: 0.5 }}>
                      {product.rating}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, flexWrap: 'wrap' }}>
                    <Typography variant="caption" sx={{ textDecoration: 'line-through', color: '#999' }}>
                      {formatINR(product.originalPrice)}
                    </Typography>
                    <Typography variant="body2" color="primary.main" fontWeight="bold">
                      {formatINR(product.price)}
                    </Typography>
                  </Box>
                  <Typography variant="caption" color="success.main" sx={{ display: 'block', mt: 0.5 }}>
                    👁️ {product.views.toLocaleString()} views
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      {/* Starter Kit Banner */}
      <Box sx={{ 
        borderRadius: 3,
        p: 3,
        mb: 2,
        background: 'linear-gradient(135deg, #fb641b 30%, #ff8a4f 90%)',
        color: 'white'
      }}>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          🎯 Build Your Perfect Starter Kit
        </Typography>
        <Typography variant="body2" paragraph>
          Get AI-recommended complete sports kit based on your skill level
        </Typography>
        <Button 
          variant="contained" 
          component={Link} 
          to="/starter-kit"
          sx={{ 
            bgcolor: 'white', 
            color: '#fb641b',
            '&:hover': { bgcolor: '#f5f5f5' },
            borderRadius: 2,
            width: '100%',
            py: 1,
          }}
        >
          Build Your Kit
        </Button>
      </Box>
    </Box>
  );
};

export default Home;