import React from 'react';
import { Box, Container, Grid, Typography, Link, IconButton, Divider, Stack } from '@mui/material';
import { Facebook, Twitter, Instagram, LinkedIn } from '@mui/icons-material';

const Footer = () => {
  return (
    <Box component="footer" sx={{ bgcolor: '#172337', color: 'white', mt: 'auto', pt: 4, pb: 2 }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom fontWeight="bold">SportsXpress</Typography>
            <Typography variant="body2" paragraph>Smart Sports Shopping Made Simple.</Typography>
            <Stack direction="row" spacing={1}>
              <IconButton color="inherit"><Facebook /></IconButton>
              <IconButton color="inherit"><Twitter /></IconButton>
              <IconButton color="inherit"><Instagram /></IconButton>
              <IconButton color="inherit"><LinkedIn /></IconButton>
            </Stack>
          </Grid>
          <Grid item xs={12} md={2}>
            <Typography variant="subtitle1" gutterBottom fontWeight="bold">Shop</Typography>
            <Link href="#" color="inherit" underline="hover" display="block" sx={{ mb: 1 }}>Cricket</Link>
            <Link href="#" color="inherit" underline="hover" display="block" sx={{ mb: 1 }}>Football</Link>
            <Link href="#" color="inherit" underline="hover" display="block" sx={{ mb: 1 }}>Badminton</Link>
          </Grid>
          <Grid item xs={12} md={2}>
            <Typography variant="subtitle1" gutterBottom fontWeight="bold">Support</Typography>
            <Link href="#" color="inherit" underline="hover" display="block" sx={{ mb: 1 }}>Contact Us</Link>
            <Link href="#" color="inherit" underline="hover" display="block" sx={{ mb: 1 }}>FAQs</Link>
            <Link href="#" color="inherit" underline="hover" display="block" sx={{ mb: 1 }}>Returns</Link>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="subtitle1" gutterBottom fontWeight="bold">Download App</Typography>
            <Typography variant="body2">Get 10% off on your first order</Typography>
          </Grid>
        </Grid>
        <Divider sx={{ my: 3, borderColor: 'rgba(255,255,255,0.1)' }} />
        <Typography variant="body2" align="center">© 2026 SportsXpress. All rights reserved.</Typography>
      </Container>
    </Box>
  );
};

export default Footer;