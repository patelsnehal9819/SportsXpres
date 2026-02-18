import React from 'react';
import {
  Box,
  Paper,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
} from '@mui/material';
import {
  SportsCricket,
  SportsSoccer,
  SportsTennis,
  FitnessCenter,
  SportsBasketball,
  DirectionsRun,
  ArrowForward,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const SportsPage = () => {
  const navigate = useNavigate();

  const sports = [
    { 
      id: 'cricket', 
      name: 'Cricket', 
      icon: <SportsCricket />, 
      color: '#4CAF50',
      image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      description: 'Bats, balls, pads, gloves & more'
    },
    { 
      id: 'football', 
      name: 'Football', 
      icon: <SportsSoccer />, 
      color: '#2196F3',
      image: 'https://images.unsplash.com/photo-1575361204480-a5d5b7f1f7d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      description: 'Boots, jerseys, balls, accessories'
    },
    { 
      id: 'badminton', 
      name: 'Badminton', 
      icon: <SportsTennis />, 
      color: '#FF9800',
      image: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      description: 'Rackets, shuttlecocks, nets, shoes'
    },
    { 
      id: 'basketball', 
      name: 'Basketball', 
      icon: <SportsBasketball />, 
      color: '#F44336',
      image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      description: 'Balls, shoes, jerseys, hoops'
    },
    { 
      id: 'gym', 
      name: 'Gym & Fitness', 
      icon: <FitnessCenter />, 
      color: '#9C27B0',
      image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      description: 'Dumbbells, benches, accessories'
    },
    { 
      id: 'running', 
      name: 'Running', 
      icon: <DirectionsRun />, 
      color: '#00BCD4',
      image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      description: 'Shoes, shorts, shirts, gear'
    },
  ];

  return (
    <Box sx={{ p: 2 }}>
      {/* Header */}
      <Paper sx={{ p: 2, borderRadius: 2, mb: 2, bgcolor: '#1976d2', color: 'white' }}>
        <Typography variant="h6" fontWeight="bold">All Sports</Typography>
        <Typography variant="body2">Choose your sport to explore equipment</Typography>
      </Paper>

      {/* Sports Grid */}
      <Grid container spacing={2}>
        {sports.map((sport) => (
          <Grid item xs={12} key={sport.id}>
            <Card 
              sx={{ 
                display: 'flex',
                borderRadius: 2,
                cursor: 'pointer',
                '&:hover': { transform: 'scale(1.02)', transition: '0.2s' }
              }}
              onClick={() => navigate(`/sport/${sport.id}`)}
            >
              <CardMedia
                component="img"
                sx={{ width: 120, height: 120, objectFit: 'cover' }}
                image={sport.image}
                alt={sport.name}
              />
              <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1, p: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Box sx={{ color: sport.color, mr: 1 }}>{sport.icon}</Box>
                  <Typography variant="subtitle1" fontWeight="bold">
                    {sport.name}
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {sport.description}
                </Typography>
                <Button 
                  size="small" 
                  endIcon={<ArrowForward />}
                  sx={{ alignSelf: 'flex-start', color: sport.color }}
                >
                  Shop Now
                </Button>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default SportsPage;