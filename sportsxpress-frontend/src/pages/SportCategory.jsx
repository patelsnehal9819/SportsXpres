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
  CircularProgress,
  Breadcrumbs,
  Link,
} from '@mui/material';
import {
  ShoppingCart,
  LocalShipping,
  Home,
} from '@mui/icons-material';
import { useParams, useNavigate, Link as RouterLink } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { productImages, DEFAULT_IMAGE } from '../utils/productImages';
import toast from 'react-hot-toast';
import '../App.css';

// Format price in Indian Rupees
const formatPrice = (price) => {
  return `₹${price?.toLocaleString('en-IN') || 0}`;
};

const sportNames = {
  'cricket': 'Cricket',
  'football': 'Football',
  'basketball': 'Basketball',
  'badminton': 'Badminton',
  'gym-fitness': 'Gym & Fitness',
  'running': 'Running'
};

// COMPLETE product mapping by sport - based on your productImages
const sportProducts = {
  'cricket': [
    'SG Abdomen Guard',
    'Masuri Cricket Helmet',
    'SG Thigh Guard',
    'SG Arm Guard',
    'Shrey Cricket Helmet',
    'SG Cricket Helmet',
    'SG Cricket Pads',
    'Gray-Nicolls Pads',
    'SS Cricket Pads',
    'SG Cricket Gloves',
    'Gray-Nicolls Gloves',
    'SS Cricket Gloves',
    'Kookaburra Cricket Bat',
    'SG Test Cricket Bat',
    'MRF Genius Cricket Bat',
    'Gray-Nicolls Cricket Bat',
    'CA Cricket Bat',
    'SS Ton Cricket Bat',
    'BAS Cricket Bat',
    'GM Cricket Bat',
    'SG Cricket Ball (White)',
    'SG Cricket Ball (Red)',
    'Kookaburra Cricket Ball',
    'Dukes Cricket Ball',
    'SG Cricket Shoes',
    'Adidas Cricket Shoes',
    'Nike Cricket Shoes',
    'SG Cricket Kit Bag',
    'SS Cricket Kit Bag',
    'SG Cricket Stumps'
  ],
  'football': [
    'Select Brillant Ball',
    'Adidas Predator Edge',
    'Nike Mercurial Superfly',
    'Puma Future Z',
    'Under Armour Magnetico',
    'New Balance Furon',
    'Puma Orbita Ball',
    'Adidas Al Rihla Ball',
    'Nike Flight Ball',
    'Adidas Predator Gloves',
    'Puma Ultra Gloves',
    'Nike Vapor Gloves',
    'Adidas Shin Guards',
    'Nike Shin Guards',
    'Puma Shin Guards',
    'Germany Jersey 2024',
    'Argentina Jersey 2024',
    'Brazil Jersey 2024',
    'France Jersey 2024',
    'Spain Jersey 2024',
    'England Jersey 2024',
    'Portable Goal',
    'Football Rebounder',
    'Adidas Training Cones'
  ],
  'basketball': [
    'Nike Elite Basketball',
    'Wilson Evolution Ball',
    'Spalding NBA Basketball',
    'Molten Basketball',
    'Cosco Basketball',
    'Nike Kyrie 8',
    'Nike LeBron 21',
    'Under Armour Curry',
    'Puma Clyde All-Pro',
    'Adidas Harden Vol 7',
    'LA Lakers Jersey',
    'Chicago Bulls Jersey',
    'Brooklyn Nets Jersey',
    'Golden State Jersey',
    'Boston Celtics Jersey',
    'Cosco Basketball Hoop',
    'Spalding Basketball Hoop',
    'Lifetime Basketball Hoop',
    'Basketball Net',
    'Basketball Pump',
    'NBA Wristband',
    'NBA Headband'
  ],
  'badminton': [
    'Yonex Astrox 100 ZZ',
    'Yonex Voltric Z-Force II',
    'Li-Ning N90 III',
    'Carlton Kinesis EX',
    'Victor Thruster K',
    'Yonex Aerosensa 50',
    'Yonex Aerosensa 30',
    'Yonex Aerosensa 20',
    'Li-Ning Shuttlecocks',
    'Yonex BG-65 String',
    'Yonex BG-80 String',
    'Yonex BG-66 String',
    'Yonex Super Grap Grip',
    'Li-Ning Grip',
    'Yonex Towel Grip',
    'Yonex Power Cushion 65Z',
    'Victor Badminton Shoes',
    'Li-Ning Blade Pro',
    'Yonex Official Net',
    'Victor Net',
    'Li-Ning Net',
    'Yonex Pro Bag',
    'Victor Badminton Bag',
    'Li-Ning Badminton Bag',
    'Yonex Pro Shorts',
    'Yonex Pro Jersey',
    'Li-Ning Badminton Jersey',
    'Yonex Headband',
    'Yonex Wristband',
    'Yonex Socks'
  ],
  'gym-fitness': [
    'Kore 20kg Dumbbell Set',
    'Kore 30kg Dumbbell Set',
    'Cockatoo 20kg Dumbbell Set',
    'Cockatoo 30kg Dumbbell Set',
    'Cockatoo 40kg Dumbbell Set',
    'Cockatoo 12kg Kettlebell',
    'Cockatoo 8kg Kettlebell',
    'Kore 8kg Kettlebell',
    'Cockatoo Weight Bench',
    'Kore Weight Bench',
    'BodyMax Weight Bench',
    'BodyMax Yoga Mat',
    'Kore Yoga Mat',
    'Cockatoo Yoga Mat',
    'Cockatoo Resistance Bands',
    'BodyMax Resistance Bands',
    'Kore Resistance Bands',
    'Cockatoo Skipping Rope',
    'Cockatoo Push Up Bars',
    'Cockatoo Gym Ball',
    'Cockatoo Ab Wheel',
    'Cockatoo Wrist Weights',
    'Cockatoo Ankle Weights',
    'BodyMax Barbell Set',
    'Kore Barbell Set',
    'Cockatoo Barbell Set',
    'BodyMax Gym Gloves',
    'Kore Gym Gloves',
    'Cockatoo Gym Gloves',
    'Cockatoo Treadmill',
    'Knee Pads'
  ],
  'running': [
    'Nike Air Zoom Pegasus',
    'Adidas Ultraboost 23',
    'Puma Velocity Nitro',
    'Asics Gel-Nimbus 25',
    'New Balance Fresh Foam',
    'Nike Dri-FIT Shorts',
    'Adidas Running Shorts',
    'Puma Running Shorts',
    'Under Armour Shorts',
    'Nike Dri-FIT Tee',
    'Adidas Running Tee',
    'Puma Running Tee',
    'Nike Running Belt',
    'Adidas Running Belt',
    'Nike Running Cap',
    'Adidas Running Cap',
    'Nike Running Socks',
    'Adidas Running Socks',
    'Running Socks',
    'Running Water Bottle',
    'Running Hydration Pack',
    'Running Protein Bar',
    'Running Energy Gel',
    'Running Electrolytes',
    'Running Knee Brace',
    'Running Ankle Brace',
    'Ankle Braces',
    'Garmin Forerunner 255',
    'Garmin Forerunner 55',
    'Garmin Forerunner 955',
    'Nike Running Sunglasses',
    'Running Headlamp'
  ]
};

const SportCategory = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const BASE_URL = 'https://solid-fishstick-7v74445764vj3pjgx-5000.app.github.dev';

  useEffect(() => {
    if (category) {
      fetchProducts();
    }
  }, [category]);

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    
    try {
      console.log(`🔍 Fetching all products for ${category} category...`);
      
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
      
      console.log(`✅ Found ${productsArray.length} total products`);
      
      if (productsArray.length === 0) {
        setError('No products found');
        setLoading(false);
        return;
      }
      
      // Get the list of products for this specific sport
      const allowedProducts = sportProducts[category] || [];
      console.log(`📋 Allowed products for ${category}:`, allowedProducts);
      
      // Filter products based on the strict list
      const filtered = productsArray.filter(product => {
        const productName = product.name || '';
        return allowedProducts.includes(productName);
      });
      
      console.log(`✅ Filtered to ${filtered.length} products for ${category}`);
      
      if (filtered.length === 0) {
        console.log('❌ No products found for this category');
        setFilteredProducts([]);
        setProducts([]);
        setLoading(false);
        return;
      }
      
      // Map products with images from shared productImages object
      const mappedProducts = filtered.map(product => {
        const productImage = productImages[product.name] || 
                            product.image || 
                            product.imageUrl || 
                            DEFAULT_IMAGE;
        
        return {
          _id: product._id || product.id,
          name: product.name,
          brand: product.brand || 'SportsXpress',
          price: product.discountedPrice || product.price || 0,
          originalPrice: product.originalPrice || product.mrp || product.price || 0,
          discountPercentage: product.discount || product.discountPercentage || 20,
          rating: product.rating || 4.5,
          category: product.category || 'general',
          sport: product.sport || 'other',
          image: productImage,
          inStock: product.inStock !== false,
        };
      });
      
      setProducts(mappedProducts);
      setFilteredProducts(mappedProducts);
      
    } catch (error) {
      console.error('❌ Error fetching products:', error);
      setError(`Failed to load products: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (product, e) => {
    e.stopPropagation();
    
    const cartProduct = {
      _id: product._id || product.id,
      name: product.name,
      brand: product.brand,
      price: product.price,
      image: product.image,
      quantity: 1
    };
    
    addToCart(cartProduct);
    toast.success(`${product.name} added to cart!`);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <CircularProgress />
        <Typography sx={{ ml: 2 }}>Loading {sportNames[category] || category} products...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Container sx={{ py: 8, textAlign: 'center' }}>
        <Typography variant="h5" color="error" gutterBottom>{error}</Typography>
        <Button 
          variant="contained" 
          onClick={fetchProducts} 
          sx={{ bgcolor: '#fb641b', mt: 2 }}
        >
          Retry
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4, bgcolor: '#f1f3f6', minHeight: '100vh' }}>
      {/* Breadcrumb */}
      <Breadcrumbs sx={{ mb: 3 }}>
        <Link component={RouterLink} to="/" underline="hover" color="inherit">
          <Home sx={{ mr: 0.5, fontSize: 18 }} />
          Home
        </Link>
        <Link component={RouterLink} to="/sports-page" underline="hover" color="inherit">
          Sports
        </Link>
        <Typography color="text.primary">{sportNames[category] || category}</Typography>
      </Breadcrumbs>

      {/* Header */}
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4" fontWeight="bold">
          {sportNames[category] || category} Equipment
        </Typography>
        <Chip 
          label={`${filteredProducts.length} items`} 
          color="primary" 
          sx={{ fontSize: '16px', py: 2 }}
        />
      </Box>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h6" gutterBottom>
            No {sportNames[category] || category} products found
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Try checking other categories or browse all products
          </Typography>
          <Button 
            variant="contained" 
            onClick={() => navigate('/products')}
            sx={{ bgcolor: '#fb641b' }}
          >
            View All Products
          </Button>
        </Box>
      ) : (
        <Grid container spacing={2}>
          {filteredProducts.map((product) => {
            const originalPrice = product.originalPrice || product.price;
            const discountedPrice = product.price;
            const discount = originalPrice > discountedPrice 
              ? Math.round(((originalPrice - discountedPrice) / originalPrice) * 100) 
              : 0;
            
            return (
              <Grid item xs={12} sm={6} md={4} lg={3} key={product._id || product.id}>
                <Card 
                  sx={{ 
                    height: '100%', 
                    cursor: 'pointer',
                    position: 'relative',
                    '&:hover': { boxShadow: 6 }
                  }}
                  onClick={() => navigate(`/products/${product._id || product.id}`)}
                >
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
                        fontWeight: 'bold',
                        zIndex: 1
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
                      {product.brand || 'SportsXpress'}
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600, height: 40, overflow: 'hidden' }}>
                      {product.name}
                    </Typography>
                    
                    {/* Price Section */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, flexWrap: 'wrap', mt: 0.5 }}>
                      {discount > 0 && (
                        <>
                          <Typography variant="caption" sx={{ color: '#00a650', fontWeight: 'bold' }}>
                            {discount}% off
                          </Typography>
                          <Typography variant="caption" sx={{ textDecoration: 'line-through', color: '#999' }}>
                            {formatPrice(originalPrice)}
                          </Typography>
                        </>
                      )}
                      <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#2ecc71' }}>
                        {formatPrice(discountedPrice)}
                      </Typography>
                    </Box>

                    {/* Rating */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 0.5 }}>
                      <Rating value={product.rating || 4} size="small" readOnly />
                      <Chip 
                        label="Assured" 
                        size="small" 
                        sx={{ height: 16, fontSize: '8px', bgcolor: '#ffc107' }} 
                      />
                    </Box>

                    {/* Free Shipping */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 0.5 }}>
                      <LocalShipping sx={{ fontSize: 14, color: '#00a650' }} />
                      <Typography variant="caption" sx={{ color: '#00a650' }}>Free Delivery</Typography>
                    </Box>
                  </CardContent>

                  <Box sx={{ p: 1.5, pt: 0 }}>
                    <Button
                      fullWidth
                      variant="contained"
                      size="small"
                      startIcon={<ShoppingCart />}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddToCart(product, e);
                      }}
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
    </Container>
  );
};

export default SportCategory;