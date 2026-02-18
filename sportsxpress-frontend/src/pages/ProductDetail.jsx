import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  Rating,
  Chip,
  Divider,
  IconButton,
  TextField,
  Alert,
  Snackbar,
  Tab,
  Tabs,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from '@mui/material';
import {
  ShoppingCart,
  Favorite,
  FavoriteBorder,
  Share,
  LocalShipping,
  Security,
  Remove,
  Add,
  WhatsApp,
  Facebook,
  Twitter,
  Verified,
  Straighten,
} from '@mui/icons-material';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { formatINR } from '../utils/currencyFormatter';
import toast from 'react-hot-toast';
import ImageGallery from '../components/common/ImageGallery';
import SizeChart from '../components/common/SizeChart';
import Reviews from '../components/common/Reviews';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState(0);
  const [pincode, setPincode] = useState('');
  const [deliveryStatus, setDeliveryStatus] = useState(null);
  const [openSizeChart, setOpenSizeChart] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    const allProducts = JSON.parse(localStorage.getItem('sportsxpress_products') || '[]');
    const foundProduct = allProducts.find(p => p.id === id);
    
    if (foundProduct) {
      setProduct(foundProduct);
      if (foundProduct.colors?.length) setSelectedColor(foundProduct.colors[0]);
    }
    setLoading(false);
  }, [id]);

  const handleAddToCart = () => {
    if (product.sizes?.length && !selectedSize) {
      toast.error('Please select a size');
      return;
    }
    
    addToCart({ ...product, selectedSize, selectedColor, quantity });
    toast.success(`${product.name} added to cart!`);
    setOpenSnackbar(true);
  };

  const handleWishlist = () => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
      toast.success('Removed from wishlist');
    } else {
      addToWishlist(product);
      toast.success('Added to wishlist');
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: product.description,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Share cancelled');
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard!');
    }
  };

  const checkDelivery = () => {
    if (pincode.length === 6) {
      const available = ['110001', '400001', '700001', '500001', '600001'].includes(pincode);
      setDeliveryStatus(available);
      if (available) {
        toast.success('Delivery available in 2-3 days');
      } else {
        toast.error('Sorry, delivery not available at this pincode');
      }
    }
  };

  if (loading) {
    return (
      <Box sx={{ p: 2, textAlign: 'center', pt: 8 }}>
        <Typography>Loading product details...</Typography>
      </Box>
    );
  }

  if (!product) {
    return (
      <Box sx={{ p: 2, textAlign: 'center', pt: 8 }}>
        <Typography variant="h6">Product not found</Typography>
        <Button 
          variant="contained" 
          onClick={() => navigate('/products')}
          sx={{ mt: 2, bgcolor: '#fb641b', borderRadius: 2 }}
        >
          Browse Products
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 2, pb: 4 }}>
      {/* Image Gallery */}
      <ImageGallery images={[product.image || 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80']} />

      {/* Product Info */}
      <Paper sx={{ p: 2, borderRadius: 2, mt: 2 }}>
        <Typography variant="caption" color="text.secondary">
          {product.brand}
        </Typography>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          {product.name}
        </Typography>

        {/* Ratings */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Rating value={product.rating || 4.5} precision={0.5} readOnly size="small" />
          <Typography variant="caption" sx={{ ml: 1 }}>
            ({product.reviews || 0} reviews)
          </Typography>
          <Chip 
            icon={<Verified />}
            label="Assured"
            size="small"
            color="primary"
            sx={{ ml: 2, height: 20 }}
          />
        </Box>

        {/* Price */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
          <Typography variant="h5" color="primary.main" fontWeight="bold">
            {formatINR(product.price)}
          </Typography>
          {product.originalPrice > product.price && (
            <>
              <Typography variant="body2" sx={{ textDecoration: 'line-through', color: 'text.secondary' }}>
                {formatINR(product.originalPrice)}
              </Typography>
              <Chip 
                label={`${product.discount}% off`}
                color="success"
                size="small"
                sx={{ height: 20 }}
              />
            </>
          )}
        </Box>

        {/* Size Selection */}
        {product.sizes?.length > 0 && (
          <Box sx={{ mb: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
              <Typography variant="subtitle2" fontWeight="bold">
                Select Size
              </Typography>
              <Button 
                size="small"
                onClick={() => setOpenSizeChart(true)}
                startIcon={<Straighten />}
              >
                Size Chart
              </Button>
            </Box>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              {product.sizes.map((size) => (
                <Chip
                  key={size}
                  label={size}
                  onClick={() => setSelectedSize(size)}
                  color={selectedSize === size ? 'primary' : 'default'}
                  variant={selectedSize === size ? 'filled' : 'outlined'}
                  sx={{ minWidth: 50 }}
                />
              ))}
            </Box>
          </Box>
        )}

        {/* Quantity */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Typography variant="subtitle2" fontWeight="bold">
            Quantity
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton 
              size="small" 
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              sx={{ border: '1px solid #ddd', borderRadius: 1 }}
            >
              <Remove fontSize="small" />
            </IconButton>
            <TextField
              size="small"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
              sx={{ width: 50, mx: 1 }}
              inputProps={{ style: { textAlign: 'center' } }}
            />
            <IconButton 
              size="small" 
              onClick={() => setQuantity(quantity + 1)}
              sx={{ border: '1px solid #ddd', borderRadius: 1 }}
            >
              <Add fontSize="small" />
            </IconButton>
          </Box>
        </Box>

        {/* Action Buttons */}
        <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
          <Button
            fullWidth
            variant="contained"
            startIcon={<ShoppingCart />}
            onClick={handleAddToCart}
            sx={{ bgcolor: '#fb641b', borderRadius: 2, py: 1 }}
          >
            Add to Cart
          </Button>
          <Button
            variant="outlined"
            onClick={handleWishlist}
            sx={{ minWidth: 48, borderRadius: 2 }}
          >
            {isInWishlist(product.id) ? <Favorite sx={{ color: '#fb641b' }} /> : <FavoriteBorder />}
          </Button>
          <Button
            variant="outlined"
            onClick={handleShare}
            sx={{ minWidth: 48, borderRadius: 2 }}
          >
            <Share />
          </Button>
        </Box>

        {/* Delivery Check */}
        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
            Check Delivery
          </Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <TextField
              size="small"
              placeholder="Enter Pincode"
              value={pincode}
              onChange={(e) => setPincode(e.target.value.replace(/\D/g, '').slice(0, 6))}
              sx={{ flex: 1 }}
            />
            <Button 
              variant="outlined" 
              onClick={checkDelivery}
              disabled={pincode.length !== 6}
              sx={{ borderRadius: 2 }}
            >
              Check
            </Button>
          </Box>
          {deliveryStatus !== null && (
            <Alert severity={deliveryStatus ? 'success' : 'error'} sx={{ mt: 1, py: 0 }}>
              {deliveryStatus ? '✓ Delivery available' : '✗ Not available'}
            </Alert>
          )}
        </Box>

        {/* Delivery Info */}
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <LocalShipping sx={{ fontSize: 16, color: 'success.main', mr: 0.5 }} />
            <Typography variant="caption">Free Delivery</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Security sx={{ fontSize: 16, color: 'success.main', mr: 0.5 }} />
            <Typography variant="caption">Secure Payment</Typography>
          </Box>
        </Box>
      </Paper>

      {/* Tabs */}
      <Paper sx={{ mt: 2, borderRadius: 2, overflow: 'hidden' }}>
        <Tabs value={activeTab} onChange={(e, v) => setActiveTab(v)} variant="fullWidth">
          <Tab label="Description" />
          <Tab label="Specs" />
          <Tab label={`Reviews (${product.reviews || 0})`} />
        </Tabs>
        <Box sx={{ p: 2 }}>
          {activeTab === 0 && (
            <Typography variant="body2">
              {product.description || 'No description available.'}
            </Typography>
          )}
          {activeTab === 1 && (
            <Box>
              <Typography variant="body2"><strong>Brand:</strong> {product.brand}</Typography>
              <Typography variant="body2"><strong>Category:</strong> {product.category}</Typography>
              <Typography variant="body2"><strong>Sport:</strong> {product.sport}</Typography>
            </Box>
          )}
          {activeTab === 2 && (
            <Reviews productId={product.id} />
          )}
        </Box>
      </Paper>

      {/* Size Chart Modal */}
      <SizeChart 
        open={openSizeChart} 
        onClose={() => setOpenSizeChart(false)} 
        category={product.category}
      />

      {/* Snackbar */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        message="Item added to cart!"
      />
    </Box>
  );
};

export default ProductDetail;