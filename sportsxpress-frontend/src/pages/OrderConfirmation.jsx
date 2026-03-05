import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  Button,
  Box,
  Stepper,
  Step,
  StepLabel,
  Grid,
  Divider,
  Alert,
  CircularProgress,
} from '@mui/material';
import {
  CheckCircle,
  LocalShipping,
  Home,
  ShoppingBag,
  Star,
} from '@mui/icons-material';
import { formatINR } from '../utils/currencyFormatter';

const OrderConfirmation = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem('user'));
  const BASE_URL = 'https://solid-fishstick-7v74445764vj3pjgx-5000.app.github.dev';

  useEffect(() => {
    fetchOrder();
  }, [orderId]);

  const fetchOrder = async () => {
    setLoading(true);
    try {
      // Try to get order from API
      const response = await fetch(`${BASE_URL}/api/orders/${orderId}`);
      const data = await response.json();
      
      if (data.success && data.order) {
        setOrder(data.order);
      } else {
        // Try user's orders
        const userOrders = await fetch(`${BASE_URL}/api/orders/user/${user?._id}`);
        const userData = await userOrders.json();
        
        if (userData.success && userData.orders) {
          const found = userData.orders.find(o => o.orderId === orderId || o._id === orderId);
          if (found) setOrder(found);
        }
      }
    } catch (error) {
      console.error('Error fetching order:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Container sx={{ py: 8, textAlign: 'center' }}>
        <CircularProgress />
        <Typography sx={{ mt: 2 }}>Loading order details...</Typography>
      </Container>
    );
  }

  if (!order) {
    return (
      <Container sx={{ py: 8, textAlign: 'center' }}>
        <Typography variant="h5" gutterBottom color="error">
          Order not found
        </Typography>
        <Button component={Link} to="/" variant="contained" sx={{ bgcolor: '#fb641b' }}>
          Go to Home
        </Button>
      </Container>
    );
  }

  const steps = ['Order Placed', 'Confirmed', 'Shipped', 'Out for Delivery', 'Delivered'];
  const activeStep = 1; // Order confirmed

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      {/* Success Message */}
      <Paper sx={{ p: 4, textAlign: 'center', mb: 4 }}>
        <CheckCircle sx={{ fontSize: 80, color: '#4caf50', mb: 2 }} />
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Order Placed Successfully!
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Thank you for your purchase. Your order has been confirmed.
        </Typography>
        <Typography variant="h6" color="primary.main" gutterBottom>
          Order ID: {order.orderId || order._id}
        </Typography>
        
        {/* ✅ FEEDBACK BUTTON - ADDED HERE */}
        <Button
          variant="contained"
          component={Link}
          to={`/feedback/${order.orderId || order._id}`}
          startIcon={<Star />}
          sx={{ 
            mt: 2, 
            bgcolor: '#fb641b',
            '&:hover': { bgcolor: '#f4511e' }
          }}
        >
          Leave Feedback
        </Button>
      </Paper>

      {/* Order Status */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Order Status
        </Typography>
        <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <Alert severity="info">
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <LocalShipping />
            <Typography variant="body2">
              Your order will be delivered by {new Date(Date.now() + 3*24*60*60*1000).toLocaleDateString()}
            </Typography>
          </Box>
        </Alert>
      </Paper>

      {/* Order Details */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Order Details
        </Typography>
        <Divider sx={{ mb: 2 }} />

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              Delivery Address
            </Typography>
            <Typography variant="body2">{order.shippingAddress?.fullName}</Typography>
            <Typography variant="body2">{order.shippingAddress?.street}</Typography>
            <Typography variant="body2">
              {order.shippingAddress?.city}, {order.shippingAddress?.state} - {order.shippingAddress?.zipCode}
            </Typography>
            <Typography variant="body2">Phone: {order.shippingAddress?.phone}</Typography>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              Payment Method
            </Typography>
            <Typography variant="body2" sx={{ textTransform: 'capitalize' }}>
              {order.paymentMethod}
            </Typography>
          </Grid>
        </Grid>

        <Divider sx={{ my: 2 }} />

        {/* Order Items */}
        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
          Items Ordered
        </Typography>
        {order.items?.map((item, index) => (
          <Box key={index} sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body2">
              {item.name} x {item.quantity}
            </Typography>
            <Typography variant="body2">
              {formatINR(item.price * item.quantity)}
            </Typography>
          </Box>
        ))}

        <Divider sx={{ my: 2 }} />

        {/* Price Summary */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography variant="body2">Subtotal</Typography>
          <Typography variant="body2">{formatINR(order.subtotal)}</Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography variant="body2">Shipping</Typography>
          <Typography variant="body2" color="success.main">
            {order.shipping === 0 ? 'Free' : formatINR(order.shipping)}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography variant="body2">Tax</Typography>
          <Typography variant="body2">{formatINR(order.tax)}</Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
          <Typography variant="subtitle1" fontWeight="bold">Total</Typography>
          <Typography variant="h6" color="primary.main" fontWeight="bold">
            {formatINR(order.total)}
          </Typography>
        </Box>
      </Paper>

      {/* Action Buttons */}
      <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
        <Button
          variant="contained"
          component={Link}
          to="/orders"
          startIcon={<ShoppingBag />}
          sx={{ bgcolor: '#fb641b' }}
        >
          View All Orders
        </Button>
        
        <Button
          variant="outlined"
          component={Link}
          to="/"
          startIcon={<Home />}
        >
          Continue Shopping
        </Button>
      </Box>
    </Container>
  );
};

export default OrderConfirmation;