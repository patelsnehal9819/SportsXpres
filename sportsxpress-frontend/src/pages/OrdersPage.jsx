import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Button,
  Box,
  Stepper,
  Step,
  StepLabel,
  Chip,
  Divider,
  Card,
  CardContent,
  CircularProgress,
  Alert,
} from '@mui/material';
import {
  ShoppingBag,
  LocalShipping,
  Receipt,
  Star,
  ArrowForward,
} from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { formatINR } from '../utils/currencyFormatter';
import toast from 'react-hot-toast';

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  
  const user = JSON.parse(localStorage.getItem('user'));
  const userId = user?._id;
  const BASE_URL = 'https://solid-fishstick-7v74445764vj3pjgx-5000.app.github.dev';

  useEffect(() => {
    if (!userId) {
      toast.error('Please login to view orders');
      navigate('/login');
      return;
    }
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      console.log('📦 Fetching orders for user:', userId);
      console.log('🔗 API URL:', `${BASE_URL}/api/orders/user/${userId}`);
      
      const response = await fetch(`${BASE_URL}/api/orders/user/${userId}`);
      const data = await response.json();
      
      console.log('📥 API Response:', data);
      
      if (data.success && data.orders && data.orders.length > 0) {
        console.log(`✅ Found ${data.orders.length} orders`);
        setOrders(data.orders);
      } else {
        console.log('❌ No orders found in API');
        setOrders([]);
      }
    } catch (error) {
      console.error('❌ Error fetching orders:', error);
      toast.error('Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  const getStatusStep = (status) => {
    switch(status?.toLowerCase()) {
      case 'pending': return 0;
      case 'confirmed': return 1;
      case 'shipped': return 2;
      case 'out for delivery': return 3;
      case 'delivered': return 4;
      default: return 0;
    }
  };

  const getStatusColor = (status) => {
    switch(status?.toLowerCase()) {
      case 'delivered': return 'success';
      case 'shipped': return 'info';
      case 'confirmed': return 'primary';
      case 'pending': return 'warning';
      default: return 'default';
    }
  };

  if (loading) {
    return (
      <Container sx={{ py: 8, textAlign: 'center' }}>
        <CircularProgress />
        <Typography sx={{ mt: 2 }}>Loading your orders...</Typography>
      </Container>
    );
  }

  if (orders.length === 0) {
    return (
      <Container maxWidth="md" sx={{ py: 8, textAlign: 'center' }}>
        <ShoppingBag sx={{ fontSize: 80, color: '#ccc', mb: 3 }} />
        <Typography variant="h5" gutterBottom>
          No orders yet
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Start shopping to see your orders here!
        </Typography>
        <Button
          variant="contained"
          component={Link}
          to="/products"
          sx={{ bgcolor: '#fb641b' }}
        >
          Browse Products
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        My Orders
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        You have {orders.length} {orders.length === 1 ? 'order' : 'orders'}
      </Typography>

      <Grid container spacing={3}>
        {orders.map((order) => {
          const steps = ['Pending', 'Confirmed', 'Shipped', 'Out for Delivery', 'Delivered'];
          const activeStep = getStatusStep(order.status);
          
          return (
            <Grid item xs={12} key={order._id}>
              <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
                {/* Order Header */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, flexWrap: 'wrap' }}>
                  <Box>
                    <Typography variant="h6" fontWeight="bold">
                      Order #{order.orderId || order._id?.slice(-8) || 'N/A'}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Placed on {order.createdAt ? new Date(order.createdAt).toLocaleDateString('en-IN', { 
                        day: 'numeric', 
                        month: 'long', 
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      }) : 'Date not available'}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Chip
                      label={(order.status || 'pending').toUpperCase()}
                      color={getStatusColor(order.status)}
                      size="medium"
                      sx={{ fontWeight: 'bold' }}
                    />
                    <Typography variant="h6" color="primary.main" fontWeight="bold">
                      {formatINR(order.total || 0)}
                    </Typography>
                  </Box>
                </Box>

                {/* Order Items Preview */}
                {order.items && order.items.length > 0 ? (
                  <Box sx={{ mb: 3 }}>
                    <Grid container spacing={2}>
                      {order.items.slice(0, 3).map((item, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                          <Card variant="outlined" sx={{ display: 'flex', alignItems: 'center', p: 1 }}>
                            <Box
                              component="img"
                              src={item.image || 'https://via.placeholder.com/50x50/1976d2/FFFFFF?text=Product'}
                              alt={item.name}
                              sx={{ width: 50, height: 50, borderRadius: 1, mr: 1, objectFit: 'cover' }}
                            />
                            <Box sx={{ flex: 1 }}>
                              <Typography variant="body2" noWrap sx={{ maxWidth: 150 }}>
                                {item.name || 'Product'}
                              </Typography>
                              <Typography variant="caption" color="text.secondary">
                                Qty: {item.quantity || 1} • {formatINR(item.price || 0)}
                              </Typography>
                            </Box>
                          </Card>
                        </Grid>
                      ))}
                      {order.items.length > 3 && (
                        <Grid item xs={12}>
                          <Typography variant="caption" color="text.secondary">
                            +{order.items.length - 3} more items
                          </Typography>
                        </Grid>
                      )}
                    </Grid>
                  </Box>
                ) : (
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    No items to display
                  </Typography>
                )}

                {/* Order Status Stepper */}
                <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 3 }}>
                  {steps.map((label, index) => (
                    <Step key={label} completed={index <= activeStep}>
                      <StepLabel>
                        <Typography variant="body2">{label}</Typography>
                      </StepLabel>
                    </Step>
                  ))}
                </Stepper>

                {/* Delivery Estimate */}
                {order.status?.toLowerCase() !== 'delivered' && (
                  <Alert severity="info" sx={{ mb: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <LocalShipping />
                      <Typography variant="body2">
                        Estimated delivery: {new Date(Date.now() + 3*24*60*60*1000).toLocaleDateString('en-IN', { 
                          day: 'numeric', 
                          month: 'short' 
                        })}
                      </Typography>
                    </Box>
                  </Alert>
                )}

                {/* Action Buttons */}
                <Divider sx={{ my: 2 }} />
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                  <Button
                    variant="outlined"
                    size="small"
                    startIcon={<Receipt />}
                    onClick={() => navigate(`/order-confirmation/${order.orderId || order._id}`)}
                  >
                    View Details
                  </Button>
                  <Button
                    variant="contained"
                    size="small"
                    endIcon={<Star />}
                    onClick={() => navigate(`/feedback/${order.orderId || order._id}`)}
                    sx={{ bgcolor: '#fb641b' }}
                  >
                    Leave Feedback
                  </Button>
                </Box>
              </Paper>
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
};

export default OrdersPage;