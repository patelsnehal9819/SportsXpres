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
} from '@mui/icons-material';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';

const MedicalKits = () => {
  const { addToCart } = useCart();
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [selectedBrand, setSelectedBrand] = useState('');

  const brands = ['Johnson & Johnson', '3M', 'MediSafe', 'FirstCare', 'SportMed'];

  const kits = [
    {
      id: 1,
      name: 'Complete Sports First Aid Kit',
      brand: 'Johnson & Johnson',
      price: 1299,
      originalPrice: 1799,
      discount: 28,
      rating: 4.7,
      items: 42,
      image: 'https://via.placeholder.com/300x200/F44336/FFFFFF?text=Complete+First+Aid',
    },
    {
      id: 2,
      name: 'Professional Sports Medical Kit',
      brand: '3M',
      price: 2499,
      originalPrice: 3299,
      discount: 24,
      rating: 4.8,
      items: 65,
      image: 'https://via.placeholder.com/300x200/2196F3/FFFFFF?text=Professional+Kit',
    },
    {
      id: 3,
      name: 'Cricket Team Medical Kit',
      brand: 'SportMed',
      price: 1899,
      originalPrice: 2599,
      discount: 27,
      rating: 4.6,
      items: 35,
      image: 'https://via.placeholder.com/300x200/4CAF50/FFFFFF?text=Cricket+Medical+Kit',
    },
    {
      id: 4,
      name: 'Football Match Day Kit',
      brand: 'MediSafe',
      price: 999,
      originalPrice: 1499,
      discount: 33,
      rating: 4.5,
      items: 28,
      image: 'https://via.placeholder.com/300x200/FF9800/FFFFFF?text=Football+Medical+Kit',
    },
    {
      id: 5,
      name: 'Gym & Fitness First Aid',
      brand: 'FirstCare',
      price: 799,
      originalPrice: 1299,
      discount: 38,
      rating: 4.4,
      items: 22,
      image: 'https://via.placeholder.com/300x200/9C27B0/FFFFFF?text=Gym+First+Aid',
    },
    {
      id: 6,
      name: 'Ultimate Sports Medicine Kit',
      brand: 'Johnson & Johnson',
      price: 3499,
      originalPrice: 4499,
      discount: 22,
      rating: 4.9,
      items: 85,
      image: 'https://via.placeholder.com/300x200/00BCD4/FFFFFF?text=Ultimate+Medical+Kit',
    },
  ];

  const formatINR = (price) => {
    return '₹' + price.toLocaleString('en-IN');
  };

  const handleAddToCart = (kit) => {
    addToCart(kit);
    toast.success(`${kit.name} added to cart!`);
  };

  const filteredKits = kits.filter((kit) => {
    const matchesPrice = kit.price >= priceRange[0] && kit.price <= priceRange[1];
    const matchesBrand = !selectedBrand || kit.brand === selectedBrand;
    return matchesPrice && matchesBrand;
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
            <FormControl fullWidth size="small">
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

            <Button
              fullWidth
              variant="outlined"
              onClick={() => {
                setPriceRange([0, 5000]);
                setSelectedBrand('');
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
              Medical Kits
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {filteredKits.length} Products
            </Typography>
          </Box>

          <Grid container spacing={2}>
            {filteredKits.map((kit) => (
              <Grid item xs={12} sm={6} md={4} key={kit.id}>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', borderRadius: 2 }}>
                  <CardMedia
                    component="img"
                    height="200"
                    image={kit.image}
                    alt={kit.name}
                    sx={{ objectFit: 'cover' }}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                      {kit.brand}
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 600, fontSize: '16px', mb: 1 }}>
                      {kit.name}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <Rating value={kit.rating} precision={0.5} readOnly size="small" />
                      <Typography variant="body2" sx={{ ml: 1 }}>
                        {kit.rating}
                      </Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      {kit.items} Items
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <Typography variant="h6" color="primary.main" fontWeight="bold">
                        {formatINR(kit.price)}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ ml: 1, textDecoration: 'line-through' }}>
                        {formatINR(kit.originalPrice)}
                      </Typography>
                      <Chip 
                        label={`${kit.discount}% off`} 
                        size="small" 
                        color="success" 
                        sx={{ ml: 1, height: 20, fontSize: '11px' }}
                      />
                    </Box>
                  </CardContent>
                  <CardActions sx={{ p: 2, pt: 0 }}>
                    <Button
                      fullWidth
                      variant="contained"
                      startIcon={<ShoppingCart />}
                      onClick={() => handleAddToCart(kit)}
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

export default MedicalKits;