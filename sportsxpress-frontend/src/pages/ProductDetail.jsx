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
  Remove,
  Add,
} from '@mui/icons-material';
import { useParams, useNavigate, Link as RouterLink } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { productImages, DEFAULT_IMAGE } from '../utils/productImages'; // ✅ Import shared images
import toast from 'react-hot-toast';

const BASE_URL = 'https://solid-fishstick-7v74445764vj3pjgx-5000.app.github.dev';

// Format price in Indian Rupees
const formatPrice = (price) => {
  if (price === undefined || price === null) return '₹0';
  return `₹${price.toLocaleString('en-IN')}`;
};

const ProductDetail = () => {
  const { id } = useParams();
  console.log('📌 Product ID from URL:', id);
  
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
      console.log('📌 API URL:', `${BASE_URL}/api/products/${id}`);
      
      const response = await fetch(`${BASE_URL}/api/products/${id}`);
      console.log('📡 Response status:', response.status);
      
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Product not found');
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('📦 Product API Response:', data);
      
      // Handle different response structures
      let productData = null;
      
      if (data.success && data.data) {
        productData = data.data;
      }
      else if (data.data) {
        productData = data.data;
      }
      else if (data.product) {
        productData = data.product;
      }
      else if (data._id) {
        productData = data;
      }
      else if (Array.isArray(data) && data.length > 0) {
        productData = data[0];
      }
      
      if (productData) {
        // ✅ CRITICAL: Get image from shared productImages mapping
        const productImage = productImages[productData.name] || DEFAULT_IMAGE;
        
        console.log('🖼️ Product name:', productData.name);
        console.log('🖼️ Found image:', productImage);
        
        // Check stock status
        const hasStock = productData.inStock !== false;
        const stockQty = productData.stockQuantity || 10;
        
        // Map the product data
        const mappedProduct = {
          _id: productData._id || id,
          name: productData.name || 'Product Name',
          brand: productData.brand || 'SportsXpress',
          price: productData.discountedPrice || productData.price || 0,
          originalPrice: productData.originalPrice || productData.mrp || productData.price || 0,
          discountPercentage: productData.discountPercentage || 
            (productData.originalPrice && productData.price ? 
              Math.round(((productData.originalPrice - productData.price) / productData.originalPrice) * 100) : 0),
          rating: productData.rating || 4.5,
          category: productData.category || 'general',
          description: productData.description || 'No description available',
          image: productImage, // ✅ Use image from shared mapping
          inStock: hasStock,
          stockQuantity: stockQty,
          offers: productData.offers || ['Special offer available'],
          features: productData.features || [
            'Premium quality',
            'Official sports equipment',
            '1 year warranty',
            'Free shipping'
          ]
        };
        
        setProduct(mappedProduct);
        console.log('✅ Product loaded:', mappedProduct.name);
      } else {
        console.error('❌ No product data found');
        setError('Product not found');
      }
    } catch (error) {
      console.error('❌ Error fetching product:', error);
      setError(error.message || 'Failed to load product details');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    if (!product) return;
    
    const cartItem = {
      _id: product._id,
      name: product.name,
      brand: product.brand,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.image,
      quantity: quantity
    };
    
    addToCart(cartItem);
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
        <Alert severity="error">{error || 'Product not found'}</Alert>
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Button variant="contained" onClick={() => navigate('/products')} sx={{ bgcolor: '#fb641b' }}>
            Browse Products
          </Button>
        </Box>
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
      <Button startIcon={<ArrowBack />} onClick={() => navigate(-1)} sx={{ mb: 3 }}>
        Back
      </Button>

      <Grid container spacing={4}>
        {/* Product Image - THIS IS WHERE THE IMAGE SHOULD APPEAR */}
        <Grid item xs={12} md={6}>
          <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
            <Box
              sx={{
                height: 400,
                width: '100%',
                backgroundImage: `url(${product.image})`,
                backgroundSize: 'contain',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundColor: '#f8f9fa',
                borderRadius: 2,
                border: '1px solid #eee'
              }}
            />
            {/* Debug info - remove after fixing */}
            <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
              Image URL: {product.image}
            </Typography>
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
                  {isInWishlist(product._id) ? <Favorite sx={{ color: '#fb641b' }} /> : <FavoriteBorder />}
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
                <Chip icon={<Verified />} label="Assured" size="small" sx={{ bgcolor: '#ffc107' }} />
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
                      <Chip label={`${discount}% OFF`} sx={{ bgcolor: '#ff4444', color: 'white', fontWeight: 'bold' }} />
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
              </Box>

              {/* Quantity Selector */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                <Typography>Quantity:</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', border: '1px solid #ddd', borderRadius: 1 }}>
                  <IconButton size="small" onClick={() => handleQuantityChange(-1)} disabled={quantity <= 1}>
                    <Remove />
                  </IconButton>
                  <Typography sx={{ px: 2 }}>{quantity}</Typography>
                  <IconButton size="small" onClick={() => handleQuantityChange(1)} disabled={quantity >= product.stockQuantity}>
                    <Add />
                  </IconButton>
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
                  sx={{ bgcolor: '#fb641b', '&:hover': { bgcolor: '#f4511e' } }}
                >
                  Add to Cart
                </Button>
                <Button variant="outlined" size="large" onClick={handleWishlistToggle} fullWidth>
                  {isInWishlist(product._id) ? 'Remove from Wishlist' : 'Save for Later'}
                </Button>
              </Stack>

              {/* Features */}
              <Divider sx={{ my: 3 }} />
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Security sx={{ fontSize: 40, color: '#666' }} />
                    <Typography variant="caption" display="block">1 Year Warranty</Typography>
                  </Box>
                </Grid>
                <Grid item xs={4}>
                  <Box sx={{ textAlign: 'center' }}>
                    <LocalShipping sx={{ fontSize: 40, color: '#666' }} />
                    <Typography variant="caption" display="block">Free Shipping</Typography>
                  </Box>
                </Grid>
                <Grid item xs={4}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Verified sx={{ fontSize: 40, color: '#666' }} />
                    <Typography variant="caption" display="block">100% Authentic</Typography>
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