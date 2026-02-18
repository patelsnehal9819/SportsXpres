import React, { useState } from 'react';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Button,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Slider,
  Chip,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Rating,
  Divider,
} from '@mui/material';
import {
  ShoppingCart,
  FilterList,
  Straighten,
} from '@mui/icons-material';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';

const SportsJersey = () => {
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState('');
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedSport, setSelectedSport] = useState('');

  const sizes = ['S', 'M', 'L', 'XL', 'XXL'];
  const brands = ['Nike', 'Adidas', 'Puma', 'SG', 'Vector X'];
  const sports = ['Cricket', 'Football', 'Basketball', 'Running'];

  const jerseys = [
    {
      id: 1,
      name: 'Indian Cricket Team Jersey',
      brand: 'Nike',
      sport: 'Cricket',
      price: 2499,
      originalPrice: 3299,
      discount: 24,
      rating: 4.8,
      image: 'https://via.placeholder.com/300x200/2196F3/FFFFFF?text=India+Cricket+Jersey',
      sizes: ['S', 'M', 'L', 'XL'],
    },
    {
      id: 2,
      name: 'Manchester United Jersey',
      brand: 'Adidas',
      sport: 'Football',
      price: 3299,
      originalPrice: 4499,
      discount: 27,
      rating: 4.7,
      image: 'https://via.placeholder.com/300x200/F44336/FFFFFF?text=Man+United+Jersey',
      sizes: ['M', 'L', 'XL', 'XXL'],
    },
    {
      id: 3,
      name: 'LA Lakers Jersey',
      brand: 'Nike',
      sport: 'Basketball',
      price: 2899,
      originalPrice: 3799,
      discount: 24,
      rating: 4.6,
      image: 'https://via.placeholder.com/300x200/FFC107/000000?text=Lakers+Jersey',
      sizes: ['S', 'M', 'L', 'XL'],
    },
    {
      id: 4,
      name: 'Team India T20 Jersey',
      brand: 'SG',
      sport: 'Cricket',
      price: 1999,
      originalPrice: 2799,
      discount: 29,
      rating: 4.5,
      image: 'https://via.placeholder.com/300x200/4CAF50/FFFFFF?text=India+T20+Jersey',
      sizes: ['S', 'M', 'L', 'XL'],
    },
  ];

  const formatINR = (price) => {
    return '₹' + price.toLocaleString('en-IN');
  };

  const handleAddToCart = (jersey) => {
    if (!selectedSize) {
      toast.error('Please select a size first');
      return;
    }
    addToCart({ ...jersey, size: selectedSize });
    toast.success(`${jersey.name} added to cart!`);
  };

  const filteredJerseys = jerseys.filter((jersey) => {
    const matchesPrice = jersey.price >= priceRange[0] && jersey.price <= priceRange[1];
    const matchesBrand = !selectedBrand || jersey.brand === selectedBrand;
    const matchesSport = !selectedSport || jersey.sport === selectedSport;
    const matchesSize = !selectedSize || jersey.sizes.includes(selectedSize);
    return matchesPrice && matchesBrand && matchesSport && matchesSize;
  });

  return (
    <Container maxWidth="xl" sx={{ py: 3, bgcolor: '#f1f3f6' }}>
      <Grid container spacing={3}>
        {/* Filters Sidebar */}
        <Grid item xs={12} md={3}>
          <Paper elevation={2} sx={{ p: 2, borderRadius: 2, position: 'sticky', top: 80 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <FilterList sx={{ mr: 1, color: 'primary.main' }} />
              <Typography variant="h6" fontWeight="bold">
                Filters
              </Typography>
            </Box>
            <Divider sx={{ mb: 2 }} />

            {/* Size Filter */}
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              <Straighten sx={{ mr: 1, fontSize: 18, verticalAlign: 'middle' }} />
              Size
            </Typography>
            <FormControl fullWidth size="small" sx={{ mb: 3 }}>
              <InputLabel>Select Size</InputLabel>
              <Select
                value={selectedSize}
                label="Select Size"
                onChange={(e) => setSelectedSize(e.target.value)}
              >
                <MenuItem value="">All Sizes</MenuItem>
                {sizes.map((size) => (
                  <MenuItem key={size} value={size}>
                    {size}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Price Range */}
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              Price Range (₹)
            </Typography>
            <Box sx={{ px: 1, mb: 3 }}>
              <Slider
                value={priceRange}
                onChange={(e, newValue) => setPriceRange(newValue)}
                valueLabelDisplay="auto"
                min={0}
                max={5000}
                step={100}
                valueLabelFormat={(value) => `₹${value}`}
              />
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                <Typography variant="body2">₹{priceRange[0]}</Typography>
                <Typography variant="body2">₹{priceRange[1]}</Typography>
              </Box>
            </Box>

            {/* Brand Filter */}
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              Brand
            </Typography>
            <FormControl fullWidth size="small" sx={{ mb: 3 }}>
              <InputLabel>Select Brand</InputLabel>
              <Select
                value={selectedBrand}
                label="Select Brand"
                onChange={(e) => setSelectedBrand(e.target.value)}
              >
                <MenuItem value="">All Brands</MenuItem>
                {brands.map((brand) => (
                  <MenuItem key={brand} value={brand}>
                    {brand}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Sport Filter */}
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              Sport
            </Typography>
            <FormControl fullWidth size="small">
              <InputLabel>Select Sport</InputLabel>
              <Select
                value={selectedSport}
                label="Select Sport"
                onChange={(e) => setSelectedSport(e.target.value)}
              >
                <MenuItem value="">All Sports</MenuItem>
                {sports.map((sport) => (
                  <MenuItem key={sport} value={sport}>
                    {sport}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Button
              fullWidth
              variant="outlined"
              onClick={() => {
                setSelectedSize('');
                setPriceRange([0, 5000]);
                setSelectedBrand('');
                setSelectedSport('');
              }}
              sx={{ mt: 3 }}
            >
              Clear All Filters
            </Button>
          </Paper>
        </Grid>

        {/* Products Grid */}
        <Grid item xs={12} md={9}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h5" fontWeight="bold">
              Sports Jerseys
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {filteredJerseys.length} Products
            </Typography>
          </Box>

          <Grid container spacing={2}>
            {filteredJerseys.map((jersey) => (
              <Grid item xs={12} sm={6} md={4} key={jersey.id}>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', borderRadius: 2 }}>
                  <CardMedia
                    component="img"
                    height="200"
                    image={jersey.image}
                    alt={jersey.name}
                    sx={{ objectFit: 'cover' }}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                      {jersey.brand} • {jersey.sport}
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 600, fontSize: '16px', mb: 1 }}>
                      {jersey.name}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <Rating value={jersey.rating} precision={0.5} readOnly size="small" />
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <Typography variant="h6" color="primary.main" fontWeight="bold">
                        {formatINR(jersey.price)}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ ml: 1, textDecoration: 'line-through' }}>
                        {formatINR(jersey.originalPrice)}
                      </Typography>
                      <Chip 
                        label={`${jersey.discount}% off`} 
                        size="small" 
                        color="success" 
                        sx={{ ml: 1, height: 20, fontSize: '11px' }}
                      />
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                      Sizes: {jersey.sizes.join(', ')}
                    </Typography>
                  </CardContent>
                  <CardActions sx={{ p: 2, pt: 0 }}>
                    <Button
                      fullWidth
                      variant="contained"
                      startIcon={<ShoppingCart />}
                      onClick={() => handleAddToCart(jersey)}
                      sx={{ borderRadius: 1 }}
                    >
                      Add to Cart
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default SportsJersey;