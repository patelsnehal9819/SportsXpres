import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  Box,
  Rating,
  TextField,
  Button,
  Alert,
  CircularProgress,
  Stepper,
  Step,
  StepLabel,
  Card,
  CardContent,
  Divider,
  FormControlLabel,
  Checkbox,
  IconButton,
} from '@mui/material';
import {
  Star,
  Send,
  ArrowBack,
} from '@mui/icons-material';
import { formatINR } from '../utils/currencyFormatter';
import toast from 'react-hot-toast';

const FeedbackPage = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [order, setOrder] = useState(null);
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    rating: 0,
    title: '',
    comment: '',
    productRatings: [],
    deliveryRating: 0,
    wouldRecommend: true,
  });

  const user = JSON.parse(localStorage.getItem('user'));
  const userId = user?._id;
  const BASE_URL = 'https://solid-fishstick-7v74445764vj3pjgx-5000.app.github.dev';

  useEffect(() => {
    fetchOrder();
  }, [orderId]);

  const fetchOrder = async () => {
    try {
      // Try to get order from API
      const response = await fetch(`${BASE_URL}/api/orders/${orderId}`);
      const data = await response.json();
      
      if (data.success && data.order) {
        setOrder(data.order);
        const productRatings = data.order.items.map(item => ({
          productId: item.productId,
          productName: item.name,
          rating: 0
        }));
        setFormData(prev => ({ ...prev, productRatings }));
      } else {
        // Try user's orders
        const userOrders = await fetch(`${BASE_URL}/api/orders/user/${userId}`);
        const userData = await userOrders.json();
        
        if (userData.success && userData.orders) {
          const foundOrder = userData.orders.find(o => o.orderId === orderId || o._id === orderId);
          if (foundOrder) {
            setOrder(foundOrder);
            const productRatings = foundOrder.items.map(item => ({
              productId: item.productId,
              productName: item.name,
              rating: 0
            }));
            setFormData(prev => ({ ...prev, productRatings }));
          }
        }
      }
    } catch (error) {
      console.error('Error fetching order:', error);
    }
  };

  const steps = ['Overall Rating', 'Product Ratings', 'Your Review'];

  const handleProductRatingChange = (productId, rating) => {
    const updatedRatings = formData.productRatings.map(item =>
      item.productId === productId ? { ...item, rating } : item
    );
    setFormData({ ...formData, productRatings: updatedRatings });
  };

  const handleNext = () => {
    if (activeStep === 0 && formData.rating === 0) {
      alert('Please give an overall rating');
      return;
    }
    if (activeStep === 1) {
      const allRated = formData.productRatings.every(item => item.rating > 0);
      if (!allRated) {
        alert('Please rate all products');
        return;
      }
    }
    setActiveStep(prev => prev + 1);
  };

  const handleBack = () => {
    setActiveStep(prev => prev - 1);
  };

  const handleSubmit = async () => {
    if (!userId) {
      toast.error('Please login to submit feedback');
      navigate('/login');
      return;
    }

    setLoading(true);
    
    try {
      const feedbackData = {
        user: userId,
        orderId: orderId,
        rating: formData.rating,
        title: formData.title,
        comment: formData.comment,
        productRatings: formData.productRatings,
        deliveryRating: formData.deliveryRating,
        wouldRecommend: formData.wouldRecommend
      };

      console.log('📝 Submitting feedback:', feedbackData);

      const response = await fetch(`${BASE_URL}/api/feedback`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(feedbackData)
      });

      const data = await response.json();
      
      if (data.success) {
        setSubmitted(true);
        toast.success('Feedback submitted successfully!');
        setTimeout(() => {
          navigate('/orders');
        }, 3000);
      } else {
        toast.error(data.message || 'Failed to submit feedback');
      }
    } catch (error) {
      console.error('❌ Feedback error:', error);
      toast.error('Failed to submit feedback');
    } finally {
      setLoading(false);
    }
  };

  if (!order) {
    return (
      <Container sx={{ py: 8, textAlign: 'center' }}>
        <CircularProgress />
        <Typography sx={{ mt: 2 }}>Loading order details...</Typography>
      </Container>
    );
  }

  if (submitted) {
    return (
      <Container maxWidth="sm" sx={{ py: 8, textAlign: 'center' }}>
        <Paper sx={{ p: 4 }}>
          <Star sx={{ fontSize: 60, color: '#fb641b', mb: 2 }} />
          <Typography variant="h5" gutterBottom>
            Thank You for Your Feedback!
          </Typography>
          <Typography color="text.secondary" paragraph>
            Your review helps us improve our service.
          </Typography>
          <Typography variant="body2" color="success.main" sx={{ mb: 3 }}>
            Redirecting to your orders...
          </Typography>
          <CircularProgress size={30} />
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper sx={{ p: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <IconButton component={Link} to="/orders" sx={{ mr: 2 }}>
            <ArrowBack />
          </IconButton>
          <Typography variant="h5" fontWeight="bold">
            Share Your Feedback
          </Typography>
        </Box>

        <Typography variant="body2" color="text.secondary" paragraph>
          Order #{order.orderId || order._id} • {new Date(order.createdAt || order.date).toLocaleDateString()}
        </Typography>

        <Stepper activeStep={activeStep} sx={{ my: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {/* Step 1: Overall Rating */}
        {activeStep === 0 && (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography variant="h6" gutterBottom>
              How would you rate your overall experience?
            </Typography>
            <Rating
              value={formData.rating}
              onChange={(e, value) => setFormData({ ...formData, rating: value })}
              size="large"
              sx={{ fontSize: 48, my: 3 }}
            />
            <Box sx={{ mt: 2 }}>
              <Typography variant="body2" color="text.secondary">
                {formData.rating === 0 && 'Tap to rate'}
                {formData.rating === 1 && 'Poor'}
                {formData.rating === 2 && 'Fair'}
                {formData.rating === 3 && 'Good'}
                {formData.rating === 4 && 'Very Good'}
                {formData.rating === 5 && 'Excellent'}
              </Typography>
            </Box>
          </Box>
        )}

        {/* Step 2: Product Ratings */}
        {activeStep === 1 && (
          <Box sx={{ py: 2 }}>
            <Typography variant="h6" gutterBottom>
              Rate Each Product
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              Help other shoppers by rating individual items
            </Typography>

            {order.items.map((item) => (
              <Card key={item.productId || item.id} sx={{ mb: 2, p: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Box
                    component="img"
                    src={item.image || 'https://via.placeholder.com/60x60'}
                    alt={item.name}
                    sx={{ width: 60, height: 60, borderRadius: 1 }}
                  />
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="subtitle2">{item.name}</Typography>
                    <Typography variant="caption" color="text.secondary">
                      Quantity: {item.quantity} • {formatINR(item.price)}
                    </Typography>
                  </Box>
                  <Rating
                    value={formData.productRatings.find(r => r.productId === (item.productId || item.id))?.rating || 0}
                    onChange={(e, value) => handleProductRatingChange(item.productId || item.id, value)}
                  />
                </Box>
              </Card>
            ))}
          </Box>
        )}

        {/* Step 3: Written Review */}
        {activeStep === 2 && (
          <Box sx={{ py: 2 }}>
            <Typography variant="h6" gutterBottom>
              Write Your Review
            </Typography>

            <TextField
              fullWidth
              label="Review Title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              sx={{ mb: 3 }}
              placeholder="Summarize your experience"
            />

            <TextField
              fullWidth
              label="Your Feedback"
              multiline
              rows={4}
              value={formData.comment}
              onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
              sx={{ mb: 3 }}
              placeholder="What did you like or dislike? How was the quality, delivery, etc."
            />

            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle2" gutterBottom>
                Delivery Experience
              </Typography>
              <Rating
                value={formData.deliveryRating}
                onChange={(e, value) => setFormData({ ...formData, deliveryRating: value })}
              />
            </Box>

            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.wouldRecommend}
                  onChange={(e) => setFormData({ ...formData, wouldRecommend: e.target.checked })}
                />
              }
              label="I would recommend this product to others"
            />
          </Box>
        )}

        {/* Order Summary */}
        <Card sx={{ mt: 4, bgcolor: '#f5f5f5' }}>
          <CardContent>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              Order Summary
            </Typography>
            <Divider sx={{ mb: 2 }} />
            {order.items.map((item) => (
              <Box key={item.productId || item.id} sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2">{item.name} x{item.quantity}</Typography>
                <Typography variant="body2">{formatINR(item.price)}</Typography>
              </Box>
            ))}
            <Divider sx={{ my: 2 }} />
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="subtitle2">Total</Typography>
              <Typography variant="h6" color="primary.main">{formatINR(order.total)}</Typography>
            </Box>
          </CardContent>
        </Card>

        {/* Navigation Buttons */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
          <Button
            disabled={activeStep === 0}
            onClick={handleBack}
            variant="outlined"
          >
            Back
          </Button>
          
          {activeStep < steps.length - 1 ? (
            <Button
              variant="contained"
              onClick={handleNext}
              sx={{ bgcolor: '#fb641b' }}
            >
              Next
            </Button>
          ) : (
            <Button
              variant="contained"
              onClick={handleSubmit}
              disabled={loading}
              startIcon={<Send />}
              sx={{ bgcolor: '#fb641b' }}
            >
              {loading ? <CircularProgress size={24} /> : 'Submit Feedback'}
            </Button>
          )}
        </Box>
      </Paper>
    </Container>
  );
};

export default FeedbackPage;