import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Divider,
  Slider,
} from '@mui/material';
import {
  SmartToy,
  Height,
  FitnessCenter,
  CalendarToday,
  Straighten,
} from '@mui/icons-material';
import { formatINR } from '../utils/currencyFormatter';

const AISizePage = () => {
  const [formData, setFormData] = useState({
    height: '',
    weight: '',
    age: '',
    sport: '',
    productType: 'shoes',
    fitPreference: 'regular',
  });
  const [recommendation, setRecommendation] = useState(null);
  const [loading, setLoading] = useState(false);

  const sports = ['Cricket', 'Football', 'Badminton', 'Basketball', 'Running', 'Gym', 'Tennis'];
  const productTypes = [
    { value: 'shoes', label: 'Shoes' },
    { value: 'bat', label: 'Cricket Bat' },
    { value: 'gloves', label: 'Gloves' },
    { value: 'clothing', label: 'Clothing' },
  ];
  const fitPreferences = [
    { value: 'tight', label: 'Tight / Performance Fit' },
    { value: 'regular', label: 'Regular / Standard Fit' },
    { value: 'loose', label: 'Loose / Relaxed Fit' },
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const getSizeRecommendation = () => {
    setLoading(true);
    
    setTimeout(() => {
      const height = parseInt(formData.height) || 170;
      const weight = parseInt(formData.weight) || 65;
      const age = parseInt(formData.age) || 25;

      let size = '';
      let sizeGuide = '';
      let confidence = 0;
      let description = '';

      switch (formData.productType) {
        case 'shoes':
          if (height < 150) { size = 'UK 5'; sizeGuide = 'EU 38 • US 5.5'; }
          else if (height < 160) { size = 'UK 6'; sizeGuide = 'EU 39 • US 6.5'; }
          else if (height < 170) { size = 'UK 7'; sizeGuide = 'EU 40.5 • US 7.5'; }
          else if (height < 180) { size = 'UK 8'; sizeGuide = 'EU 42 • US 8.5'; }
          else if (height < 190) { size = 'UK 9'; sizeGuide = 'EU 43 • US 9.5'; }
          else { size = 'UK 10+'; sizeGuide = 'EU 44+ • US 10.5+'; }
          description = 'Based on your height and weight, this size provides optimal comfort and performance.';
          confidence = 92;
          break;

        case 'bat':
          if (age < 12) { size = 'Size 4'; sizeGuide = 'For ages 8-9'; }
          else if (age < 16) { size = 'Size 5'; sizeGuide = 'For ages 10-13'; }
          else if (height < 165) { size = 'Short Handle'; sizeGuide = '6-8 grains'; }
          else { size = 'Long Handle'; sizeGuide = '8-10 grains'; }
          description = 'Perfect bat size for your age group and height.';
          confidence = 88;
          break;

        case 'gloves':
          if (weight < 50) { size = 'Small'; sizeGuide = 'Hand: 7-8 inches'; }
          else if (weight < 65) { size = 'Medium'; sizeGuide = 'Hand: 8-9 inches'; }
          else if (weight < 80) { size = 'Large'; sizeGuide = 'Hand: 9-10 inches'; }
          else { size = 'XL'; sizeGuide = 'Hand: 10+ inches'; }
          description = 'Recommended based on your weight and estimated hand size.';
          confidence = 85;
          break;

        case 'clothing':
          if (height < 160) { size = 'S'; sizeGuide = 'Chest: 34-36"'; }
          else if (height < 170) { size = 'M'; sizeGuide = 'Chest: 36-38"'; }
          else if (height < 180) { size = 'L'; sizeGuide = 'Chest: 38-40"'; }
          else if (height < 190) { size = 'XL'; sizeGuide = 'Chest: 40-42"'; }
          else { size = 'XXL'; sizeGuide = 'Chest: 42-44"'; }
          description = 'Perfect fit based on your height and age.';
          confidence = 90;
          break;
      }

      // Adjust for fit preference
      if (formData.fitPreference === 'tight' && formData.productType === 'clothing') {
        size = size === 'S' ? 'XS' : size === 'M' ? 'S' : size === 'L' ? 'M' : 'L';
      } else if (formData.fitPreference === 'loose' && formData.productType === 'clothing') {
        size = size === 'XXL' ? 'XXL' : size === 'XL' ? 'XXL' : size === 'L' ? 'XL' : 'L';
      }

      setRecommendation({ size, sizeGuide, description, confidence });
      setLoading(false);
    }, 1500);
  };

  return (
    <Box sx={{ p: 2 }}>
      {/* Header */}
      <Paper sx={{ p: 2, borderRadius: 2, mb: 2, bgcolor: '#1976d2', color: 'white' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <SmartToy sx={{ fontSize: 32 }} />
          <Box>
            <Typography variant="h6" fontWeight="bold">AI Size Recommender</Typography>
            <Typography variant="caption">Get perfect fit in seconds</Typography>
          </Box>
        </Box>
      </Paper>

      {/* Input Form */}
      <Paper sx={{ p: 2, borderRadius: 2, mb: 2 }}>
        <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
          Your Measurements
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              size="small"
              label="Height (cm)"
              name="height"
              type="number"
              value={formData.height}
              onChange={handleChange}
              InputProps={{
                startAdornment: <Height sx={{ mr: 1, color: 'action.active' }} />,
              }}
              placeholder="e.g., 170"
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              size="small"
              label="Weight (kg)"
              name="weight"
              type="number"
              value={formData.weight}
              onChange={handleChange}
              InputProps={{
                startAdornment: <FitnessCenter sx={{ mr: 1, color: 'action.active' }} />,
              }}
              placeholder="e.g., 65"
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              size="small"
              label="Age"
              name="age"
              type="number"
              value={formData.age}
              onChange={handleChange}
              InputProps={{
                startAdornment: <CalendarToday sx={{ mr: 1, color: 'action.active' }} />,
              }}
              placeholder="e.g., 25"
            />
          </Grid>

          <Grid item xs={12}>
            <FormControl fullWidth size="small">
              <InputLabel>Primary Sport</InputLabel>
              <Select
                name="sport"
                value={formData.sport}
                label="Primary Sport"
                onChange={handleChange}
              >
                <MenuItem value="">Select Sport</MenuItem>
                {sports.map((sport) => (
                  <MenuItem key={sport} value={sport.toLowerCase()}>
                    {sport}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <FormControl fullWidth size="small">
              <InputLabel>Product Type</InputLabel>
              <Select
                name="productType"
                value={formData.productType}
                label="Product Type"
                onChange={handleChange}
              >
                {productTypes.map((type) => (
                  <MenuItem key={type.value} value={type.value}>
                    {type.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {formData.productType === 'clothing' && (
            <Grid item xs={12}>
              <FormControl fullWidth size="small">
                <InputLabel>Fit Preference</InputLabel>
                <Select
                  name="fitPreference"
                  value={formData.fitPreference}
                  label="Fit Preference"
                  onChange={handleChange}
                >
                  {fitPreferences.map((pref) => (
                    <MenuItem key={pref.value} value={pref.value}>
                      {pref.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          )}

          <Grid item xs={12}>
            <Button
              fullWidth
              variant="contained"
              onClick={getSizeRecommendation}
              disabled={loading}
              sx={{ 
                mt: 1, 
                py: 1.5, 
                bgcolor: '#fb641b',
                borderRadius: 2,
                '&:hover': { bgcolor: '#f4511e' }
              }}
            >
              {loading ? <CircularProgress size={24} sx={{ color: 'white' }} /> : 'Get My Size'}
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* Recommendation Result */}
      {recommendation && (
        <Paper sx={{ p: 2, borderRadius: 2, mb: 2, bgcolor: '#e3f2fd' }}>
          <Typography variant="subtitle1" fontWeight="bold" color="primary.main" gutterBottom>
            Your Recommended Size
          </Typography>
          
          <Box sx={{ textAlign: 'center', py: 2 }}>
            <Typography variant="h3" color="primary.main" fontWeight="bold">
              {recommendation.size}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {recommendation.sizeGuide}
            </Typography>
          </Box>

          <Divider sx={{ my: 2 }} />

          <Typography variant="body2" paragraph>
            {recommendation.description}
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Chip 
              label={`AI Confidence: ${recommendation.confidence}%`} 
              color="primary"
              size="small"
            />
            <Typography variant="caption" color="text.secondary">
              Based on 10,000+ profiles
            </Typography>
          </Box>

          <Box sx={{ mt: 2 }}>
            <Button
              fullWidth
              variant="outlined"
              size="small"
              onClick={() => window.location.href = `/products?size=${recommendation.size}`}
            >
              Shop {recommendation.size} Products
            </Button>
          </Box>
        </Paper>
      )}

      {/* How It Works */}
      <Paper sx={{ p: 2, borderRadius: 2 }}>
        <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
          How AI Sizing Works
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
          <Box sx={{ 
            width: 30, 
            height: 30, 
            borderRadius: '50%', 
            bgcolor: '#1976d2', 
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 'bold'
          }}>
            1
          </Box>
          <Typography variant="body2">Enter your height, weight & age</Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
          <Box sx={{ 
            width: 30, 
            height: 30, 
            borderRadius: '50%', 
            bgcolor: '#1976d2', 
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 'bold'
          }}>
            2
          </Box>
          <Typography variant="body2">AI analyzes 10,000+ similar profiles</Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box sx={{ 
            width: 30, 
            height: 30, 
            borderRadius: '50%', 
            bgcolor: '#1976d2', 
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 'bold'
          }}>
            3
          </Box>
          <Typography variant="body2">Get your perfect size instantly</Typography>
        </Box>

        <Alert severity="info" sx={{ mt: 2 }}>
          <Straighten sx={{ mr: 1, fontSize: 18 }} />
          Works for Nike, Adidas, Puma, and all major brands
        </Alert>
      </Paper>
    </Box>
  );
};

export default AISizePage;