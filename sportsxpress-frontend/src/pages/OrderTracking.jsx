import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  Stepper,
  Step,
  StepLabel,
  Chip,
  Divider,
  Card,
  CardContent,
  LinearProgress,
  Alert,
  List,
  ListItem,
  ListItemText,
  Button,
} from '@mui/material';
import {
  LocalShipping,
  CheckCircle,
  Schedule,
  ShoppingBag,
  ArrowForward,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { formatINR } from '../utils/currencyFormatter';
import { format } from 'date-fns';

const OrderTracking = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    const sortedOrders = savedOrders.sort((a, b) => 
      new Date(b.date) - new Date(a.date)
    );
    setOrders(sortedOrders);
    setLoading(false);
  }, []);

  const getActiveStep = (order) => {
    if (order.status === 'delivered') return 4;
    if (order.status === 'shipped') return 2;
    if (order.status === 'confirmed') return 1;
    return 0;
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'delivered': return 'success';
      case 'shipped': return 'info';
      case 'confirmed': return 'primary';
      default: return 'warning';
    }
  };

  if (loading) {
    return (
      <Box sx={{ p: 2 }}>
        <LinearProgress />
      </Box>
    );
  }

  if (orders.length === 0) {
    return (
      <Box sx={{ p: 2, textAlign: 'center', pt: 8 }}>
        <ShoppingBag sx={{ fontSize: 80, color: '#ccc', mb: 3 }} />
        <Typography variant="h6" gutterBottom>
          No orders yet
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          Start shopping to see your orders here!
        </Typography>
        <Button
          variant="contained"
          onClick={() => navigate('/products')}
          sx={{ bgcolor: '#fb641b', borderRadius: 2, px: 4 }}
        >
          Shop Now
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" fontWeight="bold" gutterBottom>
        My Orders
      </Typography>

      {orders.map((order) => (
        <Card key={order.id} sx={{ mb: 2, borderRadius: 2, overflow: 'hidden' }}>
          {/* Order Header */}
          <Box sx={{ p: 2, bgcolor: '#f5f5f5' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}>
              <Typography variant="subtitle2" fontWeight="bold">
                Order #{order.id.slice(-8)}
              </Typography>
              <Chip
                label={order.status?.toUpperCase()}
                size="small"
                color={getStatusColor(order.status)}
                sx={{ height: 20 }}
              />
            </Box>
            <Typography variant="caption" color="text.secondary">
              {format(new Date(order.date), 'dd MMM yyyy')} • {order.items.length} items
            </Typography>
          </Box>

          {/* Order Items Preview */}
          <Box sx={{ p: 2 }}>
            {order.items.slice(0, 2).map((item) => (
              <Box key={item.id} sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                <Typography variant="body2">{item.name}</Typography>
                <Typography variant="body2">{formatINR(item.price)}</Typography>
              </Box>
            ))}
            {order.items.length > 2 && (
              <Typography variant="caption" color="text.secondary">
                +{order.items.length - 2} more items
              </Typography>
            )}
          </Box>

          {/* Order Status Stepper */}
          <Box sx={{ px: 2, pb: 2 }}>
            <Stepper activeStep={getActiveStep(order)} alternativeLabel>
              <Step><StepLabel>Placed</StepLabel></Step>
              <Step><StepLabel>Confirmed</StepLabel></Step>
              <Step><StepLabel>Shipped</StepLabel></Step>
              <Step><StepLabel>Delivered</StepLabel></Step>
            </Stepper>
          </Box>

          {/* Delivery Estimate */}
          {order.status !== 'delivered' && (
            <Box sx={{ px: 2, pb: 2 }}>
              <Alert severity="info" sx={{ py: 0 }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <LocalShipping sx={{ fontSize: 18, mr: 1 }} />
                  <Typography variant="caption">
                    Est. delivery: {format(new Date(Date.now() + 3*24*60*60*1000), 'dd MMM')}
                  </Typography>
                </Box>
              </Alert>
            </Box>
          )}

          {/* View Details Button */}
          <Button
            fullWidth
            variant="text"
            endIcon={<ArrowForward />}
            onClick={() => navigate(`/orders/${order.id}`)}
            sx={{ borderTop: '1px solid #e0e0e0', borderRadius: 0, py: 1 }}
          >
            View Details
          </Button>
        </Card>
      ))}
    </Box>
  );
};

export default OrderTracking;