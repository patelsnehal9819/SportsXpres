import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Avatar,
  Divider,
  Grid,
  Card,
  CardContent,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Switch,
  Alert,
} from '@mui/material';
import {
  Person,
  Email,
  Phone,
  Height,
  FitnessCenter,
  CalendarToday,
  Edit,
  Save,
  LocationOn,
  Notifications,
  Security,
  Help,
  Logout,
  ArrowForward,
} from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [editing, setEditing] = useState(false);
  const [notifications, setNotifications] = useState(true);
  
  const [profileData, setProfileData] = useState({
    name: user?.name || 'John Doe',
    email: user?.email || 'john@example.com',
    phone: user?.phone || '+91 9876543210',
    height: user?.height || 175,
    weight: user?.weight || 70,
    age: user?.age || 25,
    sport: user?.sport || 'Cricket',
  });

  const handleChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    setEditing(false);
    toast.success('Profile updated successfully');
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <Box sx={{ p: 2 }}>
      {/* Profile Header */}
      <Paper sx={{ p: 3, borderRadius: 2, mb: 2, textAlign: 'center' }}>
        <Avatar
          sx={{ 
            width: 80, 
            height: 80, 
            bgcolor: '#fb641b',
            fontSize: 32,
            margin: '0 auto',
            mb: 2
          }}
        >
          {profileData.name.charAt(0)}
        </Avatar>
        <Typography variant="h6" fontWeight="bold">
          {profileData.name}
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Sports Enthusiast
        </Typography>
        <Button
          variant="outlined"
          startIcon={editing ? <Save /> : <Edit />}
          onClick={editing ? handleSave : () => setEditing(true)}
          sx={{ mt: 1, borderRadius: 2 }}
          size="small"
        >
          {editing ? 'Save Profile' : 'Edit Profile'}
        </Button>
      </Paper>

      {/* Personal Info */}
      <Paper sx={{ p: 2, borderRadius: 2, mb: 2 }}>
        <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
          Personal Information
        </Typography>
        
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              size="small"
              label="Full Name"
              name="name"
              value={profileData.name}
              onChange={handleChange}
              disabled={!editing}
              InputProps={{
                startAdornment: <Person sx={{ mr: 1, color: 'action.active' }} />,
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              size="small"
              label="Email"
              name="email"
              value={profileData.email}
              onChange={handleChange}
              disabled={!editing}
              InputProps={{
                startAdornment: <Email sx={{ mr: 1, color: 'action.active' }} />,
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              size="small"
              label="Phone"
              name="phone"
              value={profileData.phone}
              onChange={handleChange}
              disabled={!editing}
              InputProps={{
                startAdornment: <Phone sx={{ mr: 1, color: 'action.active' }} />,
              }}
            />
          </Grid>

          <Grid item xs={4}>
            <TextField
              fullWidth
              size="small"
              label="Height"
              name="height"
              value={profileData.height}
              onChange={handleChange}
              disabled={!editing}
              InputProps={{
                startAdornment: <Height sx={{ mr: 0.5, color: 'action.active', fontSize: 18 }} />,
              }}
            />
          </Grid>

          <Grid item xs={4}>
            <TextField
              fullWidth
              size="small"
              label="Weight"
              name="weight"
              value={profileData.weight}
              onChange={handleChange}
              disabled={!editing}
              InputProps={{
                startAdornment: <FitnessCenter sx={{ mr: 0.5, color: 'action.active', fontSize: 18 }} />,
              }}
            />
          </Grid>

          <Grid item xs={4}>
            <TextField
              fullWidth
              size="small"
              label="Age"
              name="age"
              value={profileData.age}
              onChange={handleChange}
              disabled={!editing}
              InputProps={{
                startAdornment: <CalendarToday sx={{ mr: 0.5, color: 'action.active', fontSize: 18 }} />,
              }}
            />
          </Grid>
        </Grid>

        {!editing && (
          <Alert severity="info" sx={{ mt: 2 }}>
            Your measurements help AI recommend perfect sizes
          </Alert>
        )}
      </Paper>

      {/* Settings Menu */}
      <Paper sx={{ borderRadius: 2, mb: 2, overflow: 'hidden' }}>
        <List disablePadding>
          <ListItem>
            <ListItemIcon>
              <LocationOn />
            </ListItemIcon>
            <ListItemText 
              primary="Saved Addresses" 
              secondary="Manage your delivery addresses"
            />
            <IconButton edge="end" onClick={() => navigate('/addresses')}>
              <ArrowForward />
            </IconButton>
          </ListItem>
          <Divider />
          
          <ListItem>
            <ListItemIcon>
              <Notifications />
            </ListItemIcon>
            <ListItemText 
              primary="Notifications" 
              secondary="Order updates, offers"
            />
            <Switch 
              edge="end" 
              checked={notifications}
              onChange={() => setNotifications(!notifications)}
            />
          </ListItem>
          <Divider />
          
          <ListItem>
            <ListItemIcon>
              <Security />
            </ListItemIcon>
            <ListItemText 
              primary="Privacy & Security" 
              secondary="Password, two-factor"
            />
            <IconButton edge="end">
              <ArrowForward />
            </IconButton>
          </ListItem>
          <Divider />
          
          <ListItem>
            <ListItemIcon>
              <Help />
            </ListItemIcon>
            <ListItemText 
              primary="Help & Support" 
              secondary="FAQs, contact us"
            />
            <IconButton edge="end">
              <ArrowForward />
            </IconButton>
          </ListItem>
        </List>
      </Paper>

      {/* Logout Button */}
      <Button
        fullWidth
        variant="outlined"
        color="error"
        startIcon={<Logout />}
        onClick={handleLogout}
        sx={{ borderRadius: 2, py: 1.5 }}
      >
        Logout
      </Button>
    </Box>
  );
};

export default Profile;