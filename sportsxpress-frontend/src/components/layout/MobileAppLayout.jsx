import React, { useState } from 'react';
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Avatar,
  Badge,
  Divider,
  BottomNavigation,
  BottomNavigationAction,
  Paper,
  Button,
  TextField,
  InputAdornment,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Home,
  SportsCricket,
  ShoppingCart,
  Favorite,
  Person,
  Search as SearchIcon,
  Logout,
  Login,
  AppRegistration,
  SmartToy,
  FitnessCenter,
  ArrowBack,
  Clear,
  Receipt as OrdersIcon,  // ← ADDED Orders Icon
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import toast from 'react-hot-toast';

const MobileAppLayout = ({ children, title, showBack = false, onBack }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const { getCartCount } = useCart();
  const { wishlistCount } = useWishlist();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [bottomNavValue, setBottomNavValue] = useState(() => {
    const path = location.pathname;
    if (path === '/') return 0;
    if (path.includes('/products')) return 1;
    if (path.includes('/cart')) return 2;
    if (path.includes('/wishlist')) return 3;
    if (path.includes('/profile')) return 4;
    if (path.includes('/orders')) return 4; // Also show profile tab for orders
    return 0;
  });

  const handleNavigation = (path) => {
    navigate(path);
    setDrawerOpen(false);
  };

  const handleBottomNavChange = (event, newValue) => {
    setBottomNavValue(newValue);
    switch (newValue) {
      case 0:
        navigate('/');
        break;
      case 1:
        navigate('/products');
        break;
      case 2:
        navigate('/cart');
        break;
      case 3:
        navigate('/wishlist');
        break;
      case 4:
        navigate(user ? '/profile' : '/login');
        break;
      default:
        break;
    }
  };

  const handleLogout = () => {
    logout();
    setDrawerOpen(false);
    navigate('/');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${searchQuery}`);
      setShowSearch(false);
      setSearchQuery('');
    } else {
      toast.error('Please enter a search term');
    }
  };

  const menuItems = [
    { text: 'Home', icon: <Home />, path: '/' },
    { text: 'Products', icon: <SearchIcon />, path: '/products' },
    { text: 'Sports', icon: <SportsCricket />, path: '/sports-page' },
    { text: 'Starter Kit', icon: <FitnessCenter />, path: '/starter-kit' },
    { text: 'AI Size', icon: <SmartToy />, path: '/ai-size' },
    { text: 'Cart', icon: <ShoppingCart />, path: '/cart', badge: getCartCount() },
    { text: 'Wishlist', icon: <Favorite />, path: '/wishlist', badge: wishlistCount },
  ];

  // User menu items (shown only when logged in)
  const userMenuItems = [
    { text: 'My Profile', icon: <Person />, path: '/profile' },
    { text: 'My Orders', icon: <OrdersIcon />, path: '/orders' }, // ← ADDED Orders here
  ];

  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      height: '100vh',
      bgcolor: '#f5f5f5',
      maxWidth: '100%',
      margin: '0 auto',
      position: 'relative',
    }}>
      {/* App Bar - Fixed at top */}
      <AppBar 
        position="fixed" 
        sx={{ 
          bgcolor: '#1976d2',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        }}
      >
        <Toolbar>
          {showBack ? (
            <IconButton
              edge="start"
              color="inherit"
              onClick={onBack || (() => navigate(-1))}
              sx={{ mr: 2 }}
            >
              <ArrowBack />
            </IconButton>
          ) : (
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => setDrawerOpen(true)}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 600 }}>
            {title || 'SportsXpress'}
          </Typography>
          <IconButton color="inherit" onClick={() => setShowSearch(!showSearch)}>
            <SearchIcon />
          </IconButton>
          <IconButton color="inherit" onClick={() => navigate('/cart')}>
            <Badge badgeContent={getCartCount()} color="error">
              <ShoppingCart />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Search Bar - Appears below App Bar when search icon clicked */}
      {showSearch && (
        <Box
          component="form"
          onSubmit={handleSearch}
          sx={{
            position: 'fixed',
            top: '64px',
            left: 0,
            right: 0,
            zIndex: 1100,
            bgcolor: 'white',
            p: 2,
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
          }}
        >
          <TextField
            fullWidth
            size="small"
            placeholder="Search for products, brands..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            autoFocus
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: '#1976d2' }} />
                </InputAdornment>
              ),
              endAdornment: searchQuery && (
                <InputAdornment position="end">
                  <IconButton size="small" onClick={() => setSearchQuery('')}>
                    <Clear />
                  </IconButton>
                </InputAdornment>
              ),
              sx: {
                borderRadius: 2,
                bgcolor: '#f5f5f5',
              }
            }}
          />
          <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
            <Button 
              type="submit" 
              variant="contained" 
              fullWidth
              sx={{ 
                bgcolor: '#fb641b',
                borderRadius: 2,
                textTransform: 'none',
              }}
            >
              Search
            </Button>
            <Button 
              variant="outlined" 
              onClick={() => setShowSearch(false)}
              sx={{ 
                borderRadius: 2,
                textTransform: 'none',
              }}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      )}

      {/* Drawer - Slide-out menu */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        sx={{
          '& .MuiDrawer-paper': {
            width: 280,
            bgcolor: '#fff',
          },
        }}
      >
        <Box sx={{ p: 2 }}>
          {/* User Info */}
          {user ? (
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              mb: 3, 
              p: 2, 
              bgcolor: '#f5f5f5', 
              borderRadius: 2 
            }}>
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
                  fullWidth
                  size="small"
                  variant="contained"
                  startIcon={<Login />}
                  onClick={() => {
                    handleNavigation('/login');
                    setDrawerOpen(false);
                  }}
                  sx={{ bgcolor: '#1976d2' }}
                >
                  Login
                </Button>
                <Button
                  fullWidth
                  size="small"
                  variant="outlined"
                  startIcon={<AppRegistration />}
                  onClick={() => {
                    handleNavigation('/signup');
                    setDrawerOpen(false);
                  }}
                >
                  Signup
                </Button>
              </Box>
            </Box>
          )}

          <Divider sx={{ mb: 2 }} />

          {/* Main Menu Items */}
          <List>
            {menuItems.map((item) => (
              <ListItem key={item.text} disablePadding>
                <ListItemButton onClick={() => handleNavigation(item.path)}>
                  <ListItemIcon>
                    <Badge badgeContent={item.badge || 0} color="error">
                      {item.icon}
                    </Badge>
                  </ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>

          {/* User Menu Items (only shown when logged in) */}
          {user && (
            <>
              <Divider sx={{ my: 2 }} />
              <Typography variant="subtitle2" color="text.secondary" sx={{ px: 2, mb: 1 }}>
                Your Account
              </Typography>
              <List>
                {userMenuItems.map((item) => (
                  <ListItem key={item.text} disablePadding>
                    <ListItemButton onClick={() => handleNavigation(item.path)}>
                      <ListItemIcon>
                        {item.icon}
                      </ListItemIcon>
                      <ListItemText primary={item.text} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </>
          )}

          <Divider sx={{ my: 2 }} />

          {/* Logout Button (only when logged in) */}
          {user && (
            <List>
              <ListItem disablePadding>
                <ListItemButton onClick={handleLogout}>
                  <ListItemIcon>
                    <Logout />
                  </ListItemIcon>
                  <ListItemText primary="Logout" />
                </ListItemButton>
              </ListItem>
            </List>
          )}
        </Box>
      </Drawer>

      {/* Main Content - Scrollable area */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          mt: showSearch ? '120px' : '64px',
          mb: '56px',
          overflowY: 'auto',
          WebkitOverflowScrolling: 'touch',
          bgcolor: '#f5f5f5',
        }}
      >
        {children}
      </Box>

      {/* Bottom Navigation - Fixed at bottom */}
      <Paper 
        sx={{ 
          position: 'fixed', 
          bottom: 0, 
          left: 0, 
          right: 0,
          zIndex: 1100,
          boxShadow: '0 -2px 8px rgba(0,0,0,0.1)',
        }} 
        elevation={3}
      >
        <BottomNavigation
          showLabels
          value={bottomNavValue}
          onChange={handleBottomNavChange}
          sx={{
            height: 56,
            '& .Mui-selected': {
              color: '#fb641b',
            },
          }}
        >
          <BottomNavigationAction label="Home" icon={<Home />} />
          <BottomNavigationAction label="Products" icon={<SearchIcon />} />
          <BottomNavigationAction 
            label="Cart" 
            icon={
              <Badge badgeContent={getCartCount()} color="error">
                <ShoppingCart />
              </Badge>
            } 
          />
          <BottomNavigationAction 
            label="Wishlist" 
            icon={
              <Badge badgeContent={wishlistCount} color="error">
                <Favorite />
              </Badge>
            } 
          />
          <BottomNavigationAction 
            label={user ? "Profile" : "Login"} 
            icon={<Person />} 
          />
        </BottomNavigation>
      </Paper>
    </Box>
  );
};

export default MobileAppLayout;