import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Badge,
  Box,
  InputBase,
  Menu,
  MenuItem,
  Avatar,
  styled,
  alpha,
  Popover,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from '@mui/material';
import {
  Search as SearchIcon,
  ShoppingCart as CartIcon,
  SportsCricket as CricketIcon,
  SportsSoccer as FootballIcon,
  SportsTennis as BadmintonIcon,
  FitnessCenter as GymIcon,
  SportsBasketball as BasketballIcon,
  DirectionsRun as RunningIcon,
  Person as PersonIcon,
  SmartToy as AIIcon,
  Checkroom as JerseyIcon,
  LocalHospital as MedicalIcon,
  Grass as ShoesIcon,
  ExpandMore,
  ExpandLess,
  Receipt as OrdersIcon,  // ← ADD THIS IMPORT
} from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import MobileNav from './MobileNav';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: 4,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': { backgroundColor: alpha(theme.palette.common.white, 0.25) },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: '500px',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'white',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    width: '100%',
  },
}));

const Navbar = () => {
  const { user, logout } = useAuth();
  const { getCartCount } = useCart();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [sportsAnchorEl, setSportsAnchorEl] = useState(null);

  const sports = [
    { name: 'Cricket', icon: <CricketIcon />, path: '/sport/cricket', color: '#4CAF50' },
    { name: 'Football', icon: <FootballIcon />, path: '/sport/football', color: '#2196F3' },
    { name: 'Badminton', icon: <BadmintonIcon />, path: '/sport/badminton', color: '#FF9800' },
    { name: 'Basketball', icon: <BasketballIcon />, path: '/sport/basketball', color: '#F44336' },
    { name: 'Gym', icon: <GymIcon />, path: '/sport/gym', color: '#9C27B0' },
    { name: 'Running', icon: <RunningIcon />, path: '/sport/running', color: '#00BCD4' },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) navigate(`/products?search=${searchTerm}`);
  };

  const handleSportsClick = (event) => setSportsAnchorEl(event.currentTarget);
  const handleSportsClose = () => setSportsAnchorEl(null);
  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);
  const handleLogout = () => { logout(); handleMenuClose(); navigate('/'); };

  return (
    <AppBar position="sticky" sx={{ bgcolor: '#1976d2' }}>
      <Toolbar>
        <Box sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }}>
          <MobileNav />
        </Box>

        <Typography variant="h6" component={Link} to="/" sx={{ textDecoration: 'none', color: 'white', fontWeight: 700, fontSize: '20px', mr: 2 }}>
          SportsXpress
        </Typography>

        <Box component="form" onSubmit={handleSearch} sx={{ flexGrow: 1 }}>
          <Search>
            <SearchIconWrapper><SearchIcon /></SearchIconWrapper>
            <StyledInputBase placeholder="Search for products, brands and more..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          </Search>
        </Box>

        <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
          <Button color="inherit" onClick={handleSportsClick} startIcon={<CricketIcon />} endIcon={sportsAnchorEl ? <ExpandLess /> : <ExpandMore />} sx={{ mx: 0.5, fontWeight: 500 }}>
            Sports
          </Button>
          <Popover open={Boolean(sportsAnchorEl)} anchorEl={sportsAnchorEl} onClose={handleSportsClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}>
            <List sx={{ width: 220, py: 1 }}>
              {sports.map((sport) => (
                <ListItem button key={sport.name} component={Link} to={sport.path} onClick={handleSportsClose} sx={{ '&:hover': { bgcolor: alpha(sport.color, 0.1) } }}>
                  <ListItemIcon sx={{ color: sport.color, minWidth: 36 }}>{sport.icon}</ListItemIcon>
                  <ListItemText primary={sport.name} />
                </ListItem>
              ))}
            </List>
          </Popover>

          <Button color="inherit" component={Link} to="/sports-jersey" startIcon={<JerseyIcon />} sx={{ mx: 0.5, fontWeight: 500 }}>Jersey</Button>
          <Button color="inherit" component={Link} to="/sports-shoes" startIcon={<ShoesIcon />} sx={{ mx: 0.5, fontWeight: 500 }}>Shoes</Button>
          <Button color="inherit" component={Link} to="/medical-kits" startIcon={<MedicalIcon />} sx={{ mx: 0.5, fontWeight: 500 }}>Medical</Button>

          {/* SEPARATE ORDERS BUTTON - VISIBLE WHEN LOGGED IN */}
          {user && (
            <Button 
              color="inherit" 
              component={Link} 
              to="/orders" 
              startIcon={<OrdersIcon />} 
              sx={{ mx: 0.5, fontWeight: 500 }}
            >
              Orders
            </Button>
          )}

          <IconButton color="inherit" component={Link} to="/cart" sx={{ ml: 1 }}>
            <Badge badgeContent={getCartCount()} color="error"><CartIcon /></Badge>
          </IconButton>

          <Button variant="contained" component={Link} to="/ai-size" startIcon={<AIIcon />} sx={{ mx: 1, bgcolor: '#fb641b', color: 'white', fontWeight: 600, '&:hover': { bgcolor: '#f4511e' } }}>
            AI Size
          </Button>

          <Button color="inherit" component={Link} to="/admin/add-product" sx={{ mx: 0.5, fontWeight: 500 }}>
            + Add Product
          </Button>

          {/* User section */}
          {user ? (
            <>
              <Box sx={{ display: 'flex', alignItems: 'center', ml: 1 }}>
                <Typography variant="body2" sx={{ color: 'white', mr: 1 }}>
                  Hello, <strong>{user.name?.split(' ')[0]}</strong>!
                </Typography>
                <IconButton onClick={handleMenuOpen} sx={{ p: 0 }}>
                  <Avatar sx={{ width: 32, height: 32, bgcolor: '#fb641b' }}>
                    {user.name?.charAt(0).toUpperCase()}
                  </Avatar>
                </IconButton>
              </Box>
              <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                <MenuItem component={Link} to="/profile" onClick={handleMenuClose}><PersonIcon sx={{ mr: 1 }} /> Profile</MenuItem>
                {/* Orders option in dropdown as well (optional) */}
                <MenuItem component={Link} to="/orders" onClick={handleMenuClose}><OrdersIcon sx={{ mr: 1 }} /> My Orders</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </>
          ) : (
            <Button color="inherit" component={Link} to="/login" startIcon={<PersonIcon />} sx={{ ml: 1, fontWeight: 500 }}>Login</Button>
          )}
        </Box>

        <Box sx={{ display: { xs: 'flex', md: 'none' }, ml: 'auto' }}>
          <IconButton color="inherit" component={Link} to="/cart">
            <Badge badgeContent={getCartCount()} color="error">
              <CartIcon />
            </Badge>
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;