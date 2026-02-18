import React, { useState } from 'react';
// Remove TextField from imports in src/pages/SportsShoes.jsx
// Change to:
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

const SportsShoes = () => {
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState('');
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedSport, setSelectedSport] = useState('');

  const shoeSizes = ['UK 5', 'UK 6', 'UK 7', 'UK 8', 'UK 9', 'UK 10', 'UK 11', 'UK 12'];
  const brands = ['Nike', 'Adidas', 'Puma', 'Reebok', 'Yonex', 'SG', 'Cosco'];
  const sports = ['Cricket', 'Football', 'Running', 'Badminton', 'Basketball', 'Gym'];

  const shoes = [
    {
      id: 1,
      name: 'Nike Air Zoom',
      brand: 'Nike',
      sport: 'Running',
      price: 5999,
      originalPrice: 7999,
      discount: 25,
      rating: 4.5,
      reviews: 234,
      image: 'https://via.placeholder.com/300x200/2196F3/FFFFFF?text=Nike+Running+Shoes',
      sizes: ['UK 7', 'UK 8', 'UK 9', 'UK 10'],
    },
    {
      id: 2,
      name: 'Adidas Predator',
      brand: 'Adidas',
      sport: 'Football',
      price: 6499,
      originalPrice: 8999,
      discount: 28,
      rating: 4.7,
      reviews: 189,
      image: 'https://via.placeholder.com/300x200/4CAF50/FFFFFF?text=Adidas+Football+Shoes',
      sizes: ['UK 6', 'UK 7', 'UK 8', 'UK 9'],
    },
    {
      id: 3,
      name: 'Puma One 20',
      brand: 'Puma',
      sport: 'Running',
      price: 4499,
      originalPrice: 5999,
      discount: 25,
      rating: 4.3,
      reviews: 156,
      image: 'https://via.placeholder.com/300x200/FF9800/FFFFFF?text=Puma+Running+Shoes',
      sizes: ['UK 7', 'UK 8', 'UK 9', 'UK 10'],
    },
    {
      id: 4,
      name: 'Yonex Power Cushion',
      brand: 'Yonex',
      sport: 'Badminton',
      price: 5499,
      originalPrice: 6999,
      discount: 21,
      rating: 4.6,
      reviews: 145,
      image: 'https://via.placeholder.com/300x200/9C27B0/FFFFFF?text=Yonex+Badminton+Shoes',
      sizes: ['UK 6', 'UK 7', 'UK 8', 'UK 9'],
    },
    {
      id: 5,
      name: 'SG Cricket Shoes',
      brand: 'SG',
      sport: 'Cricket',
      price: 3999,
      originalPrice: 5499,
      discount: 27,
      rating: 4.2,
      reviews: 98,
      image: 'https://via.placeholder.com/300x200/F44336/FFFFFF?text=SG+Cricket+Shoes',
      sizes: ['UK 7', 'UK 8', 'UK 9', 'UK 10'],
    },
    {
      id: 6,
      name: 'Reebok Nano Gym',
      brand: 'Reebok',
      sport: 'Gym',
      price: 5299,
      originalPrice: 6999,
      discount: 24,
      rating: 4.5,
      reviews: 167,
      image: 'https://via.placeholder.com/300x200/00BCD4/FFFFFF?text=Reebok+Gym+Shoes',
      sizes: ['UK 7', 'UK 8', 'UK 9', 'UK 10'],
    },
  ];

  const formatINR = (price) => {
    return '₹' + price.toLocaleString('en-IN');
  };

  const handleAddToCart = (shoe) => {
    if (!selectedSize) {
      toast.error('Please select a size first');
      return;
    }
    addToCart({ ...shoe, size: selectedSize });
    toast.success(`${shoe.name} added to cart!`);
  };

  const filteredShoes = shoes.filter((shoe) => {
    const matchesPrice = shoe.price >= priceRange[0] && shoe.price <= priceRange[1];
    const matchesBrand = !selectedBrand || shoe.brand === selectedBrand;
    const matchesSport = !selectedSport || shoe.sport === selectedSport;
    const matchesSize = !selectedSize || shoe.sizes.includes(selectedSize);
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
              Size (UK)
            </Typography>
            <FormControl fullWidth size="small" sx={{ mb: 3 }}>
              <InputLabel>Select Size</InputLabel>
              <Select
                value={selectedSize}
                label="Select Size"
                onChange={(e) => setSelectedSize(e.target.value)}
              >
                <MenuItem value="">All Sizes</MenuItem>
                {shoeSizes.map((size) => (
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
                max={10000}
                step={500}
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
              Sport Type
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

            {/* Clear Filters */}
            <Button
              fullWidth
              variant="outlined"
              onClick={() => {
                setSelectedSize('');
                setPriceRange([0, 10000]);
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
              Sports Shoes
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {filteredShoes.length} Products
            </Typography>
          </Box>

          <Grid container spacing={2}>
            {filteredShoes.map((shoe) => (
              <Grid item xs={12} sm={6} md={4} key={shoe.id}>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', borderRadius: 2 }}>
                  <CardMedia
                    component="img"
                    height="200"
                    image={shoe.image}
                    alt={shoe.name}
                    sx={{ objectFit: 'cover' }}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                      {shoe.brand} • {shoe.sport}
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 600, fontSize: '16px', mb: 1 }}>
                      {shoe.name}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <Rating value={shoe.rating} precision={0.5} readOnly size="small" />
                      <Typography variant="body2" sx={{ ml: 1 }}>
                        ({shoe.reviews})
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <Typography variant="h6" color="primary.main" fontWeight="bold">
                        {formatINR(shoe.price)}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ ml: 1, textDecoration: 'line-through' }}>
                        {formatINR(shoe.originalPrice)}
                      </Typography>
                      <Chip 
                        label={`${shoe.discount}% off`} 
                        size="small" 
                        color="success" 
                        sx={{ ml: 1, height: 20, fontSize: '11px' }}
                      />
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                      Sizes: {shoe.sizes.join(', ')}
                    </Typography>
                  </CardContent>
                  <CardActions sx={{ p: 2, pt: 0 }}>
                    <Button
                      fullWidth
                      variant="contained"
                      startIcon={<ShoppingCart />}
                      onClick={() => handleAddToCart(shoe)}
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

export default SportsShoes;