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

  const mostViewedProducts = [
    { id: 1, name: 'Nike Air Zoom', brand: 'Nike', price: 5999, rating: 4.5, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', views: 2345 },
    { id: 2, name: 'SG Cricket Bat', brand: 'SG', price: 4499, rating: 4.7, image: 'https://images.unsplash.com/photo-1624526267942-ab0ff8a3e972?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', views: 1890 },
    { id: 3, name: 'Yonex Badminton', brand: 'Yonex', price: 3299, rating: 4.6, image: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', views: 1567 },
    { id: 4, name: 'Adidas Football', brand: 'Adidas', price: 2799, rating: 4.4, image: 'https://images.unsplash.com/photo-1614632537190-5a2d9b63c2c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', views: 1432 },
  ];

  const sportsCategories = [
    { name: 'Cricket', icon: '🏏', color: '#4CAF50', path: '/sport/cricket' },
    { name: 'Football', icon: '⚽', color: '#2196F3', path: '/sport/football' },
    { name: 'Badminton', icon: '🏸', color: '#FF9800', path: '/sport/badminton' },
    { name: 'Basketball', icon: '🏀', color: '#F44336', path: '/sport/basketball' },
    { name: 'Gym', icon: '🏋️', color: '#9C27B0', path: '/sport/gym' },
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
        {mostViewedProducts.map((product) => (
          <Grid item xs={6} key={product.id}>
            <Card 
              component={Link}
              to={`/products/${product.id}`}
              sx={{ 
                textDecoration: 'none',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                borderRadius: 2,
              }}
            >
              <CardMedia
                component="img"
                height="140"
                image={product.image}
                alt={product.name}
                sx={{ objectFit: 'cover' }}
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
                <Typography variant="body2" color="primary.main" fontWeight="bold">
                  {formatINR(product.price)}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
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