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
  Pagination,
  Drawer,
  Stack,
  Divider,
  FormControlLabel,
  Checkbox,
  CircularProgress,
  Fab,
} from '@mui/material';
import {
  Search,
  FilterList,
  Close,
  ShoppingCart,
  Clear,
  ArrowUpward,
  LocalShipping,
  Favorite,
  FavoriteBorder,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { formatINR } from '../utils/currencyFormatter';
import toast from 'react-hot-toast';
import '../App.css';

const Products = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 20000]);
  const [sortBy, setSortBy] = useState('popularity');
  const [page, setPage] = useState(1);
  const [filterOpen, setFilterOpen] = useState(false);
  
  const itemsPerPage = 12;
  const BASE_URL = 'https://solid-fishstick-7v74445764vj3pjgx-5000.app.github.dev';

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      console.log('🔍 Fetching products from:', `${BASE_URL}/api/products`);
      
      const response = await fetch(`${BASE_URL}/api/products`);
      const data = await response.json();
      
      console.log('📦 API Response:', data);
      
      if (data.success && data.products && data.products.length > 0) {
        console.log(`✅ Found ${data.products.length} products`);
        setProducts(data.products);
        setFilteredProducts(data.products);
      } else {
        console.log('❌ No products found in API');
        // Use mock data as fallback
        const mockProducts = [
          { _id: '1', name: 'SG Test Cricket Bat', brand: 'SG', price: 5499, rating: 4.5, category: 'bat', sport: 'cricket', image: '' },
          { _id: '2', name: 'Nike Football Shoes', brand: 'Nike', price: 5999, rating: 4.7, category: 'shoes', sport: 'football', image: '' },
          { _id: '3', name: 'Yonex Badminton Racket', brand: 'Yonex', price: 3999, rating: 4.8, category: 'racket', sport: 'badminton', image: '' },
        ];
        setProducts(mockProducts);
        setFilteredProducts(mockProducts);
      }
    } catch (error) {
      console.error('❌ Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

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
    setPage(1);
  }, [searchQuery, selectedBrands, priceRange, sortBy, products]);

  const handleAddToCart = (product, e) => {
    e.stopPropagation();
    addToCart(product);
    toast.success(`${product.name} added to cart!`);
  };

  const handleWishlistToggle = (product, e) => {
    e.stopPropagation();
    if (isInWishlist(product._id)) {
      removeFromWishlist(product._id);
      toast.success('Removed from wishlist');
    } else {
      addToWishlist(product);
      toast.success('Added to wishlist');
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
  };

  const brands = [...new Set(products.map(p => p.brand))].filter(Boolean);
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4, bgcolor: '#f1f3f6', minHeight: '100vh' }}>
      {/* Search Bar */}
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
            valueLabelFormat={(value) => `₹${value}`}
          />
          
          {brands.length > 0 && (
            <>
              <Typography variant="subtitle1" sx={{ mt: 3 }} gutterBottom>Brands</Typography>
              <Stack spacing={1}>
                {brands.map(brand => (
                  <FormControlLabel
                    key={brand}
                    control={<Checkbox checked={selectedBrands.includes(brand)} onChange={() => handleBrandToggle(brand)} />}
                    label={brand}
                  />
                ))}
              </Stack>
            </>
          )}
          
          <Button fullWidth variant="contained" onClick={handleClearFilters} sx={{ mt: 3, bgcolor: '#fb641b' }}>
            Clear Filters
          </Button>
        </Box>
      </Drawer>

      {/* Products Count */}
      <Typography variant="h5" gutterBottom>
        Products <Chip label={`${filteredProducts.length} items`} size="small" sx={{ ml: 2 }} />
      </Typography>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h6" gutterBottom>
            No products found
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Try adjusting your search or filters
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={2}>
          {paginatedProducts.map((product) => {
            const discount = Math.floor(Math.random() * 40) + 20;
            const originalPrice = Math.round(product.price * (1 + discount/100));
            
            return (
              <Grid item xs={12} sm={6} md={4} lg={3} key={product._id}>
                <Card 
                  sx={{ 
                    height: '100%', 
                    display: 'flex', 
                    flexDirection: 'column',
                    position: 'relative',
                    cursor: 'pointer'
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
                    }}
                    onClick={(e) => handleWishlistToggle(product, e)}
                  >
                    {isInWishlist(product._id) ? (
                      <Favorite sx={{ color: '#fb641b' }} />
                    ) : (
                      <FavoriteBorder />
                    )}
                  </IconButton>

                  {/* Hot Deal Badge */}
                  {discount > 30 && (
                    <Chip 
                      label="Hot Deal" 
                      size="small" 
                      sx={{ position: 'absolute', top: 8, left: 8, bgcolor: '#ff6b6b', color: 'white' }} 
                    />
                  )}

                  {/* Product Image */}
                  <Box
                    className={`product-image-${product.category || 'default'} product-image-container`}
                    sx={{
                      height: 160,
                      width: '100%',
                      backgroundSize: 'contain',
                      backgroundPosition: 'center',
                      backgroundRepeat: 'no-repeat',
                      backgroundColor: '#ffffff',
                    }}
                  />

                  <CardContent sx={{ p: 1.5 }}>
                    <Typography variant="caption" color="text.secondary">
                      {product.brand}
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600, height: 40, overflow: 'hidden' }}>
                      {product.name}
                    </Typography>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, flexWrap: 'wrap' }}>
                      <Typography variant="caption" sx={{ color: '#00a650', fontWeight: 'bold' }}>
                        {discount}% off
                      </Typography>
                      <Typography variant="caption" sx={{ textDecoration: 'line-through', color: '#999' }}>
                        {formatINR(originalPrice)}
                      </Typography>
                      <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                        {formatINR(product.price)}
                      </Typography>
                    </Box>

                    <Typography variant="caption" sx={{ color: '#00a650', display: 'block' }}>
                      WOW! {formatINR(Math.floor(product.price * 0.4))} with 3 offers
                    </Typography>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 0.5 }}>
                      <Rating value={product.rating || 4.5} size="small" readOnly />
                      <Chip label="Assured" size="small" sx={{ height: 16, fontSize: '8px', bgcolor: '#ffc107' }} />
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <LocalShipping sx={{ fontSize: 14, color: '#00a650' }} />
                      <Typography variant="caption" sx={{ color: '#00a650' }}>Express</Typography>
                    </Box>
                  </CardContent>

                  <Box sx={{ p: 1.5, pt: 0 }}>
                    <Button
                      fullWidth
                      variant="contained"
                      size="small"
                      startIcon={<ShoppingCart />}
                      onClick={(e) => handleAddToCart(product, e)}
                      sx={{ bgcolor: '#fb641b' }}
                    >
                      Add to Cart
                    </Button>
                  </Box>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Pagination count={totalPages} page={page} onChange={(e, v) => setPage(v)} color="primary" />
        </Box>
      )}

      <Fab color="primary" sx={{ position: 'fixed', bottom: 16, right: 16 }} onClick={() => window.scrollTo(0, 0)}>
        <ArrowUpward />
      </Fab>
    </Container>
  );
};

export default Products;