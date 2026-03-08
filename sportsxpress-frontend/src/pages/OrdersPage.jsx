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
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';
import {
  ShoppingBag,
  LocalShipping,
  Receipt,
  Star,
  ArrowForward,
  Pending,
  CheckCircle,
  Cancel,
} from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { formatINR } from '../utils/currencyFormatter';
import { API_URL } from '../config';
import toast from 'react-hot-toast';

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const navigate = useNavigate();
  
  const user = JSON.parse(localStorage.getItem('user'));
  const userId = user?._id;

  useEffect(() => {
    if (!userId) {
      toast.error('Please login to view orders');
      navigate('/login');
      return;
    }
    fetchOrders();
  }, [userId]);

  useEffect(() => {
    if (filter === 'all') {
      setFilteredOrders(orders);
    } else if (filter === 'active') {
      setFilteredOrders(orders.filter(o => 
        ['pending', 'confirmed', 'shipped', 'out for delivery'].includes(o.status?.toLowerCase())
      ));
    } else if (filter === 'delivered') {
      setFilteredOrders(orders.filter(o => o.status?.toLowerCase() === 'delivered'));
    } else if (filter === 'cancelled') {
      setFilteredOrders(orders.filter(o => o.status?.toLowerCase() === 'cancelled'));
    }
  }, [filter, orders]);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      console.log('📦 Fetching orders for user:', userId);
      console.log('🔗 API URL:', `${API_URL}/api/orders/user/${userId}`);
      
      const response = await fetch(`${API_URL}/api/orders/user/${userId}`);
      const data = await response.json();
      
      console.log('📥 API Response:', data);
      
      if (data.success && data.orders && data.orders.length > 0) {
        console.log(`✅ Found ${data.orders.length} orders`);
        setOrders(data.orders);
        setFilteredOrders(data.orders);
      } else {
        console.log('❌ No orders found in API');
        setOrders([]);
        setFilteredOrders([]);
      }
    } catch (error) {
      console.error('❌ Error fetching orders:', error);
      toast.error('Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (event, newFilter) => {
    if (newFilter !== null) {
      setFilter(newFilter);
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
      case 'cancelled': return 'error';
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
      
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'center' }}>
        <ToggleButtonGroup
          value={filter}
          exclusive
          onChange={handleFilterChange}
          aria-label="order filter"
          sx={{
            '& .MuiToggleButton-root': {
              px: 4,
              py: 1,
              borderRadius: 2,
              mx: 0.5,
              border: '1px solid #ddd',
              '&.Mui-selected': {
                bgcolor: '#fb641b',
                color: 'white',
                '&:hover': {
                  bgcolor: '#f4511e',
                }
              }
            }
          }}
        >
          <ToggleButton value="all">
            <ShoppingBag sx={{ mr: 1 }} />
            All ({orders.length})
          </ToggleButton>
          <ToggleButton value="active">
            <Pending sx={{ mr: 1 }} />
            Active ({orders.filter(o => ['pending', 'confirmed', 'shipped', 'out for delivery'].includes(o.status?.toLowerCase())).length})
          </ToggleButton>
          <ToggleButton value="delivered">
            <CheckCircle sx={{ mr: 1 }} />
            Delivered ({orders.filter(o => o.status?.toLowerCase() === 'delivered').length})
          </ToggleButton>
          <ToggleButton value="cancelled">
            <Cancel sx={{ mr: 1 }} />
            Cancelled ({orders.filter(o => o.status?.toLowerCase() === 'cancelled').length})
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>

      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Showing {filteredOrders.length} {filteredOrders.length === 1 ? 'order' : 'orders'}
      </Typography>

      <Grid container spacing={3}>
        {filteredOrders.map((order) => {
          const steps = ['Pending', 'Confirmed', 'Shipped', 'Out for Delivery', 'Delivered'];
          const activeStep = getStatusStep(order.status);
          
          return (
            <Grid item xs={12} key={order._id}>
              <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
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

                <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 3 }}>
                  {steps.map((label, index) => (
                    <Step key={label} completed={index <= activeStep}>
                      <StepLabel>
                        <Typography variant="body2">{label}</Typography>
                      </StepLabel>
                    </Step>
                  ))}
                </Stepper>

                {order.status?.toLowerCase() !== 'delivered' && order.status?.toLowerCase() !== 'cancelled' && (
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
                  {order.status?.toLowerCase() === 'delivered' && (
                    <Button
                      variant="contained"
                      size="small"
                      endIcon={<Star />}
                      onClick={() => navigate(`/feedback/${order.orderId || order._id}`)}
                      sx={{ bgcolor: '#fb641b' }}
                    >
                      Leave Feedback
                    </Button>
                  )}
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