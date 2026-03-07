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
  Divider,
  IconButton,
  CircularProgress,
  Alert,
  Breadcrumbs,
  Link,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
} from '@mui/material';
import {
  ShoppingCart,
  Favorite,
  FavoriteBorder,
  LocalShipping,
  Verified,
  Security,
  Home,
  ArrowBack,
  CheckCircle,
} from '@mui/icons-material';
import { useParams, useNavigate, Link as RouterLink } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import toast from 'react-hot-toast';

const BASE_URL = 'https://solid-fishstick-7v74445764vj3pjgx-5000.app.github.dev';

// Format price in Indian Rupees
const formatPrice = (price) => {
  if (price === undefined || price === null) return '₹0';
  return `₹${price.toLocaleString('en-IN')}`;
};

// Get different images based on product name/category
const getProductImage = (product) => {
  const name = product.name?.toLowerCase() || '';
  const brand = product.brand?.toLowerCase() || '';
  
  // Cricket images
  if (name.includes('cricket') || name.includes('bat') || name.includes('helmet') || 
      name.includes('guard') || name.includes('pad') || name.includes('stump') ||
      brand.includes('sg') || brand.includes('kookaburra') || brand.includes('masuri') ||
      brand.includes('gray')) {
    return 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=500';
  }
  // Football images
  else if (name.includes('football') || name.includes('soccer') || 
           name.includes('predator') || name.includes('mercurial') ||
           name.includes('germany') || name.includes('argentina') ||
           name.includes('brazil') || name.includes('england') ||
           name.includes('spain') || name.includes('france')) {
    return 'https://images.unsplash.com/photo-1575361204480-aadea25e6e68?w=500';
  }
  // Basketball images
  else if (name.includes('basketball') || name.includes('hoop') ||
           name.includes('lebron') || name.includes('kyrie') ||
           name.includes('lakers') || name.includes('bulls') ||
           name.includes('nets') || name.includes('warriors') ||
           name.includes('celtics') || name.includes('spalding')) {
    return 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=500';
  }
  // Badminton images
  else if (name.includes('badminton') || name.includes('yonex') || 
           name.includes('shuttle') || name.includes('racket') ||
           name.includes('li-ning') || name.includes('victor') ||
           name.includes('aerosensa') || name.includes('astrox')) {
    return 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=500';
  }
  // Gym & Fitness images
  else if (name.includes('gym') || name.includes('dumbbell') || 
           name.includes('kettlebell') || name.includes('bench') ||
           name.includes('weight') || name.includes('mat') ||
           name.includes('cockatoo') || name.includes('kore') ||
           name.includes('bodymax') || name.includes('resistance')) {
    return 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=500';
  }
  // Running & Shoes images
  else if (name.includes('run') || name.includes('shoe') || 
           name.includes('sock') || name.includes('belt') ||
           name.includes('pegasus') || name.includes('ultraboost') ||
           name.includes('asics') || name.includes('new balance')) {
    return 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500';
  }
  // Bags & Accessories
  else if (name.includes('bag') || name.includes('backpack') || 
           name.includes('duffel') || name.includes('water bottle')) {
    return 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500';
  }
  // Default image
  else {
    return 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=500';
  }
};

const ProductDetail = () => {
  const { id } = useParams();
  console.log('📌 Product ID from URL:', id); // ADD THIS LINE
  console.log('📌 API URL:', `${BASE_URL}/api/products/${id}`); // ADD THIS LINE
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (id) {
      fetchProductDetails();
    }
  }, [id]);

  const fetchProductDetails = async () => {
    setLoading(true);
    setError(null);
    try {
      console.log('🔍 Fetching product details for ID:', id);
      
      const response = await fetch(`${BASE_URL}/api/products/${id}`);
      const data = await response.json();
      
      console.log('📦 Product API Response:', data);
      
      if (data.success && data.data) {
        // Map the product data
        const productData = {
          _id: data.data._id,
          name: data.data.name,
          brand: data.data.brand || 'SportsXpress',
          price: data.data.discountedPrice || data.data.price || 0,
          originalPrice: data.data.originalPrice || data.data.price || 0,
          discountPercentage: data.data.discountPercentage || 
            (data.data.originalPrice && data.data.discountedPrice ? 
              Math.round(((data.data.originalPrice - data.data.discountedPrice) / data.data.originalPrice) * 100) : 0),
          rating: 4.5,
          category: data.data.category || 'general',
          description: data.data.description || 'No description available',
          image: data.data.imageUrl || '',
          inStock: data.data.inStock !== false,
          stockQuantity: data.data.stockQuantity || 10,
          offers: data.data.offers || ['Special offer available'],
          features: data.data.features || [
            'Premium quality',
            'Official sports equipment',
            '1 year warranty',
            'Free shipping'
          ]
        };
        
        setProduct(productData);
        console.log('✅ Product loaded:', productData.name);
      } else {
        setError('Product not found');
      }
    } catch (error) {
      console.error('❌ Error fetching product:', error);
      setError('Failed to load product details');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    if (!product) return;
    
    addToCart({
      id: product._id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: quantity
    });
    toast.success(`${product.name} added to cart!`);
  };

  const handleWishlistToggle = () => {
    if (!product) return;
    
    if (isInWishlist(product._id)) {
      removeFromWishlist(product._id);
      toast.success('Removed from wishlist');
    } else {
      addToWishlist(product);
      toast.success('Added to wishlist');
    }
  };

  const handleQuantityChange = (delta) => {
    setQuantity(prev => {
      const newValue = prev + delta;
      if (newValue < 1) return 1;
      if (newValue > (product?.stockQuantity || 10)) return product?.stockQuantity || 10;
      return newValue;
    });
  };

  if (loading) {
    return (
      <Container sx={{ py: 4, display: 'flex', justifyContent: 'center', minHeight: '60vh', alignItems: 'center' }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error || !product) {
    return (
      <Container sx={{ py: 4 }}>
        <Alert 
          severity="error"
          action={
            <Button color="inherit" size="small" onClick={() => navigate('/products')}>
              Back to Products
            </Button>
          }
        >
          {error || 'Product not found'}
        </Alert>
      </Container>
    );
  }

  const discount = product.discountPercentage || 
    (product.originalPrice > product.price ? 
      Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Breadcrumb Navigation */}
      <Breadcrumbs sx={{ mb: 3 }}>
        <Link component={RouterLink} to="/" underline="hover" color="inherit">
          <Home sx={{ mr: 0.5, fontSize: 18 }} />
          Home
        </Link>
        <Link component={RouterLink} to="/products" underline="hover" color="inherit">
          Products
        </Link>
        <Typography color="text.primary">{product.name}</Typography>
      </Breadcrumbs>

      {/* Back Button */}
      <Button
        startIcon={<ArrowBack />}
        onClick={() => navigate(-1)}
        sx={{ mb: 3 }}
      >
        Back
      </Button>

      <Grid container spacing={4}>
        {/* Product Image */}
        <Grid item xs={12} md={6}>
          <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
            <Box
              sx={{
                height: 400,
                width: '100%',
                backgroundImage: `url(${getProductImage(product)})`,
                backgroundSize: 'contain',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundColor: '#f8f9fa',
                borderRadius: 2
              }}
            />
          </Paper>
        </Grid>

        {/* Product Details */}
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 3, borderRadius: 2 }}>
            <CardContent>
              {/* Brand and Wishlist */}
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                <Typography variant="h6" color="text.secondary">
                  {product.brand}
                </Typography>
                <IconButton onClick={handleWishlistToggle}>
                  {isInWishlist(product._id) ? (
                    <Favorite sx={{ color: '#fb641b' }} />
                  ) : (
                    <FavoriteBorder />
                  )}
                </IconButton>
              </Box>

              {/* Product Name */}
              <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
                {product.name}
              </Typography>

              {/* Rating */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <Rating value={product.rating} readOnly precision={0.5} />
                <Typography variant="body2" color="text.secondary">
                  ({Math.floor(Math.random() * 100) + 50} reviews)
                </Typography>
                <Chip 
                  icon={<Verified />} 
                  label="Assured" 
                  size="small" 
                  sx={{ bgcolor: '#ffc107', ml: 1 }}
                />
              </Box>

              {/* Price Section */}
              <Box sx={{ mb: 3 }}>
                {discount > 0 && (
                  <Typography variant="body2" sx={{ color: '#00a650', fontWeight: 'bold', mb: 1 }}>
                    Special Price
                  </Typography>
                )}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
                  <Typography variant="h3" component="span" sx={{ fontWeight: 'bold', color: '#2ecc71' }}>
                    {formatPrice(product.price)}
                  </Typography>
                  {discount > 0 && (
                    <>
                      <Typography variant="h6" sx={{ textDecoration: 'line-through', color: '#999' }}>
                        {formatPrice(product.originalPrice)}
                      </Typography>
                      <Chip 
                        label={`${discount}% OFF`} 
                        sx={{ bgcolor: '#ff4444', color: 'white', fontWeight: 'bold' }}
                      />
                    </>
                  )}
                </Box>
                <Typography variant="caption" sx={{ color: '#00a650', display: 'block', mt: 1 }}>
                  inclusive of all taxes
                </Typography>
              </Box>

              {/* Offers */}
              <Paper variant="outlined" sx={{ p: 2, mb: 3, bgcolor: '#f8f9fa' }}>
                <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold' }}>
                  Available Offers
                </Typography>
                <List dense>
                  {product.offers.map((offer, index) => (
                    <ListItem key={index} sx={{ py: 0 }}>
                      <ListItemIcon sx={{ minWidth: 30 }}>
                        <CheckCircle color="success" fontSize="small" />
                      </ListItemIcon>
                      <ListItemText primary={offer} />
                    </ListItem>
                  ))}
                  <ListItem>
                    <ListItemIcon sx={{ minWidth: 30 }}>
                      <LocalShipping color="success" fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="Free Shipping on orders above ₹500" />
                  </ListItem>
                </List>
              </Paper>

              {/* Stock Status */}
              <Box sx={{ mb: 3 }}>
                <Typography variant="body2" sx={{ color: product.inStock ? '#00a650' : '#ff4444', fontWeight: 'bold' }}>
                  {product.inStock ? '✓ In Stock' : '✗ Out of Stock'}
                </Typography>
                {product.inStock && (
                  <Typography variant="caption" color="text.secondary">
                    Only {product.stockQuantity} items left
                  </Typography>
                )}
              </Box>

              {/* Quantity Selector */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                <Typography>Quantity:</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', border: '1px solid #ddd', borderRadius: 1 }}>
                  <Button 
                    size="small" 
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                  >
                    -
                  </Button>
                  <Typography sx={{ px: 2 }}>{quantity}</Typography>
                  <Button 
                    size="small" 
                    onClick={() => handleQuantityChange(1)}
                    disabled={quantity >= product.stockQuantity}
                  >
                    +
                  </Button>
                </Box>
              </Box>

              {/* Action Buttons */}
              <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
                <Button
                  variant="contained"
                  size="large"
                  startIcon={<ShoppingCart />}
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  fullWidth
                  sx={{ 
                    bgcolor: '#fb641b',
                    py: 1.5,
                    '&:hover': { bgcolor: '#f4511e' }
                  }}
                >
                  Add to Cart
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  onClick={handleWishlistToggle}
                  fullWidth
                  sx={{ py: 1.5 }}
                >
                  {isInWishlist(product._id) ? 'Remove from Wishlist' : 'Save for Later'}
                </Button>
              </Stack>

              {/* Features */}
              <Divider sx={{ my: 3 }} />
              
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Security sx={{ fontSize: 40, color: '#666' }} />
                    <Typography variant="caption" display="block">
                      1 Year Warranty
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={4}>
                  <Box sx={{ textAlign: 'center' }}>
                    <LocalShipping sx={{ fontSize: 40, color: '#666' }} />
                    <Typography variant="caption" display="block">
                      Free Shipping
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={4}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Verified sx={{ fontSize: 40, color: '#666' }} />
                    <Typography variant="caption" display="block">
                      100% Authentic
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProductDetail;
