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
  TextField,
  InputAdornment,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Slider,
  Drawer,
  Stack,
  FormControlLabel,
  Checkbox,
  CircularProgress,
  Fab,
} from '@mui/material';
import {
  Search,
  FilterList,
  Close,
  Clear,
  ArrowUpward,
  LocalShipping,
  Favorite,
  FavoriteBorder,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { productImages, DEFAULT_IMAGE } from '../utils/productImages';
import toast from 'react-hot-toast';
import '../App.css';

// Format price in Indian Rupees
const formatPrice = (price) => {
  return `₹${price?.toLocaleString('en-IN') || 0}`;
};

const Products = () => {
  const navigate = useNavigate();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 20000]);
  const [sortBy, setSortBy] = useState('popularity');
  const [filterOpen, setFilterOpen] = useState(false);
  
  const BASE_URL = 'https://solid-fishstick-7v74445764vj3pjgx-5000.app.github.dev';

  // Calculate brands from products
  const brands = products.length > 0 
    ? [...new Set(products.map(p => p.brand))].filter(Boolean)
    : [];

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    
    try {
      console.log('🔍 Fetching products from:', `${BASE_URL}/api/products`);
      
      const response = await fetch(`${BASE_URL}/api/products`);
      console.log('📡 Response status:', response.status);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('📦 API Response:', data);
      
      // Handle different API response structures
      let productsArray = [];
      
      if (Array.isArray(data)) {
        productsArray = data;
      } 
      else if (data.success && Array.isArray(data.products)) {
        productsArray = data.products;
      }
      else if (data.products && Array.isArray(data.products)) {
        productsArray = data.products;
      }
      else if (data.data && Array.isArray(data.data)) {
        productsArray = data.data;
      }
      else {
        if (typeof data === 'object' && data !== null) {
          const possibleArrays = Object.values(data).filter(val => Array.isArray(val));
          if (possibleArrays.length > 0) {
            productsArray = possibleArrays[0];
          } else {
            throw new Error('No products array found in response');
          }
        } else {
          throw new Error('Invalid response format');
        }
      }
      
      console.log(`✅ Extracted ${productsArray.length} products from API`);
      
      if (productsArray.length === 0) {
        setError('No products found');
        setLoading(false);
        return;
      }
      
      // Map ALL products with UNIQUE images from shared file
      const mappedProducts = productsArray.map((product, index) => {
        // Try to get image from productImages first, then from product, then default
        let productImage = DEFAULT_IMAGE;
        
        if (product.name && productImages[product.name]) {
          productImage = productImages[product.name];
        } else if (product.image) {
          productImage = product.image;
        } else if (product.imageUrl) {
          productImage = product.imageUrl;
        } else {
          // Assign based on category/sport
          const name = (product.name || '').toLowerCase();
          const category = (product.category || '').toLowerCase();
          
          if (name.includes('cricket') || category.includes('cricket')) {
            productImage = 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=500';
          } else if (name.includes('football') || category.includes('football')) {
            productImage = 'https://images.unsplash.com/photo-1575361204480-aadea25e6e68?w=500';
          } else if (name.includes('basketball') || category.includes('basketball')) {
            productImage = 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=500';
          } else if (name.includes('badminton') || category.includes('badminton')) {
            productImage = 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=500';
          } else if (name.includes('gym') || category.includes('gym') || name.includes('fitness')) {
            productImage = 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=500';
          } else if (name.includes('run') || category.includes('running')) {
            productImage = 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500';
          } else if (name.includes('bag') || category.includes('bag')) {
            productImage = 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500';
          }
        }
        
        return {
          _id: product._id || product.id || `prod_${index}_${Date.now()}`,
          name: product.name || 'Unnamed Product',
          brand: product.brand || product.brandName || 'SportsXpress',
          price: product.price || product.discountedPrice || Math.floor(Math.random() * 3000) + 499,
          originalPrice: product.originalPrice || product.mrp || product.price || 0,
          discountPercentage: product.discount || product.discountPercentage || 
            (product.originalPrice && product.price ? 
              Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 20),
          rating: product.rating || (Math.random() * 2 + 3).toFixed(1),
          category: product.category || 'general',
          sport: product.sport || 'other',
          image: productImage,
          inStock: product.inStock !== false && product.stockQuantity !== 0,
        };
      });
      
      console.log(`✅ Mapped ${mappedProducts.length} products for UI`);
      setProducts(mappedProducts);
      setFilteredProducts(mappedProducts);
      
    } catch (error) {
      console.error('❌ Error fetching products:', error);
      setError(`Failed to load products: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Filter products based on search, brand, price, and sort
  useEffect(() => {
    let result = [...products];
    
    if (searchQuery) {
      result = result.filter(p =>
        p.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.brand?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    if (selectedBrands.length > 0) {
      result = result.filter(p => selectedBrands.includes(p.brand));
    }
    
    result = result.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);
    
    switch (sortBy) {
      case 'price-low': result.sort((a, b) => a.price - b.price); break;
      case 'price-high': result.sort((a, b) => b.price - a.price); break;
      case 'rating': result.sort((a, b) => (b.rating || 0) - (a.rating || 0)); break;
      default: break;
    }
    
    setFilteredProducts(result);
  }, [searchQuery, selectedBrands, priceRange, sortBy, products]);

  const handleWishlistToggle = (product, e) => {
    e.stopPropagation();
    if (isInWishlist(product._id)) {
      removeFromWishlist(product._id);
      toast.success('Removed from wishlist', {
        icon: '💔',
      });
    } else {
      addToWishlist(product);
      toast.success('Added to wishlist', {
        icon: '❤️',
      });
    }
  };

  const handleBrandToggle = (brand) => {
    setSelectedBrands(prev =>
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
    );
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedBrands([]);
    setPriceRange([0, 20000]);
    setSortBy('popularity');
    setFilterOpen(false);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <CircularProgress />
        <Typography sx={{ ml: 2 }}>Loading products...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Container sx={{ py: 8, textAlign: 'center' }}>
        <Typography variant="h5" color="error" gutterBottom>{error}</Typography>
        <Button variant="contained" onClick={fetchProducts} sx={{ bgcolor: '#fb641b' }}>
          Retry
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4, bgcolor: '#f1f3f6', minHeight: '100vh' }}>
      {/* Header with product count */}
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4" fontWeight="bold">
          All Sports Equipment
        </Typography>
        <Chip 
          label={`${filteredProducts.length} products`} 
          color="primary" 
          sx={{ fontSize: '16px', py: 2 }}
        />
      </Box>

      {/* Search and Filter Bar */}
      <Box sx={{ mb: 4 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: <InputAdornment position="start"><Search /></InputAdornment>,
                endAdornment: searchQuery && (
                  <IconButton onClick={() => setSearchQuery('')}>
                    <Clear />
                  </IconButton>
                ),
              }}
              sx={{ bgcolor: 'white' }}
            />
          </Grid>
          
          <Grid item xs={12} md={3}>
            <FormControl fullWidth sx={{ bgcolor: 'white' }}>
              <InputLabel>Sort By</InputLabel>
              <Select value={sortBy} onChange={(e) => setSortBy(e.target.value)} label="Sort By">
                <MenuItem value="popularity">Popularity</MenuItem>
                <MenuItem value="price-low">Price: Low to High</MenuItem>
                <MenuItem value="price-high">Price: High to Low</MenuItem>
                <MenuItem value="rating">Rating</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={12} md={3}>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<FilterList />}
              onClick={() => setFilterOpen(true)}
              sx={{ height: '56px', bgcolor: 'white' }}
            >
              Filters
            </Button>
          </Grid>
        </Grid>
      </Box>

      {/* Filter Drawer */}
      <Drawer anchor="left" open={filterOpen} onClose={() => setFilterOpen(false)}>
        <Box sx={{ width: 300, p: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant="h6">Filters</Typography>
            <IconButton onClick={() => setFilterOpen(false)}><Close /></IconButton>
          </Box>
          
          <Typography variant="subtitle1" gutterBottom>Price Range</Typography>
          <Slider 
            value={priceRange} 
            onChange={(e, v) => setPriceRange(v)} 
            min={0} 
            max={20000} 
            valueLabelDisplay="auto"
            valueLabelFormat={(value) => formatPrice(value)}
          />
          
          {brands.length > 0 && (
            <>
              <Typography variant="subtitle1" sx={{ mt: 3 }} gutterBottom>Brands</Typography>
              <Stack spacing={1}>
                {brands.map(brand => (
                  <FormControlLabel
                    key={brand}
                    control={
                      <Checkbox 
                        checked={selectedBrands.includes(brand)} 
                        onChange={() => handleBrandToggle(brand)} 
                      />
                    }
                    label={brand}
                  />
                ))}
              </Stack>
            </>
          )}
          
          <Button 
            fullWidth 
            variant="contained" 
            onClick={handleClearFilters} 
            sx={{ mt: 3, bgcolor: '#fb641b' }}
          >
            Clear Filters
          </Button>
        </Box>
      </Drawer>

      {/* Products Grid - ALL products shown, 5 in a row */}
      {filteredProducts.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h6" gutterBottom>No products found</Typography>
          <Button variant="contained" onClick={handleClearFilters} sx={{ bgcolor: '#fb641b' }}>
            Clear Filters
          </Button>
        </Box>
      ) : (
        <Grid container spacing={2}>
          {filteredProducts.map((product) => {
            const discount = product.discountPercentage || 
              (product.originalPrice > product.price ? 
                Math.floor(((product.originalPrice - product.price) / product.originalPrice) * 100) : 20);
            
            return (
              // CHANGED: From lg={3} (4 columns) to lg={2.4} (5 columns)
              <Grid item xs={12} sm={6} md={4} lg={2.4} key={product._id}>
                <Card 
                  sx={{ 
                    height: '100%', 
                    display: 'flex', 
                    flexDirection: 'column',
                    position: 'relative',
                    cursor: 'pointer',
                    '&:hover': { boxShadow: 6 }
                  }}
                  onClick={() => navigate(`/products/${product._id}`)}
                >
                  {/* Wishlist Button */}
                  <IconButton
                    sx={{
                      position: 'absolute',
                      top: 8,
                      right: 8,
                      zIndex: 10,
                      bgcolor: 'white',
                      boxShadow: 1,
                      '&:hover': { bgcolor: '#f5f5f5' }
                    }}
                    onClick={(e) => handleWishlistToggle(product, e)}
                  >
                    {isInWishlist(product._id) ? (
                      <Favorite sx={{ color: '#fb641b' }} />
                    ) : (
                      <FavoriteBorder />
                    )}
                  </IconButton>

                  {/* Discount Badge */}
                  {discount > 0 && (
                    <Chip 
                      label={`${discount}% OFF`} 
                      size="small" 
                      sx={{ 
                        position: 'absolute', 
                        top: 8, 
                        left: 8, 
                        bgcolor: '#ff4444', 
                        color: 'white',
                        fontWeight: 'bold'
                      }} 
                    />
                  )}

                  {/* Product Image */}
                  <Box
                    sx={{
                      height: 180,
                      width: '100%',
                      backgroundImage: `url(${product.image})`,
                      backgroundSize: 'contain',
                      backgroundPosition: 'center',
                      backgroundRepeat: 'no-repeat',
                      backgroundColor: '#ffffff',
                      borderBottom: '1px solid #eee',
                      p: 2
                    }}
                  />

                  <CardContent sx={{ p: 1.5 }}>
                    <Typography variant="caption" color="text.secondary">
                      {product.brand}
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600, height: 40, overflow: 'hidden' }}>
                      {product.name}
                    </Typography>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, flexWrap: 'wrap', mt: 0.5 }}>
                      <Typography variant="caption" sx={{ color: '#00a650', fontWeight: 'bold' }}>
                        {discount}% off
                      </Typography>
                      <Typography variant="caption" sx={{ textDecoration: 'line-through', color: '#999' }}>
                        {formatPrice(product.originalPrice)}
                      </Typography>
                      <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#2ecc71' }}>
                        {formatPrice(product.price)}
                      </Typography>
                    </Box>

                    <Typography variant="caption" sx={{ color: '#00a650', display: 'block' }}>
                      WOW! {formatPrice(Math.floor(product.price * 0.4))} with 3 offers
                    </Typography>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 0.5 }}>
                      <Rating value={parseFloat(product.rating) || 4} size="small" readOnly />
                      <Chip label="Assured" size="small" sx={{ height: 16, fontSize: '8px', bgcolor: '#ffc107' }} />
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <LocalShipping sx={{ fontSize: 14, color: '#00a650' }} />
                      <Typography variant="caption" sx={{ color: '#00a650' }}>Free Delivery</Typography>
                    </Box>
                  </CardContent>

                  {/* View Details Button */}
                  <Box sx={{ p: 1.5, pt: 0 }}>
                    <Button
                      fullWidth
                      variant="contained"
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/products/${product._id}`);
                      }}
                      sx={{ bgcolor: '#1976d2' }}
                    >
                      View Details
                    </Button>
                  </Box>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      )}

      {/* REMOVED: Pagination section completely */}

      {/* Scroll to Top */}
      <Fab color="primary" sx={{ position: 'fixed', bottom: 16, right: 16 }} onClick={() => window.scrollTo(0, 0)}>
        <ArrowUpward />
      </Fab>
    </Container>
  );
};

export default Products;