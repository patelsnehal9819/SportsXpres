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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Alert,
  LinearProgress,
} from '@mui/material';  // Removed Card, CardMedia, CardContent
import {
  LocalShipping,
  Print,
  ArrowBack,
} from '@mui/icons-material';  // Removed CheckCircle, Schedule, Receipt
import { useParams, useNavigate, Link } from 'react-router-dom';
import { formatINR } from '../utils/currencyFormatter';
import { format } from 'date-fns';

const OrderDetails = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock order data - replace with API call
    setTimeout(() => {
      setOrder({
        id: orderId,
        date: '2026-02-10T10:30:00',
        status: 'shipped',
        total: 12999,
        subtotal: 11999,
        shipping: 0,
        tax: 1000,
        paymentMethod: 'Razorpay',
        paymentId: 'pay_123456789',
        deliveryAddress: {
          name: 'Rahul Sharma',
          street: '123 Sports Complex',
          city: 'Mumbai',
          state: 'Maharashtra',
          pincode: '400001',
          phone: '+91 9876543210',
        },
        items: [
          {
            id: 1,
            name: 'Nike Air Zoom Pegasus 40',
            brand: 'Nike',
            price: 9999,
            quantity: 1,
            size: 'UK 9',
            image: 'https://via.placeholder.com/100x100/2196F3/FFFFFF?text=Nike',
          },
          {
            id: 2,
            name: 'SG Cricket Bat',
            brand: 'SG',
            price: 2999,
            quantity: 1,
            size: 'Short Handle',
            image: 'https://via.placeholder.com/100x100/4CAF50/FFFFFF?text=SG',
          },
        ],
        timeline: [
          { status: 'Order Placed', date: '2026-02-10T10:30:00', completed: true },
          { status: 'Order Confirmed', date: '2026-02-10T11:30:00', completed: true },
          { status: 'Shipped', date: '2026-02-11T09:00:00', completed: true },
          { status: 'Out for Delivery', date: null, completed: false },
          { status: 'Delivered', date: null, completed: false },
        ],
        tracking: {
          courier: 'Delhivery',
          trackingNumber: 'DLV123456789',
          estimatedDelivery: '2026-02-14',
        },
      });
      setLoading(false);
    }, 1000);
  }, [orderId]);

  const getStepIndex = () => {
    return order?.timeline.filter(step => step.completed).length || 0;
  };

  const handlePrintInvoice = () => {
    window.print();
  };

  if (loading) {
    return (
      <Container sx={{ py: 8, textAlign: 'center' }}>
        <LinearProgress />
        <Typography sx={{ mt: 2 }}>Loading order details...</Typography>
      </Container>
    );
  }

  if (!order) {
    return (
      <Container sx={{ py: 8, textAlign: 'center' }}>
        <Typography variant="h5">Order not found</Typography>
        <Button
          variant="contained"
          component={Link}
          to="/orders"
          sx={{ mt: 2, bgcolor: '#fb641b' }}
        >
          Back to Orders
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Order #{order.id}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Placed on {format(new Date(order.date), 'dd MMM yyyy, hh:mm a')}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="outlined"
            startIcon={<Print />}
            onClick={handlePrintInvoice}
          >
            Print Invoice
          </Button>
          <Button
            variant="contained"
            startIcon={<ArrowBack />}
            onClick={() => navigate('/orders')}
          >
            Back
          </Button>
        </Box>
      </Box>

      {/* Order Status */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Order Status
        </Typography>
        <Stepper activeStep={getStepIndex()} alternativeLabel sx={{ mb: 4 }}>
          {order.timeline.map((step, index) => (
            <Step key={step.status} completed={step.completed}>
              <StepLabel>
                <Typography variant="body2">{step.status}</Typography>
                {step.date && (
                  <Typography variant="caption" color="text.secondary">
                    {format(new Date(step.date), 'dd MMM')}
                  </Typography>
                )}
              </StepLabel>
            </Step>
          ))}
        </Stepper>

        {/* Tracking Info */}
        {order.tracking && (
          <Alert severity="info" sx={{ mt: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box>
                <Typography variant="body2">
                  <strong>Courier:</strong> {order.tracking.courier}
                </Typography>
                <Typography variant="body2">
                  <strong>Tracking No:</strong> {order.tracking.trackingNumber}
                </Typography>
              </Box>
              <Chip
                icon={<LocalShipping />}
                label={`Expected: ${format(new Date(order.tracking.estimatedDelivery), 'dd MMM')}`}
                color="primary"
              />
            </Box>
          </Alert>
        )}
      </Paper>

      <Grid container spacing={4}>
        {/* Order Items */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Order Items
            </Typography>
            <Divider sx={{ mb: 2 }} />
            
            {order.items.map((item) => (
              <Box key={item.id} sx={{ display: 'flex', alignItems: 'center', mb: 2, pb: 2, borderBottom: '1px solid #eee' }}>
                <Box
                  component="img"
                  src={item.image}
                  alt={item.name}
                  sx={{ width: 80, height: 80, borderRadius: 1, mr: 2, objectFit: 'cover' }}
                />
                <Box sx={{ flex: 1 }}>
                  <Typography variant="subtitle1" fontWeight="bold">
                    {item.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.brand} • Size: {item.size} • Qty: {item.quantity}
                  </Typography>
                </Box>
                <Typography variant="h6" color="primary.main" fontWeight="bold">
                  {formatINR(item.price)}
                </Typography>
              </Box>
            ))}
          </Paper>
        </Grid>

        {/* Order Summary */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Order Summary
            </Typography>
            <Divider sx={{ mb: 2 }} />

            <TableContainer>
              <Table size="small">
                <TableBody>
                  <TableRow>
                    <TableCell>Subtotal</TableCell>
                    <TableCell align="right">{formatINR(order.subtotal)}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Shipping</TableCell>
                    <TableCell align="right" sx={{ color: 'success.main' }}>Free</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Tax</TableCell>
                    <TableCell align="right">{formatINR(order.tax)}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell><strong>Total</strong></TableCell>
                    <TableCell align="right"><strong>{formatINR(order.total)}</strong></TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>

            <Divider sx={{ my: 2 }} />

            <Typography variant="subtitle2" gutterBottom>
              Payment Information
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Method: {order.paymentMethod}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Payment ID: {order.paymentId}
            </Typography>

            <Divider sx={{ my: 2 }} />

            <Typography variant="subtitle2" gutterBottom>
              Delivery Address
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {order.deliveryAddress.name}<br />
              {order.deliveryAddress.street}<br />
              {order.deliveryAddress.city}, {order.deliveryAddress.state} - {order.deliveryAddress.pincode}<br />
              Phone: {order.deliveryAddress.phone}
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default OrderDetails;