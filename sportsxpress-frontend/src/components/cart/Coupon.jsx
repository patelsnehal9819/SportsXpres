import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Chip,
  Grid,
  Card,
  CardContent,
  IconButton,
  Collapse,
  Alert,
  Divider,
} from '@mui/material';
import {
  LocalOffer,
  CheckCircle,
  ContentCopy,
  ExpandMore,
  ExpandLess,
  Discount,
} from '@mui/icons-material';
import toast from 'react-hot-toast';

const Coupon = ({ onApplyCoupon, cartTotal }) => {
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [showAvailable, setShowAvailable] = useState(false);
  const [discount, setDiscount] = useState(0);

  const availableCoupons = [
    {
      code: 'WELCOME10',
      description: '10% off on your first order',
      minOrder: 999,
      discount: 10,
      type: 'percentage',
      expiry: '2026-03-31',
    },
    {
      code: 'SPORTS50',
      description: 'Flat ₹50 off on orders above ₹999',
      minOrder: 999,
      discount: 50,
      type: 'flat',
      expiry: '2026-03-31',
    },
    {
      code: 'FREESHIP',
      description: 'Free shipping on orders above ₹499',
      minOrder: 499,
      discount: 0,
      type: 'freeshipping',
      expiry: '2026-03-31',
    },
    {
      code: 'CRICKET20',
      description: '20% off on Cricket equipment',
      minOrder: 1499,
      discount: 20,
      type: 'percentage',
      category: 'cricket',
      expiry: '2026-03-31',
    },
  ];

  const handleApplyCoupon = () => {
    if (!couponCode) {
      toast.error('Please enter a coupon code');
      return;
    }

    const coupon = availableCoupons.find(
      c => c.code.toLowerCase() === couponCode.toLowerCase()
    );

    if (!coupon) {
      toast.error('Invalid coupon code');
      return;
    }

    if (cartTotal < coupon.minOrder) {
      toast.error(`Minimum order of ₹${coupon.minOrder} required`);
      return;
    }

    let discountAmount = 0;
    if (coupon.type === 'percentage') {
      discountAmount = (cartTotal * coupon.discount) / 100;
    } else if (coupon.type === 'flat') {
      discountAmount = coupon.discount;
    }

    setAppliedCoupon(coupon);
    setDiscount(discountAmount);
    onApplyCoupon(discountAmount, coupon);
    toast.success(`Coupon applied! You saved ₹${discountAmount}`);
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setDiscount(0);
    setCouponCode('');
    onApplyCoupon(0, null);
    toast.success('Coupon removed');
  };

  const handleCopyCode = (code) => {
    navigator.clipboard.writeText(code);
    toast.success('Code copied!');
  };

  return (
    <Paper sx={{ p: 2 }}>
      {/* Applied Coupon */}
      {appliedCoupon ? (
        <Box sx={{ mb: 2 }}>
          <Alert
            severity="success"
            action={
              <Button color="inherit" size="small" onClick={handleRemoveCoupon}>
                Remove
              </Button>
            }
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <CheckCircle />
              <Typography variant="body2">
                Coupon {appliedCoupon.code} applied! You saved ₹{discount}
              </Typography>
            </Box>
          </Alert>
        </Box>
      ) : (
        /* Coupon Input */
        <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
          <TextField
            fullWidth
            size="small"
            placeholder="Enter coupon code"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
          />
          <Button
            variant="contained"
            onClick={handleApplyCoupon}
            sx={{ bgcolor: '#fb641b', minWidth: 100 }}
          >
            Apply
          </Button>
        </Box>
      )}

      {/* Available Coupons Toggle */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <LocalOffer sx={{ color: '#fb641b' }} />
          <Typography variant="subtitle2">Available Coupons</Typography>
        </Box>
        <IconButton size="small" onClick={() => setShowAvailable(!showAvailable)}>
          {showAvailable ? <ExpandLess /> : <ExpandMore />}
        </IconButton>
      </Box>

      <Collapse in={showAvailable}>
        <Box sx={{ mt: 2 }}>
          <Grid container spacing={1}>
            {availableCoupons.map((coupon) => (
              <Grid item xs={12} key={coupon.code}>
                <Card variant="outlined">
                  <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <Box>
                        <Typography variant="subtitle2" fontWeight="bold" color="primary.main">
                          {coupon.code}
                        </Typography>
                        <Typography variant="caption" display="block" color="text.secondary">
                          {coupon.description}
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                          <Chip
                            label={`Min. ₹${coupon.minOrder}`}
                            size="small"
                            variant="outlined"
                          />
                          <Chip
                            label={`Expires ${new Date(coupon.expiry).toLocaleDateString()}`}
                            size="small"
                            variant="outlined"
                          />
                        </Box>
                      </Box>
                      <IconButton
                        size="small"
                        onClick={() => handleCopyCode(coupon.code)}
                        sx={{ color: '#1976d2' }}
                      >
                        <ContentCopy fontSize="small" />
                      </IconButton>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Collapse>

      {/* Offer Details */}
      <Divider sx={{ my: 2 }} />
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Discount sx={{ color: '#4caf50', fontSize: 18 }} />
        <Typography variant="caption" color="text.secondary">
          Extra 5% off on HDFC Bank cards • No cost EMI available
        </Typography>
      </Box>
    </Paper>
  );
};

export default Coupon;