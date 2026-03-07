import React from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  CardMedia,
  Chip,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const sports = [
  {
    id: 'cricket',
    name: 'Cricket',
    image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=500',
    description: 'Bats, balls, helmets, pads, and all cricket equipment',
    productCount: '45+ products'
  },
  {
    id: 'football',
    name: 'Football',
    image: 'https://images.unsplash.com/photo-1575361204480-aadea25e6e68?w=500',
    description: 'Boots, jerseys, balls, gloves, and training gear',
    productCount: '38+ products'
  },
  {
    id: 'basketball',
    name: 'Basketball',
    image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=500',
    description: 'Shoes, jerseys, balls, hoops, and accessories',
    productCount: '32+ products'
  },
  {
    id: 'badminton',
    name: 'Badminton',
    image: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=500',
    description: 'Rackets, shuttlecocks, nets, grips, and shoes',
    productCount: '28+ products'
  },
  {
    id: 'gym-fitness',
    name: 'Gym & Fitness',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=500',
    description: 'Dumbbells, kettlebells, benches, mats, and more',
    productCount: '52+ products'
  },
  {
    id: 'running',
    name: 'Running',
    image: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=500',
    description: 'Shoes, shorts, shirts, hydration packs, and gear',
    productCount: '30+ products'
  }
];

const SportsPage = () => {
  const navigate = useNavigate();

  const handleSportClick = (sportId) => {
    navigate(`/sport/${sportId}`);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom align="center" sx={{ mb: 4 }}>
        Sports Categories
      </Typography>
      <Typography variant="h6" align="center" color="text.secondary" sx={{ mb: 6 }}>
        Choose your sport and explore our wide range of equipment
      </Typography>

      <Grid container spacing={3}>
        {sports.map((sport) => (
          <Grid item xs={12} sm={6} md={4} lg={4} key={sport.id}>
            <Card 
              sx={{ 
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer',
                transition: 'transform 0.3s, box-shadow 0.3s',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: 10
                }
              }}
              onClick={() => handleSportClick(sport.id)}
            >
              <CardMedia
                component="img"
                height="180"
                image={sport.image}
                alt={sport.name}
                sx={{ objectFit: 'cover' }}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="h2">
                  {sport.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {sport.description}
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
                  <Chip 
                    label={sport.productCount} 
                    size="small" 
                    color="primary" 
                    variant="outlined"
                  />
                  <Button 
                    size="small" 
                    color="primary"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSportClick(sport.id);
                    }}
                  >
                    Shop Now
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default SportsPage;