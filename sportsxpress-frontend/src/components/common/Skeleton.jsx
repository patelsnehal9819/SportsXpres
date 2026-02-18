import React from 'react';
import {
  Box,
  Skeleton,
  Grid,
  Card,
  CardContent,
} from '@mui/material';

// Product Card Skeleton
export const ProductCardSkeleton = () => {
  return (
    <Card sx={{ height: '100%' }}>
      <Skeleton variant="rectangular" height={200} animation="wave" />
      <CardContent>
        <Skeleton variant="text" width="60%" height={20} animation="wave" />
        <Skeleton variant="text" width="80%" height={24} animation="wave" />
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
          <Skeleton variant="circular" width={20} height={20} animation="wave" />
          <Skeleton variant="text" width="40%" height={20} animation="wave" />
        </Box>
        <Skeleton variant="text" width="30%" height={28} animation="wave" sx={{ mt: 1 }} />
      </CardContent>
    </Card>
  );
};

// Product Grid Skeleton
export const ProductGridSkeleton = ({ count = 8 }) => {
  return (
    <Grid container spacing={3}>
      {Array.from({ length: count }).map((_, index) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
          <ProductCardSkeleton />
        </Grid>
      ))}
    </Grid>
  );
};

// Cart Item Skeleton
export const CartItemSkeleton = () => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', p: 2, borderBottom: '1px solid #eee' }}>
      <Skeleton variant="rectangular" width={80} height={80} animation="wave" sx={{ mr: 2 }} />
      <Box sx={{ flex: 1 }}>
        <Skeleton variant="text" width="40%" height={20} animation="wave" />
        <Skeleton variant="text" width="60%" height={18} animation="wave" />
        <Skeleton variant="text" width="20%" height={24} animation="wave" sx={{ mt: 1 }} />
      </Box>
    </Box>
  );
};

// Order Summary Skeleton
export const OrderSummarySkeleton = () => {
  return (
    <Box sx={{ p: 2 }}>
      <Skeleton variant="text" width="50%" height={24} animation="wave" sx={{ mb: 2 }} />
      <Skeleton variant="text" width="100%" height={20} animation="wave" />
      <Skeleton variant="text" width="100%" height={20} animation="wave" />
      <Skeleton variant="text" width="100%" height={20} animation="wave" />
      <Skeleton variant="rectangular" width="100%" height={40} animation="wave" sx={{ mt: 2 }} />
    </Box>
  );
};

// Product Detail Skeleton
export const ProductDetailSkeleton = () => {
  return (
    <Grid container spacing={4}>
      <Grid item xs={12} md={6}>
        <Skeleton variant="rectangular" height={400} animation="wave" />
      </Grid>
      <Grid item xs={12} md={6}>
        <Skeleton variant="text" width="30%" height={24} animation="wave" />
        <Skeleton variant="text" width="80%" height={40} animation="wave" sx={{ mt: 1 }} />
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 2 }}>
          <Skeleton variant="text" width="20%" height={36} animation="wave" />
          <Skeleton variant="text" width="15%" height={24} animation="wave" />
        </Box>
        <Skeleton variant="rectangular" height={100} animation="wave" sx={{ mt: 2 }} />
        <Box sx={{ mt: 2 }}>
          <Skeleton variant="text" width="40%" height={24} animation="wave" />
          <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
            <Skeleton variant="circular" width={40} height={40} animation="wave" />
            <Skeleton variant="circular" width={40} height={40} animation="wave" />
            <Skeleton variant="circular" width={40} height={40} animation="wave" />
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

// Address Card Skeleton
export const AddressCardSkeleton = () => {
  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Skeleton variant="circular" width={24} height={24} animation="wave" sx={{ mr: 1 }} />
          <Skeleton variant="text" width="30%" height={24} animation="wave" />
        </Box>
        <Skeleton variant="text" width="60%" height={20} animation="wave" />
        <Skeleton variant="text" width="80%" height={20} animation="wave" />
        <Skeleton variant="text" width="40%" height={20} animation="wave" />
      </CardContent>
    </Card>
  );
};