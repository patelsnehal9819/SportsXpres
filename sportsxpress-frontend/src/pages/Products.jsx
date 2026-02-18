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
  Badge,
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
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { formatINR } from '../utils/currencyFormatter';
import toast from 'react-hot-toast';

const Products = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [sortBy, setSortBy] = useState('popularity');

  useEffect(() => {
    // Get search query from URL
    const params = new URLSearchParams(location.search);
    const search = params.get('search');
    if (search) {
      setSearchQuery(search);
    }

    // Load products
    const allProducts = JSON.parse(localStorage.getItem('sportsxpress_products') || '[]');
    setProducts(allProducts);
    setFilteredProducts(allProducts);
    setLoading(false);
  }, [location.search]);

  useEffect(() => {
    let result = [...products];

    // Search filter
    if (searchQuery) {
      result = result.filter(p => 
        p.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.brand?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Category filter
    if (selectedCategory) {
      result = result.filter(p => p.sport === selectedCategory);
    }

    // Brand filter
    if (selectedBrand) {
      result = result.filter(p => p.brand === selectedBrand);
    }

    // Price filter
    result = result.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

    // Sorting
    result.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return (b.rating || 0) - (a.rating || 0);
        default:
          return (b.views || 0) - (a.views || 0);
      }
    });

    setFilteredProducts(result);
  }, [products, searchQuery, selectedCategory, selectedBrand, priceRange, sortBy]);

  const categories = ['cricket', 'football', 'badminton', 'basketball', 'gym', 'running'];
  const brands = ['Nike', 'Adidas', 'Puma', 'SG', 'Yonex', 'Cosco'];

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
      {/* Search Bar */}
      <TextField
        fullWidth
        size="small"
        placeholder="Search products..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search sx={{ color: '#1976d2' }} />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={() => setFilterDrawerOpen(true)}>
                <Badge 
                  badgeContent={selectedCategory || selectedBrand || priceRange[0] > 0 ? 1 : 0} 
                  color="error"
                >
                  <FilterList />
                </Badge>
              </IconButton>
            </InputAdornment>
          ),
          sx: { borderRadius: 2, bgcolor: 'white' }
        }}
        sx={{ mb: 2 }}
      />

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

          {/* Sort By */}
          <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
            Sort By
          </Typography>
          <FormControl fullWidth size="small" sx={{ mb: 3 }}>
            <Select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              displayEmpty
            >
              <MenuItem value="popularity">Most Popular</MenuItem>
              <MenuItem value="price-low">Price: Low to High</MenuItem>
              <MenuItem value="price-high">Price: High to Low</MenuItem>
              <MenuItem value="rating">Top Rated</MenuItem>
            </Select>
          </FormControl>

          {/* Category */}
          <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
            Category
          </Typography>
          <FormControl fullWidth size="small" sx={{ mb: 3 }}>
            <Select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              displayEmpty
            >
              <MenuItem value="">All Categories</MenuItem>
              {categories.map((cat) => (
                <MenuItem key={cat} value={cat}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Brand */}
          <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
            Brand
          </Typography>
          <FormControl fullWidth size="small" sx={{ mb: 3 }}>
            <Select
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
              displayEmpty
            >
              <MenuItem value="">All Brands</MenuItem>
              {brands.map((brand) => (
                <MenuItem key={brand} value={brand}>{brand}</MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Price Range */}
          <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
            Price Range
          </Typography>
          <Box sx={{ px: 1, mb: 3 }}>
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

          {/* Apply Button */}
          <Button
            fullWidth
            variant="contained"
            onClick={() => setFilterDrawerOpen(false)}
            sx={{ 
              bgcolor: '#fb641b',
              borderRadius: 2,
              py: 1.5,
            }}
          >
            Apply Filters
          </Button>
        </Box>
      </Drawer>

      {/* Results Count */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="body2" color="text.secondary">
          {filteredProducts.length} products found
        </Typography>
        <Chip 
          icon={<Sort />} 
          label={sortBy === 'popularity' ? 'Popular' : sortBy} 
          size="small"
          onClick={() => setFilterDrawerOpen(true)}
        />
      </Box>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <Typography variant="h6">No products found</Typography>
          <Typography variant="body2" color="text.secondary">
            Try adjusting your filters
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={2}>
          {filteredProducts.map((product) => (
            <Grid item xs={6} key={product.id}>
              <Card sx={{ 
                borderRadius: 2,
                position: 'relative',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
              }}>
                {/* Wishlist Button */}
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
                  image={product.image || 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'}
                  alt={product.name}
                  sx={{ objectFit: 'cover', cursor: 'pointer' }}
                  onClick={() => navigate(`/products/${product.id}`)}
                />

                <CardContent sx={{ p: 1.5, flexGrow: 1 }}>
                  <Typography variant="caption" color="text.secondary">
                    {product.brand}
                  </Typography>
                  <Typography 
                    variant="body2" 
                    sx={{ fontWeight: 600, mb: 0.5, cursor: 'pointer' }}
                    onClick={() => navigate(`/products/${product.id}`)}
                    noWrap
                  >
                    {product.name}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                    <Rating value={product.rating || 4.5} size="small" readOnly />
                    <Typography variant="caption" sx={{ ml: 0.5 }}>
                      ({product.reviews || 0})
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="primary.main" fontWeight="bold">
                    {formatINR(product.price)}
                  </Typography>
                </CardContent>

                <Button
                  fullWidth
                  variant="contained"
                  size="small"
                  startIcon={<ShoppingCart />}
                  onClick={() => handleAddToCart(product)}
                  sx={{ 
                    borderRadius: 0,
                    borderBottomLeftRadius: 8,
                    borderBottomRightRadius: 8,
                    bgcolor: '#fb641b',
                    py: 1,
                  }}
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

export default Products;