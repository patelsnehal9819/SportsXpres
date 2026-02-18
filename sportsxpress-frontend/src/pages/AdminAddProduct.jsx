import React, { useState } from 'react';
import {
  Container,
  Grid,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Divider,
  InputAdornment,
  IconButton,
  Snackbar,
  FormControlLabel,  // ✅ ADD THIS
  Checkbox,          // ✅ ADD THIS
} from '@mui/material';
import {
  AddPhotoAlternate,
  Save,
  Clear,
  SportsCricket,
  SportsSoccer,
  SportsTennis,
  FitnessCenter,
  SportsBasketball,
  DirectionsRun,
  Checkroom,
  Grass,
  LocalHospital,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

// Remove Alert from imports - it's not used

const AdminAddProduct = () => {
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    name: '',
    brand: '',
    category: '',
    sport: '',
    subCategory: '',
    price: '',
    originalPrice: '',
    discount: '',
    rating: '4.5',
    reviews: '0',
    stock: '100',
    image: '',
    sizes: [],
    colors: [],
    description: '',
    features: [],
    isKit: false,
    kitItems: [],
  });

  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [features, setFeatures] = useState(['']);
  const [kitItems, setKitItems] = useState(['']);
  const [imagePreview, setImagePreview] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  // Sport Categories
  const sports = [
    { id: 'cricket', name: 'Cricket', icon: <SportsCricket />, color: '#4CAF50' },
    { id: 'football', name: 'Football', icon: <SportsSoccer />, color: '#2196F3' },
    { id: 'badminton', name: 'Badminton', icon: <SportsTennis />, color: '#FF9800' },
    { id: 'basketball', name: 'Basketball', icon: <SportsBasketball />, color: '#F44336' },
    { id: 'gym', name: 'Gym', icon: <FitnessCenter />, color: '#9C27B0' },
    { id: 'running', name: 'Running', icon: <DirectionsRun />, color: '#00BCD4' },
  ];

  // Main Categories
  const mainCategories = [
    { id: 'shoes', name: 'Shoes', icon: <Grass /> },
    { id: 'jersey', name: 'Jersey', icon: <Checkroom /> },
    { id: 'medical', name: 'Medical Kit', icon: <LocalHospital /> },
    { id: 'bat', name: 'Bat' },
    { id: 'ball', name: 'Ball' },
    { id: 'racket', name: 'Racket' },
    { id: 'gloves', name: 'Gloves' },
    { id: 'pads', name: 'Pads' },
    { id: 'helmet', name: 'Helmet' },
    { id: 'accessories', name: 'Accessories' },
  ];

  // Size options based on category
  const sizeOptions = {
    shoes: ['UK 5', 'UK 6', 'UK 7', 'UK 8', 'UK 9', 'UK 10', 'UK 11', 'UK 12'],
    jersey: ['S', 'M', 'L', 'XL', 'XXL'],
    gloves: ['S', 'M', 'L', 'XL'],
    bat: ['Size 4', 'Size 5', 'Size 6', 'Short Handle', 'Long Handle'],
    helmet: ['S', 'M', 'L', 'XL'],
    pads: ['S', 'M', 'L', 'XL'],
  };

  // Color options
  const colorOptions = ['Red', 'Blue', 'Green', 'Black', 'White', 'Yellow', 'Orange', 'Purple', 'Pink', 'Grey'];

  // Brand options
  const brandOptions = {
    cricket: ['SG', 'SS', 'Kookaburra', 'Gray-Nicolls', 'CEAT', 'MRF', 'BAS'],
    football: ['Nike', 'Adidas', 'Puma', 'Select', 'Mitre'],
    badminton: ['Yonex', 'Li-Ning', 'Victor', 'Carlton', 'Apacs'],
    basketball: ['Nike', 'Spalding', 'Wilson', 'Molten'],
    gym: ['Nike', 'Adidas', 'Reebok', 'Under Armour', 'Decathlon'],
    running: ['Nike', 'Adidas', 'Puma', 'Asics', 'New Balance', 'Brooks'],
  };

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
    
    // Auto-calculate discount
    if (e.target.name === 'price' || e.target.name === 'originalPrice') {
      const price = parseFloat(e.target.name === 'price' ? e.target.value : product.price);
      const originalPrice = parseFloat(e.target.name === 'originalPrice' ? e.target.value : product.originalPrice);
      if (price && originalPrice && originalPrice > price) {
        const discount = Math.round(((originalPrice - price) / originalPrice) * 100);
        setProduct(prev => ({ ...prev, discount }));
      }
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setProduct({ ...product, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddFeature = () => {
    setFeatures([...features, '']);
  };

  const handleFeatureChange = (index, value) => {
    const newFeatures = [...features];
    newFeatures[index] = value;
    setFeatures(newFeatures);
    setProduct({ ...product, features: newFeatures.filter(f => f.trim() !== '') });
  };

  const handleRemoveFeature = (index) => {
    const newFeatures = features.filter((_, i) => i !== index);
    setFeatures(newFeatures);
    setProduct({ ...product, features: newFeatures.filter(f => f.trim() !== '') });
  };

  const handleAddKitItem = () => {
    setKitItems([...kitItems, '']);
  };

  const handleKitItemChange = (index, value) => {
    const newKitItems = [...kitItems];
    newKitItems[index] = value;
    setKitItems(newKitItems);
    setProduct({ ...product, kitItems: newKitItems.filter(i => i.trim() !== '') });
  };

  const handleRemoveKitItem = (index) => {
    const newKitItems = kitItems.filter((_, i) => i !== index);
    setKitItems(newKitItems);
    setProduct({ ...product, kitItems: newKitItems.filter(i => i.trim() !== '') });
  };

  const handleSubmit = () => {
    // Validate required fields
    if (!product.name || !product.brand || !product.category || !product.sport || !product.price) {
      toast.error('Please fill all required fields');
      return;
    }

    // Generate unique ID
    const productId = `${product.sport}-${product.category}-${Date.now()}`;
    
    // Create product object
    const newProduct = {
      ...product,
      id: productId,
      _id: productId,
      sizes: selectedSizes,
      colors: selectedColors,
      price: parseFloat(product.price),
      originalPrice: parseFloat(product.originalPrice) || parseFloat(product.price),
      discount: product.discount || 0,
      rating: parseFloat(product.rating),
      reviews: parseInt(product.reviews),
      stock: parseInt(product.stock),
      createdAt: new Date().toISOString(),
    };

    // Get existing products from localStorage
    const existingProducts = JSON.parse(localStorage.getItem('sportsxpress_products') || '[]');
    
    // Add new product
    existingProducts.push(newProduct);
    
    // Save to localStorage
    localStorage.setItem('sportsxpress_products', JSON.stringify(existingProducts));
    
    // Also add to specific sport category
    const sportProducts = JSON.parse(localStorage.getItem(`sportsxpress_${product.sport}_products`) || '[]');
    sportProducts.push(newProduct);
    localStorage.setItem(`sportsxpress_${product.sport}_products`, JSON.stringify(sportProducts));

    toast.success('Product added successfully!');
    setOpenSnackbar(true);
    
    // Reset form
    setTimeout(() => {
      navigate(`/sport/${product.sport}`);
    }, 2000);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Add New Product
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
          Add products to specific sports categories with complete details
        </Typography>

        <Divider sx={{ mb: 4 }} />

        <Grid container spacing={3}>
          {/* Sport Selection */}
          <Grid item xs={12}>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              Select Sport Category *
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 2 }}>
              {sports.map((sport) => (
                <Chip
                  key={sport.id}
                  icon={sport.icon}
                  label={sport.name}
                  onClick={() => setProduct({ ...product, sport: sport.id })}
                  color={product.sport === sport.id ? 'primary' : 'default'}
                  sx={{
                    py: 2.5,
                    px: 1,
                    '& .MuiChip-icon': { color: product.sport === sport.id ? 'white' : sport.color }
                  }}
                />
              ))}
            </Box>
          </Grid>

          {/* Main Category */}
          <Grid item xs={12} md={6}>
            <FormControl fullWidth required>
              <InputLabel>Product Category *</InputLabel>
              <Select
                name="category"
                value={product.category}
                label="Product Category *"
                onChange={handleChange}
              >
                {mainCategories.map((cat) => (
                  <MenuItem key={cat.id} value={cat.id}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      {cat.icon && <Box sx={{ mr: 1 }}>{cat.icon}</Box>}
                      {cat.name}
                    </Box>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* Sub Category */}
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Sub Category (Optional)"
              name="subCategory"
              value={product.subCategory}
              onChange={handleChange}
              placeholder="e.g., Running Shoes, Cricket Bat, Football Jersey"
            />
          </Grid>

          {/* Product Name */}
          <Grid item xs={12} md={8}>
            <TextField
              fullWidth
              label="Product Name *"
              name="name"
              value={product.name}
              onChange={handleChange}
              required
            />
          </Grid>

          {/* Brand */}
          <Grid item xs={12} md={4}>
            <FormControl fullWidth required>
              <InputLabel>Brand *</InputLabel>
              <Select
                name="brand"
                value={product.brand}
                label="Brand *"
                onChange={handleChange}
              >
                {product.sport && brandOptions[product.sport]?.map((brand) => (
                  <MenuItem key={brand} value={brand}>{brand}</MenuItem>
                ))}
                <MenuItem value="Other">Other</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* Pricing */}
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Price (₹) *"
              name="price"
              type="number"
              value={product.price}
              onChange={handleChange}
              InputProps={{
                startAdornment: <InputAdornment position="start">₹</InputAdornment>,
              }}
              required
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Original Price (₹)"
              name="originalPrice"
              type="number"
              value={product.originalPrice}
              onChange={handleChange}
              InputProps={{
                startAdornment: <InputAdornment position="start">₹</InputAdornment>,
              }}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Discount %"
              name="discount"
              type="number"
              value={product.discount}
              onChange={handleChange}
              InputProps={{
                endAdornment: <InputAdornment position="end">%</InputAdornment>,
              }}
              disabled
            />
          </Grid>

          {/* Stock & Rating */}
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Stock Quantity"
              name="stock"
              type="number"
              value={product.stock}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Rating (0-5)"
              name="rating"
              type="number"
              value={product.rating}
              onChange={handleChange}
              inputProps={{ min: 0, max: 5, step: 0.1 }}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Reviews Count"
              name="reviews"
              type="number"
              value={product.reviews}
              onChange={handleChange}
            />
          </Grid>

          {/* Sizes */}
          {product.category && sizeOptions[product.category] && (
            <Grid item xs={12}>
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                Available Sizes
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                {sizeOptions[product.category].map((size) => (
                  <Chip
                    key={size}
                    label={size}
                    onClick={() => {
                      const newSizes = selectedSizes.includes(size)
                        ? selectedSizes.filter(s => s !== size)
                        : [...selectedSizes, size];
                      setSelectedSizes(newSizes);
                      setProduct({ ...product, sizes: newSizes });
                    }}
                    color={selectedSizes.includes(size) ? 'primary' : 'default'}
                    variant={selectedSizes.includes(size) ? 'filled' : 'outlined'}
                  />
                ))}
              </Box>
            </Grid>
          )}

          {/* Colors */}
          <Grid item xs={12}>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              Available Colors
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              {colorOptions.map((color) => (
                <Chip
                  key={color}
                  label={color}
                  onClick={() => {
                    const newColors = selectedColors.includes(color)
                      ? selectedColors.filter(c => c !== color)
                      : [...selectedColors, color];
                    setSelectedColors(newColors);
                    setProduct({ ...product, colors: newColors });
                  }}
                  color={selectedColors.includes(color) ? 'primary' : 'default'}
                  variant={selectedColors.includes(color) ? 'filled' : 'outlined'}
                  sx={{
                    bgcolor: selectedColors.includes(color) 
                      ? 'primary.main' 
                      : color.toLowerCase(),
                    color: selectedColors.includes(color) 
                      ? 'white' 
                      : ['Black', 'Blue', 'Green', 'Purple'].includes(color) 
                        ? 'white' 
                        : 'black',
                  }}
                />
              ))}
            </Box>
          </Grid>

          {/* Product Image */}
          <Grid item xs={12}>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              Product Image
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Button
                variant="outlined"
                component="label"
                startIcon={<AddPhotoAlternate />}
              >
                Upload Image
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={handleImageUpload}
                />
              </Button>
              {imagePreview && (
                <Box sx={{ position: 'relative' }}>
                  <img src={imagePreview} alt="Preview" style={{ width: 100, height: 100, objectFit: 'cover', borderRadius: 8 }} />
                  <IconButton
                    size="small"
                    sx={{ position: 'absolute', top: -8, right: -8, bgcolor: 'white' }}
                    onClick={() => {
                      setImagePreview('');
                      setProduct({ ...product, image: '' });
                    }}
                  >
                    <Clear />
                  </IconButton>
                </Box>
              )}
            </Box>
          </Grid>

          {/* Description */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Product Description"
              name="description"
              value={product.description}
              onChange={handleChange}
              multiline
              rows={4}
            />
          </Grid>

          {/* Features */}
          <Grid item xs={12}>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              Key Features
            </Typography>
            {features.map((feature, index) => (
              <Box key={index} sx={{ display: 'flex', gap: 1, mb: 1 }}>
                <TextField
                  fullWidth
                  size="small"
                  placeholder={`Feature ${index + 1}`}
                  value={feature}
                  onChange={(e) => handleFeatureChange(index, e.target.value)}
                />
                <IconButton onClick={() => handleRemoveFeature(index)} color="error">
                  <Clear />
                </IconButton>
              </Box>
            ))}
            <Button variant="text" onClick={handleAddFeature} sx={{ mt: 1 }}>
              + Add Feature
            </Button>
          </Grid>

          {/* Kit Builder (for starter kits) */}
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={product.isKit}
                  onChange={(e) => setProduct({ ...product, isKit: e.target.checked })}
                />
              }
              label="This is a Starter Kit"
            />
          </Grid>

          {product.isKit && (
            <Grid item xs={12}>
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                Kit Items
              </Typography>
              {kitItems.map((item, index) => (
                <Box key={index} sx={{ display: 'flex', gap: 1, mb: 1 }}>
                  <TextField
                    fullWidth
                    size="small"
                    placeholder={`Item ${index + 1}`}
                    value={item}
                    onChange={(e) => handleKitItemChange(index, e.target.value)}
                  />
                  <IconButton onClick={() => handleRemoveKitItem(index)} color="error">
                    <Clear />
                  </IconButton>
                </Box>
              ))}
              <Button variant="text" onClick={handleAddKitItem} sx={{ mt: 1 }}>
                + Add Kit Item
              </Button>
            </Grid>
          )}

          {/* Submit Buttons */}
          <Grid item xs={12}>
            <Divider sx={{ my: 2 }} />
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
              <Button
                variant="outlined"
                onClick={() => navigate(-1)}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                onClick={handleSubmit}
                startIcon={<Save />}
                sx={{ bgcolor: '#fb641b', '&:hover': { bgcolor: '#f4511e' } }}
              >
                Add Product
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        message="Product added successfully! Redirecting..."
      />
    </Container>
  );
};

export default AdminAddProduct;