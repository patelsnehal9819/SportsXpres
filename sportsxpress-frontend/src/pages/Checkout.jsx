import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  TextField,
  Divider,
  Stepper,
  Step,
  StepLabel,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Card,
  Alert,
  LinearProgress,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import {
  LocalShipping,
  Payment,
  LocationOn,
  ArrowBack,
  ShoppingBag,
  Person,
  Phone,
} from '@mui/icons-material';
import { useCart } from '../context/CartContext';
import { useNavigate, Link } from 'react-router-dom';
import { formatINR } from '../utils/currencyFormatter';
import toast from 'react-hot-toast';

const Checkout = () => {
  const { cartItems, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);
  
  const user = JSON.parse(localStorage.getItem('user'));
  const userId = user?._id;
  const BASE_URL = 'https://solid-fishstick-7v74445764vj3pjgx-5000.app.github.dev';

  // Address state
  const [address, setAddress] = useState({
    fullName: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    phone: '',
  });

  // Payment state
  const [paymentMethod, setPaymentMethod] = useState('razorpay');

  const steps = ['Shipping', 'Payment', 'Review'];

  const subtotal = getCartTotal();
  const shipping = subtotal > 500 ? 0 : 40;
  const tax = subtotal * 0.1;
  const total = subtotal + shipping + tax;

  const handleAddressChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const validateAddress = () => {
    if (!address.fullName.trim()) {
      toast.error('Please enter your full name');
      return false;
    }
    if (!address.street.trim()) {
      toast.error('Please enter your street address');
      return false;
    }
    if (!address.city.trim()) {
      toast.error('Please enter your city');
      return false;
    }
    if (!address.state.trim()) {
      toast.error('Please enter your state');
      return false;
    }
    if (!address.zipCode.trim() || address.zipCode.length !== 6) {
      toast.error('Please enter a valid 6-digit pincode');
      return false;
    }
    if (!address.phone.trim() || address.phone.length !== 10) {
      toast.error('Please enter a valid 10-digit phone number');
      return false;
    }
    return true;
  };

  const handleNext = () => {
    if (activeStep === 0) {
      if (!validateAddress()) return;
      setActiveStep(1);
    } else if (activeStep === 1) {
      if (!paymentMethod) {
        toast.error('Please select a payment method');
        return;
      }
      setActiveStep(2);
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handlePlaceOrder = async () => {
    if (!userId) {
      toast.error('Please login to place order');
      navigate('/login');
      return;
    }

    setLoading(true);
    
    try {
      const orderData = {
        user: userId,
        items: cartItems.map(item => ({
          productId: item._id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image,
          brand: item.brand
        })),
        subtotal: subtotal,
        shipping: shipping,
        tax: tax,
        total: total,
        shippingAddress: {
          fullName: address.fullName,
          street: address.street,
          city: address.city,
          state: address.state,
          zipCode: address.zipCode,
          phone: address.phone
        },
        paymentMethod: paymentMethod,
        status: 'confirmed'
      };

      console.log('📦 Placing order:', orderData);

      const response = await fetch(`${BASE_URL}/api/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
      });

      const data = await response.json();
      console.log('✅ Order response:', data);
      
      if (data.success) {
        // Clear cart from MongoDB
        await fetch(`${BASE_URL}/api/cart/clear/${userId}`, {
          method: 'DELETE'
        });
        
        clearCart(); // Clear local cart
        toast.success('Order placed successfully!');
        
        // Navigate to order confirmation with the correct order ID
        navigate(`/order-confirmation/${data.order.orderId || data.order._id}`);
      } else {
        toast.error(data.message || 'Failed to place order');
      }
    } catch (error) {
      console.error('❌ Order error:', error);
      toast.error('Failed to place order');
    } finally {
      setLoading(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <Box sx={{ p: 2, textAlign: 'center', pt: 8 }}>
        <ShoppingBag sx={{ fontSize: 80, color: '#ccc', mb: 3 }} />
        <Typography variant="h6" gutterBottom>
          Your cart is empty
        </Typography>
        <Button
          variant="contained"
          component={Link}
          to="/products"
          startIcon={<ArrowBack />}
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
        Checkout
      </Typography>
      
      <Stepper activeStep={activeStep} sx={{ mb: 3, py: 1 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {loading && <LinearProgress sx={{ mb: 2 }} />}

      {/* Step 1: Shipping Address */}
      {activeStep === 0 && (
        <Paper sx={{ p: 2, borderRadius: 2 }}>
          <Typography variant="subtitle1" fontWeight="bold" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
            <LocationOn sx={{ mr: 1, color: '#fb641b', fontSize: 20 }} />
            Shipping Address
          </Typography>

          <TextField
            fullWidth
            size="small"
            label="Full Name *"
            name="fullName"
            value={address.fullName}
            onChange={handleAddressChange}
            InputProps={{ startAdornment: <Person sx={{ mr: 1, color: 'action.active', fontSize: 20 }} /> }}
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth
            size="small"
            label="Street Address *"
            name="street"
            value={address.street}
            onChange={handleAddressChange}
            multiline
            rows={2}
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth
            size="small"
            label="City *"
            name="city"
            value={address.city}
            onChange={handleAddressChange}
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth
            size="small"
            label="State *"
            name="state"
            value={address.state}
            onChange={handleAddressChange}
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth
            size="small"
            label="Pincode *"
            name="zipCode"
            value={address.zipCode}
            onChange={handleAddressChange}
            inputProps={{ maxLength: 6 }}
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth
            size="small"
            label="Phone Number *"
            name="phone"
            value={address.phone}
            onChange={handleAddressChange}
            inputProps={{ maxLength: 10 }}
            InputProps={{ startAdornment: <Phone sx={{ mr: 1, color: 'action.active', fontSize: 20 }} /> }}
          />
        </Paper>
      )}

      {/* Step 2: Payment Method */}
      {activeStep === 1 && (
        <Paper sx={{ p: 2, borderRadius: 2 }}>
          <Typography variant="subtitle1" fontWeight="bold" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
            <Payment sx={{ mr: 1, color: '#fb641b', fontSize: 20 }} />
            Payment Method
          </Typography>

          <FormControl component="fieldset">
            <RadioGroup value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
              <Card sx={{ mb: 1, p: 1, borderRadius: 2 }}>
                <FormControlLabel value="razorpay" control={<Radio />} label="Razorpay (UPI/Cards)" />
              </Card>
              <Card sx={{ mb: 1, p: 1, borderRadius: 2 }}>
                <FormControlLabel value="cod" control={<Radio />} label="Cash on Delivery" />
              </Card>
              <Card sx={{ p: 1, borderRadius: 2 }}>
                <FormControlLabel value="card" control={<Radio />} label="Credit/Debit Card" />
              </Card>
            </RadioGroup>
          </FormControl>
        </Paper>
      )}

      {/* Step 3: Review Order */}
      {activeStep === 2 && (
        <Paper sx={{ p: 2, borderRadius: 2 }}>
          <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
            Review Order
          </Typography>

          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle2" fontWeight="bold">Delivery Address</Typography>
            <Typography variant="body2">{address.fullName}</Typography>
            <Typography variant="body2">{address.street}</Typography>
            <Typography variant="body2">{address.city}, {address.state} - {address.zipCode}</Typography>
            <Typography variant="body2">Phone: {address.phone}</Typography>
          </Box>

          <Divider sx={{ my: 1 }} />

          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle2" fontWeight="bold">Payment Method</Typography>
            <Typography variant="body2" sx={{ textTransform: 'capitalize' }}>
              {paymentMethod === 'razorpay' ? 'Razorpay' : paymentMethod === 'cod' ? 'Cash on Delivery' : 'Credit/Debit Card'}
            </Typography>
          </Box>

          <Divider sx={{ my: 1 }} />

          <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
            Items ({cartItems.length})
          </Typography>
          <List dense disablePadding>
            {cartItems.map((item) => (
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
        </Paper>
      )}

      {/* Navigation Buttons */}
      <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
        <Button
          fullWidth
          disabled={activeStep === 0}
          onClick={handleBack}
          variant="outlined"
          sx={{ borderRadius: 2, py: 1.5 }}
        >
          Back
        </Button>
        <Button
          fullWidth
          variant="contained"
          onClick={activeStep === steps.length - 1 ? handlePlaceOrder : handleNext}
          disabled={loading}
          sx={{ bgcolor: '#fb641b', borderRadius: 2, py: 1.5 }}
        >
          {loading ? 'Processing...' : activeStep === steps.length - 1 ? 'Place Order' : 'Continue'}
        </Button>
      </Box>

      {/* Order Summary */}
      <Paper sx={{ mt: 2, p: 2, borderRadius: 2, bgcolor: '#f5f5f5' }}>
        <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
          Order Summary
        </Typography>
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
          <Typography variant="body2">Subtotal</Typography>
          <Typography variant="body2">{formatINR(subtotal)}</Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
          <Typography variant="body2">Shipping</Typography>
          <Typography variant="body2" color="success.main">
            {shipping === 0 ? 'Free' : formatINR(shipping)}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
          <Typography variant="body2">Tax</Typography>
          <Typography variant="body2">{formatINR(tax)}</Typography>
        </Box>
        <Divider sx={{ my: 1 }} />
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="subtitle1" fontWeight="bold">Total</Typography>
          <Typography variant="h6" color="primary.main" fontWeight="bold">
            {formatINR(total)}
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default Checkout;