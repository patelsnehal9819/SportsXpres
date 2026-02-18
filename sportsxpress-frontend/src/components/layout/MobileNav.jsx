import React, { useState } from 'react';
import {
  Drawer,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Typography,
  IconButton,
  Avatar,
  Collapse,
  Badge,
  Chip,
  Button,  // ← ADD THIS!
} from '@mui/material';
import {
  Menu as MenuIcon,
  Home,
  SportsCricket,
  SportsSoccer,
  SportsTennis,
  FitnessCenter,
  SportsBasketball,
  DirectionsRun,
  Checkroom,
  Grass,
  LocalHospital,
  ShoppingCart,
  Favorite,
  Person,
  Logout,
  Login,
  AppRegistration,
  SmartToy,
  ExpandLess,
  ExpandMore,
  Close,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';  // Remove 'Link' from here
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';

const MobileNav = () => {
  const [open, setOpen] = useState(false);
  const [sportsOpen, setSportsOpen] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  
  const { user, logout } = useAuth();
  const { getCartCount } = useCart();
  const { wishlistCount } = useWishlist();
  const navigate = useNavigate();

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const handleNavigation = (path) => {
    navigate(path);
    setOpen(false);
  };

  const handleLogout = () => {
    logout();
    setOpen(false);
    navigate('/');
  };

  const sports = [
    { name: 'Cricket', icon: <SportsCricket />, path: '/sport/cricket', color: '#4CAF50' },
    { name: 'Football', icon: <SportsSoccer />, path: '/sport/football', color: '#2196F3' },
    { name: 'Badminton', icon: <SportsTennis />, path: '/sport/badminton', color: '#FF9800' },
    { name: 'Basketball', icon: <SportsBasketball />, path: '/sport/basketball', color: '#F44336' },
    { name: 'Gym', icon: <FitnessCenter />, path: '/sport/gym', color: '#9C27B0' },
    { name: 'Running', icon: <DirectionsRun />, path: '/sport/running', color: '#00BCD4' },
  ];

  const categories = [
    { name: 'Sports Shoes', icon: <Grass />, path: '/sports-shoes' },
    { name: 'Sports Jersey', icon: <Checkroom />, path: '/sports-jersey' },
    { name: 'Medical Kits', icon: <LocalHospital />, path: '/medical-kits' },
  ];

  return (
    <>
      {/* Menu Button */}
      <IconButton
        color="inherit"
        onClick={toggleDrawer}
        sx={{ display: { xs: 'block', md: 'none' } }}
      >
        <MenuIcon />
      </IconButton>

      {/* Mobile Drawer */}
      <Drawer
        anchor="left"
        open={open}
        onClose={toggleDrawer}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { width: '85%', maxWidth: 360 },
        }}
      >
        <Box sx={{ p: 2 }}>
          {/* Header */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6" fontWeight="bold" color="primary.main">
              SportsXpress
            </Typography>
            <IconButton onClick={toggleDrawer}>
              <Close />
            </IconButton>
          </Box>

          <Divider sx={{ mb: 2 }} />

          {/* User Info */}
          {user ? (
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, p: 2, bgcolor: '#f5f5f5', borderRadius: 2 }}>
              <Avatar sx={{ width: 48, height: 48, bgcolor: '#fb641b', mr: 2 }}>
                {user.name?.charAt(0).toUpperCase()}
              </Avatar>
              <Box>
                <Typography variant="subtitle1" fontWeight="bold">
                  {user.name}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {user.email}
                </Typography>
              </Box>
            </Box>
          ) : (
            <Box sx={{ mb: 3, p: 2, bgcolor: '#e3f2fd', borderRadius: 2 }}>
              <Typography variant="body2" gutterBottom>
                Login for personalized experience
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                <Button
                  size="small"
                  variant="contained"
                  startIcon={<Login />}
                  onClick={() => handleNavigation('/login')}
                  sx={{ bgcolor: '#1976d2', flex: 1 }}
                >
                  Login
                </Button>
                <Button
                  size="small"
                  variant="outlined"
                  startIcon={<AppRegistration />}
                  onClick={() => handleNavigation('/signup')}
                  sx={{ flex: 1 }}
                >
                  Signup
                </Button>
              </Box>
            </Box>
          )}

          {/* Navigation List */}
          <List>
            {/* Home */}
            <ListItem disablePadding>
              <ListItemButton onClick={() => handleNavigation('/')}>
                <ListItemIcon><Home /></ListItemIcon>
                <ListItemText primary="Home" />
              </ListItemButton>
            </ListItem>

            {/* Sports Dropdown */}
            <ListItem disablePadding>
              <ListItemButton onClick={() => setSportsOpen(!sportsOpen)}>
                <ListItemIcon><SportsCricket /></ListItemIcon>
                <ListItemText primary="Sports" />
                {sportsOpen ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
            </ListItem>
            <Collapse in={sportsOpen} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {sports.map((sport) => (
                  <ListItemButton
                    key={sport.name}
                    sx={{ pl: 4 }}
                    onClick={() => handleNavigation(sport.path)}
                  >
                    <ListItemIcon sx={{ color: sport.color }}>
                      {sport.icon}
                    </ListItemIcon>
                    <ListItemText primary={sport.name} />
                  </ListItemButton>
                ))}
              </List>
            </Collapse>

            {/* Categories Dropdown */}
            <ListItem disablePadding>
              <ListItemButton onClick={() => setCategoriesOpen(!categoriesOpen)}>
                <ListItemIcon><Checkroom /></ListItemIcon>
                <ListItemText primary="Categories" />
                {categoriesOpen ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
            </ListItem>
            <Collapse in={categoriesOpen} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {categories.map((category) => (
                  <ListItemButton
                    key={category.name}
                    sx={{ pl: 4 }}
                    onClick={() => handleNavigation(category.path)}
                  >
                    <ListItemIcon>{category.icon}</ListItemIcon>
                    <ListItemText primary={category.name} />
                  </ListItemButton>
                ))}
              </List>
            </Collapse>

            <Divider sx={{ my: 2 }} />

            {/* Cart */}
            <ListItem disablePadding>
              <ListItemButton onClick={() => handleNavigation('/cart')}>
                <ListItemIcon>
                  <Badge badgeContent={getCartCount()} color="error">
                    <ShoppingCart />
                  </Badge>
                </ListItemIcon>
                <ListItemText primary="Cart" />
                {getCartCount() > 0 && (
                  <Chip label={getCartCount()} size="small" color="error" />
                )}
              </ListItemButton>
            </ListItem>

            {/* Wishlist */}
            <ListItem disablePadding>
              <ListItemButton onClick={() => handleNavigation('/wishlist')}>
                <ListItemIcon>
                  <Badge badgeContent={wishlistCount} color="error">
                    <Favorite />
                  </Badge>
                </ListItemIcon>
                <ListItemText primary="Wishlist" />
                {wishlistCount > 0 && (
                  <Chip label={wishlistCount} size="small" color="error" />
                )}
              </ListItemButton>
            </ListItem>

            {/* AI Size */}
            <ListItem disablePadding>
              <ListItemButton onClick={() => handleNavigation('/ai-size')}>
                <ListItemIcon><SmartToy /></ListItemIcon>
                <ListItemText primary="AI Size Recommender" />
              </ListItemButton>
            </ListItem>

            {/* Starter Kit */}
            <ListItem disablePadding>
              <ListItemButton onClick={() => handleNavigation('/starter-kit')}>
                <ListItemIcon><SportsCricket /></ListItemIcon>
                <ListItemText primary="Starter Kit" />
              </ListItemButton>
            </ListItem>

            {user && (
              <>
                <Divider sx={{ my: 2 }} />
                
                {/* Profile */}
                <ListItem disablePadding>
                  <ListItemButton onClick={() => handleNavigation('/profile')}>
                    <ListItemIcon><Person /></ListItemIcon>
                    <ListItemText primary="My Profile" />
                  </ListItemButton>
                </ListItem>

                {/* Orders */}
                <ListItem disablePadding>
                  <ListItemButton onClick={() => handleNavigation('/orders')}>
                    <ListItemIcon><ShoppingCart /></ListItemIcon>
                    <ListItemText primary="My Orders" />
                  </ListItemButton>
                </ListItem>

                {/* Logout */}
                <ListItem disablePadding>
                  <ListItemButton onClick={handleLogout}>
                    <ListItemIcon><Logout /></ListItemIcon>
                    <ListItemText primary="Logout" />
                  </ListItemButton>
                </ListItem>
              </>
            )}
          </List>

          {/* Footer */}
          <Box sx={{ mt: 4, textAlign: 'center' }}>
            <Typography variant="caption" color="text.secondary">
              © 2026 SportsXpress. All rights reserved.
            </Typography>
          </Box>
        </Box>
      </Drawer>
    </>
  );
};

export default MobileNav;