import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Rating,
  Chip,
  TextField,
  InputAdornment,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Slider,
  Drawer,
  Divider,
  CircularProgress,
} from '@mui/material';
import {
  Search,
  FilterList,
  ShoppingCart,
  Favorite,
  FavoriteBorder,
  Clear,
  Sort,
  SportsCricket,
  SportsSoccer,
  SportsTennis,
  FitnessCenter,
  SportsBasketball,
  DirectionsRun,
} from '@mui/icons-material';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { formatINR } from '../utils/currencyFormatter';
import toast from 'react-hot-toast';

const SportCategory = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [selectedSize, setSelectedSize] = useState('');
  const [sortBy, setSortBy] = useState('popularity');

  const sportConfig = {
    cricket: { name: 'Cricket', icon: <SportsCricket />, color: '#4CAF50' },
    football: { name: 'Football', icon: <SportsSoccer />, color: '#2196F3' },
    badminton: { name: 'Badminton', icon: <SportsTennis />, color: '#FF9800' },
    basketball: { name: 'Basketball', icon: <SportsBasketball />, color: '#F44336' },
    gym: { name: 'Gym', icon: <FitnessCenter />, color: '#9C27B0' },
    running: { name: 'Running', icon: <DirectionsRun />, color: '#00BCD4' },
  };

  const currentSport = sportConfig[category] || {
    name: category?.charAt(0).toUpperCase() + category?.slice(1),
    icon: <SportsCricket />,
    color: '#1976d2',
  };

  useEffect(() => {
    const allProducts = JSON.parse(localStorage.getItem('sportsxpress_products') || '[]');
    const sportProducts = allProducts.filter(p => p.sport === category);
    setProducts(sportProducts);
    setFilteredProducts(sportProducts);
    setLoading(false);
  }, [category]);

  useEffect(() => {
    let result = [...products];

    if (selectedCategory) {
      result = result.filter(p => p.category === selectedCategory);
    }
    if (selectedBrand) {
      result = result.filter(p => p.brand === selectedBrand);
    }
    result = result.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);
    if (selectedSize) {
      result = result.filter(p => p.sizes?.includes(selectedSize));
    }

    result.sort((a, b) => {
      switch (sortBy) {
        case 'price-low': return a.price - b.price;
        case 'price-high': return b.price - a.price;
        case 'rating': return (b.rating || 0) - (a.rating || 0);
        default: return (b.views || 0) - (a.views || 0);
      }
    });

    setFilteredProducts(result);
  }, [products, selectedCategory, selectedBrand, priceRange, selectedSize, sortBy]);

  const brands = [...new Set(products.map(p => p.brand).filter(Boolean))];
  const sizes = [...new Set(products.flatMap(p => p.sizes || []))];

  const handleAddToCart = (product) => {
    addToCart(product);
    toast.success(`${product.name} added to cart!`);
  };

  const handleWishlist = (product) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
      toast.success('Removed from wishlist');
    } else {
      addToWishlist(product);
      toast.success('Added to wishlist');
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 2 }}>
      {/* Header */}
      <Box sx={{ 
        bgcolor: currentSport.color, 
        color: 'white',
        p: 2,
        borderRadius: 2,
        mb: 2,
        display: 'flex',
        alignItems: 'center',
        gap: 1
      }}>
        <Box sx={{ fontSize: 32 }}>{currentSport.icon}</Box>
        <Typography variant="h6" fontWeight="bold">{currentSport.name}</Typography>
      </Box>

      {/* Filter Bar */}
      <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
        <Button
          fullWidth
          variant="outlined"
          startIcon={<FilterList />}
          onClick={() => setFilterDrawerOpen(true)}
          sx={{ borderRadius: 2 }}
        >
          Filters
        </Button>
        <FormControl size="small" sx={{ minWidth: 120 }}>
          <Select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            displayEmpty
            sx={{ borderRadius: 2 }}
          >
            <MenuItem value="popularity">Popular</MenuItem>
            <MenuItem value="price-low">Price: Low</MenuItem>
            <MenuItem value="price-high">Price: High</MenuItem>
            <MenuItem value="rating">Rating</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Results Count */}
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        {filteredProducts.length} products found
      </Typography>

      {/* Filter Drawer */}
      <Drawer
        anchor="bottom"
        open={filterDrawerOpen}
        onClose={() => setFilterDrawerOpen(false)}
        sx={{
          '& .MuiDrawer-paper': {
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
            maxHeight: '80vh',
          },
        }}
      >
        <Box sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6" fontWeight="bold">Filters</Typography>
            <IconButton onClick={() => setFilterDrawerOpen(false)}>
              <Clear />
            </IconButton>
          </Box>

          <Divider sx={{ mb: 2 }} />

          {/* Category Filter */}
          <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
            Category
          </Typography>
          <FormControl fullWidth size="small" sx={{ mb: 2 }}>
            <Select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              displayEmpty
            >
              <MenuItem value="">All</MenuItem>
              {['Bat', 'Ball', 'Shoes', 'Jersey', 'Kit'].map((cat) => (
                <MenuItem key={cat} value={cat}>{cat}</MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Brand Filter */}
          {brands.length > 0 && (
            <>
              <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
                Brand
              </Typography>
              <FormControl fullWidth size="small" sx={{ mb: 2 }}>
                <Select
                  value={selectedBrand}
                  onChange={(e) => setSelectedBrand(e.target.value)}
                  displayEmpty
                >
                  <MenuItem value="">All</MenuItem>
                  {brands.map((brand) => (
                    <MenuItem key={brand} value={brand}>{brand}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </>
          )}

          {/* Price Range */}
          <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
            Price Range
          </Typography>
          <Box sx={{ px: 1, mb: 2 }}>
            <Slider
              value={priceRange}
              onChange={(e, newValue) => setPriceRange(newValue)}
              min={0}
              max={10000}
              step={500}
              valueLabelDisplay="auto"
              valueLabelFormat={(value) => formatINR(value)}
            />
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="caption">{formatINR(priceRange[0])}</Typography>
              <Typography variant="caption">{formatINR(priceRange[1])}</Typography>
            </Box>
          </Box>

          {/* Size Filter */}
          {sizes.length > 0 && (
            <>
              <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
                Size
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
                {sizes.map((size) => (
                  <Chip
                    key={size}
                    label={size}
                    size="small"
                    onClick={() => setSelectedSize(selectedSize === size ? '' : size)}
                    color={selectedSize === size ? 'primary' : 'default'}
                  />
                ))}
              </Box>
            </>
          )}

          <Button
            fullWidth
            variant="contained"
            onClick={() => setFilterDrawerOpen(false)}
            sx={{ bgcolor: '#fb641b', borderRadius: 2, py: 1.5 }}
          >
            Apply Filters
          </Button>
        </Box>
      </Drawer>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <Typography variant="h6">No products found</Typography>
        </Box>
      ) : (
        <Grid container spacing={2}>
          {filteredProducts.map((product) => (
            <Grid item xs={6} key={product.id}>
              <Card sx={{ borderRadius: 2, position: 'relative', height: '100%' }}>
                <IconButton
                  sx={{ position: 'absolute', top: 4, right: 4, bgcolor: 'white', zIndex: 1 }}
                  size="small"
                  onClick={() => handleWishlist(product)}
                >
                  {isInWishlist(product.id) ? (
                    <Favorite sx={{ color: '#fb641b', fontSize: 20 }} />
                  ) : (
                    <FavoriteBorder sx={{ fontSize: 20 }} />
                  )}
                </IconButton>

                <CardMedia
                  component="img"
                  height="120"
                  image={product.image || 'https://images.unsplash.com/photo-1542291026-7eec264c27ff'}
                  alt={product.name}
                  sx={{ objectFit: 'cover', cursor: 'pointer' }}
                  onClick={() => navigate(`/products/${product.id}`)}
                />

                <CardContent sx={{ p: 1.5 }}>
                  <Typography variant="caption" color="text.secondary">{product.brand}</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600, cursor: 'pointer' }} noWrap>
                    {product.name}
                  </Typography>
                  <Rating value={product.rating || 4.5} size="small" readOnly />
                  <Typography variant="body2" color="primary.main" fontWeight="bold">
                    {formatINR(product.price)}
                  </Typography>
                </CardContent>

                <Button
                  fullWidth
                  size="small"
                  variant="contained"
                  startIcon={<ShoppingCart />}
                  onClick={() => handleAddToCart(product)}
                  sx={{ borderRadius: 0, borderBottomLeftRadius: 8, borderBottomRightRadius: 8, bgcolor: '#fb641b' }}
                >
                  Add
                </Button>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default SportCategory;