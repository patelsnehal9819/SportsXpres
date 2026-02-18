import React, { useEffect, useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  Stepper,
  Step,
  StepLabel,
  Grid,
  Divider,
  Alert,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import {
  CheckCircle,
  LocalShipping,
  Home,
  ShoppingBag,
} from '@mui/icons-material';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { formatINR } from '../utils/currencyFormatter';

const OrderConfirmation = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    const foundOrder = orders.find(o => o.id === orderId);
    if (foundOrder) {
      setOrder(foundOrder);
    }
  }, [orderId]);

  if (!order) {
    return (
      <Box sx={{ p: 2, textAlign: 'center', pt: 8 }}>
        <Typography variant="h6">Order not found</Typography>
        <Button component={Link} to="/" variant="contained" sx={{ mt: 2 }}>
          Go Home
        </Button>
      </Box>
    );
  }

  const steps = ['Placed', 'Confirmed', 'Shipped', 'Delivered'];

  return (
    <Box sx={{ p: 2 }}>
      {/* Success Message */}
      <Paper sx={{ p: 3, borderRadius: 2, textAlign: 'center', mb: 2 }}>
        <CheckCircle sx={{ fontSize: 64, color: '#4caf50', mb: 2 }} />
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Order Placed!
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          Thank you for your purchase
        </Typography>
        <Typography variant="subtitle1" color="primary.main" fontWeight="bold">
          {order.id}
        </Typography>
      </Paper>

      {/* Order Status */}
      <Paper sx={{ p: 2, borderRadius: 2, mb: 2 }}>
        <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
          Order Status
        </Typography>
        <Stepper activeStep={2} alternativeLabel sx={{ mb: 2 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <Alert severity="info" sx={{ py: 0 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <LocalShipping sx={{ fontSize: 18, mr: 1 }} />
            <Typography variant="caption">
              Delivery by {new Date(Date.now() + 3*24*60*60*1000).toLocaleDateString()}
            </Typography>
          </Box>
        </Alert>
      </Paper>

      {/* Order Details */}
      <Paper sx={{ p: 2, borderRadius: 2, mb: 2 }}>
        <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
          Delivery Address
        </Typography>
        <Typography variant="body2">{order.address?.fullName}</Typography>
        <Typography variant="body2">{order.address?.street}</Typography>
        <Typography variant="body2">
          {order.address?.city}, {order.address?.state} - {order.address?.zipCode}
        </Typography>
        <Typography variant="body2">Phone: {order.address?.phone}</Typography>

        <Divider sx={{ my: 2 }} />

        <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
          Payment Method
        </Typography>
        <Typography variant="body2" sx={{ textTransform: 'capitalize' }}>
          {order.paymentMethod}
        </Typography>

        <Divider sx={{ my: 2 }} />

        <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
          Items
        </Typography>
        <List dense disablePadding>
          {order.items?.map((item) => (
            <ListItem key={item.id} disablePadding sx={{ py: 0.5 }}>
              <ListItemText 
                primary={item.name} 
                secondary={`x${item.quantity}`}
                primaryTypographyProps={{ variant: 'body2' }}
              />
              <Typography variant="body2">{formatINR(item.price * item.quantity)}</Typography>
            </ListItem>
          ))}
        </List>

        <Divider sx={{ my: 2 }} />

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
          <Typography variant="body2">Subtotal</Typography>
          <Typography variant="body2">{formatINR(order.subtotal)}</Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
          <Typography variant="body2">Shipping</Typography>
          <Typography variant="body2" color="success.main">Free</Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
          <Typography variant="body2">Tax</Typography>
          <Typography variant="body2">{formatINR(order.tax)}</Typography>
        </Box>
        <Divider sx={{ my: 1 }} />
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="subtitle1" fontWeight="bold">Total</Typography>
          <Typography variant="h6" color="primary.main" fontWeight="bold">
            {formatINR(order.total)}
          </Typography>
        </Box>
      </Paper>

      {/* Action Buttons */}
      <Box sx={{ display: 'flex', gap: 1 }}>
        <Button
          fullWidth
          variant="contained"
          component={Link}
          to="/orders"
          startIcon={<ShoppingBag />}
          sx={{ bgcolor: '#fb641b', borderRadius: 2, py: 1.5 }}
        >
          My Orders
        </Button>
        <Button
          fullWidth
          variant="outlined"
          component={Link}
          to="/"
          startIcon={<Home />}
          sx={{ borderRadius: 2, py: 1.5 }}
        >
          Home
        </Button>
      </Box>
    </Box>
  );
};

export default OrderConfirmation;