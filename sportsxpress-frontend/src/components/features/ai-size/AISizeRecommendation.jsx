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
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Divider,
} from '@mui/material';
import {
  SmartToy,
  Height,
  FitnessCenter,
  CalendarToday,
} from '@mui/icons-material';
import { formatINR } from '../../../utils/currencyFormatter';

const AISizeRecommendation = () => {
  const [formData, setFormData] = useState({
    height: '',
    weight: '',
    age: '',
    sport: '',
    productType: 'shoes',
  });
  const [recommendation, setRecommendation] = useState(null);
  const [loading, setLoading] = useState(false);

  const sports = ['Cricket', 'Football', 'Badminton', 'Basketball', 'Running', 'Gym'];
  const productTypes = [
    { value: 'shoes', label: 'Shoes' },
    { value: 'bat', label: 'Cricket Bat' },
    { value: 'gloves', label: 'Gloves' },
    { value: 'clothing', label: 'Clothing' },
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
      let priceRange = '';

      switch (formData.productType) {
        case 'shoes':
          if (height < 150) { size = 'UK 5'; priceRange = '₹1,999 - ₹3,999'; }
          else if (height < 160) { size = 'UK 6'; priceRange = '₹2,299 - ₹4,499'; }
          else if (height < 170) { size = 'UK 7'; priceRange = '₹2,499 - ₹4,999'; }
          else if (height < 180) { size = 'UK 8'; priceRange = '₹2,799 - ₹5,499'; }
          else if (height < 190) { size = 'UK 9'; priceRange = '₹2,999 - ₹5,999'; }
          else { size = 'UK 10+'; priceRange = '₹3,299 - ₹6,499'; }
          break;

        case 'bat':
          if (age < 12) { size = 'Size 4'; priceRange = '₹1,499 - ₹2,999'; }
          else if (age < 16) { size = 'Size 5'; priceRange = '₹1,999 - ₹3,999'; }
          else if (height < 165) { size = 'Short Handle'; priceRange = '₹2,499 - ₹4,999'; }
          else { size = 'Long Handle'; priceRange = '₹2,999 - ₹5,999'; }
          break;

        case 'gloves':
          if (weight < 50) { size = 'Small'; priceRange = '₹899 - ₹1,499'; }
          else if (weight < 65) { size = 'Medium'; priceRange = '₹999 - ₹1,699'; }
          else if (weight < 80) { size = 'Large'; priceRange = '₹1,099 - ₹1,899'; }
          else { size = 'XL'; priceRange = '₹1,299 - ₹2,199'; }
          break;

        case 'clothing':
          if (height < 160) { size = 'S'; priceRange = '₹599 - ₹1,299'; }
          else if (height < 170) { size = 'M'; priceRange = '₹699 - ₹1,499'; }
          else if (height < 180) { size = 'L'; priceRange = '₹799 - ₹1,699'; }
          else if (height < 190) { size = 'XL'; priceRange = '₹899 - ₹1,899'; }
          else { size = 'XXL'; priceRange = '₹999 - ₹2,099'; }
          break;
      }

      setRecommendation({ size, priceRange, confidence: Math.floor(Math.random() * 10) + 85 });
      setLoading(false);
    }, 1500);
  };

  return (
    <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <SmartToy sx={{ fontSize: 32, color: 'primary.main', mr: 2 }} />
        <Typography variant="h6" fontWeight="bold">
          AI Size Recommendation
        </Typography>
      </Box>

      <Divider sx={{ mb: 3 }} />

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Height (cm)"
            name="height"
            type="number"
            value={formData.height}
            onChange={handleChange}
            InputProps={{ startAdornment: <Height sx={{ mr: 1, color: 'action.active' }} /> }}
            size="small"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Weight (kg)"
            name="weight"
            type="number"
            value={formData.weight}
            onChange={handleChange}
            InputProps={{ startAdornment: <FitnessCenter sx={{ mr: 1, color: 'action.active' }} /> }}
            size="small"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Age"
            name="age"
            type="number"
            value={formData.age}
            onChange={handleChange}
            InputProps={{ startAdornment: <CalendarToday sx={{ mr: 1, color: 'action.active' }} /> }}
            size="small"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth size="small">
            <InputLabel>Sport</InputLabel>
            <Select name="sport" value={formData.sport} label="Sport" onChange={handleChange}>
              <MenuItem value="">Select</MenuItem>
              {sports.map((sport) => (
                <MenuItem key={sport} value={sport.toLowerCase()}>{sport}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth size="small">
            <InputLabel>Product Type</InputLabel>
            <Select name="productType" value={formData.productType} label="Product Type" onChange={handleChange}>
              {productTypes.map((type) => (
                <MenuItem key={type.value} value={type.value}>{type.label}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Button
            fullWidth
            variant="contained"
            onClick={getSizeRecommendation}
            disabled={loading}
            sx={{ mt: 1, py: 1.5, bgcolor: '#fb641b', '&:hover': { bgcolor: '#f4511e' } }}
          >
            {loading ? <CircularProgress size={24} sx={{ color: 'white' }} /> : 'Get AI Recommendation'}
          </Button>
        </Grid>
      </Grid>

      {recommendation && (
        <Card sx={{ mt: 3, bgcolor: '#e3f2fd' }}>
          <CardContent>
            <Typography variant="subtitle1" fontWeight="bold" color="primary.main" gutterBottom>
              Recommended Size:
            </Typography>
            <Typography variant="h5" color="primary.main" fontWeight="bold" gutterBottom>
              {recommendation.size}
            </Typography>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              Price Range: {recommendation.priceRange}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
              <Chip label={`AI Confidence: ${recommendation.confidence}%`} color="primary" size="small" />
            </Box>
          </CardContent>
        </Card>
      )}
    </Paper>
  );
};

export default AISizeRecommendation;