import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardActions,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Divider,
  Radio,
  RadioGroup,
  FormControlLabel,
} from '@mui/material';
import {
  Add,
  Edit,
  Delete,
  Home,
  Work,
  LocationOn,
  CheckCircle,
} from '@mui/icons-material';
import toast from 'react-hot-toast';

const AddressBook = () => {
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      type: 'home',
      name: 'Rahul Sharma',
      street: '123 Sports Complex, Andheri East',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400001',
      phone: '+91 9876543210',
      isDefault: true,
    },
    {
      id: 2,
      type: 'work',
      name: 'Rahul Sharma',
      street: '456 Business Park, Bandra West',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400050',
      phone: '+91 9876543211',
      isDefault: false,
    },
  ]);

  const [openDialog, setOpenDialog] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [formData, setFormData] = useState({
    type: 'home',
    name: '',
    street: '',
    city: '',
    state: '',
    pincode: '',
    phone: '',
  });

  const handleOpenDialog = (address = null) => {
    if (address) {
      setEditingAddress(address);
      setFormData(address);
    } else {
      setEditingAddress(null);
      setFormData({
        type: 'home',
        name: '',
        street: '',
        city: '',
        state: '',
        pincode: '',
        phone: '',
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingAddress(null);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSaveAddress = () => {
    // Validate
    if (!formData.name || !formData.street || !formData.city || !formData.pincode || !formData.phone) {
      toast.error('Please fill all required fields');
      return;
    }

    if (editingAddress) {
      // Update existing address
      setAddresses(addresses.map(addr => 
        addr.id === editingAddress.id ? { ...formData, id: addr.id } : addr
      ));
      toast.success('Address updated successfully');
    } else {
      // Add new address
      const newAddress = {
        ...formData,
        id: addresses.length + 1,
        isDefault: addresses.length === 0, // First address is default
      };
      setAddresses([...addresses, newAddress]);
      toast.success('Address added successfully');
    }
    handleCloseDialog();
  };

  const handleDeleteAddress = (id) => {
    setAddresses(addresses.filter(addr => addr.id !== id));
    toast.success('Address deleted');
  };

  const handleSetDefault = (id) => {
    setAddresses(addresses.map(addr => ({
      ...addr,
      isDefault: addr.id === id
    })));
    toast.success('Default address updated');
  };

  const getAddressIcon = (type) => {
    switch(type) {
      case 'home': return <Home sx={{ color: '#4CAF50' }} />;
      case 'work': return <Work sx={{ color: '#2196F3' }} />;
      default: return <LocationOn sx={{ color: '#FF9800' }} />;
    }
  };

  return (
    <Box>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h6" fontWeight="bold">
          Saved Addresses
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => handleOpenDialog()}
          sx={{ bgcolor: '#fb641b' }}
        >
          Add New Address
        </Button>
      </Box>

      <Divider sx={{ mb: 3 }} />

      {/* Address List */}
      <Grid container spacing={2}>
        {addresses.map((address) => (
          <Grid item xs={12} key={address.id}>
            <Card sx={{ 
              position: 'relative',
              border: address.isDefault ? '2px solid #4caf50' : 'none',
            }}>
              <CardContent>
                {/* Default Badge */}
                {address.isDefault && (
                  <Chip
                    icon={<CheckCircle />}
                    label="Default"
                    color="success"
                    size="small"
                    sx={{ position: 'absolute', top: 12, right: 12 }}
                  />
                )}

                {/* Address Type Icon */}
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  {getAddressIcon(address.type)}
                  <Typography variant="subtitle1" fontWeight="bold" sx={{ ml: 1, textTransform: 'capitalize' }}>
                    {address.type} Address
                  </Typography>
                </Box>

                {/* Address Details */}
                <Typography variant="body1" fontWeight="bold">
                  {address.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {address.street}<br />
                  {address.city}, {address.state} - {address.pincode}<br />
                  Phone: {address.phone}
                </Typography>
              </CardContent>

              <CardActions sx={{ justifyContent: 'flex-end', gap: 1, p: 2 }}>
                {!address.isDefault && (
                  <Button
                    size="small"
                    onClick={() => handleSetDefault(address.id)}
                  >
                    Set as Default
                  </Button>
                )}
                <IconButton 
                  size="small" 
                  onClick={() => handleOpenDialog(address)}
                  sx={{ color: '#1976d2' }}
                >
                  <Edit />
                </IconButton>
                <IconButton 
                  size="small" 
                  onClick={() => handleDeleteAddress(address.id)}
                  sx={{ color: '#f44336' }}
                >
                  <Delete />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Add/Edit Address Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          {editingAddress ? 'Edit Address' : 'Add New Address'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Address Type</InputLabel>
              <Select
                name="type"
                value={formData.type}
                label="Address Type"
                onChange={handleInputChange}
              >
                <MenuItem value="home">Home</MenuItem>
                <MenuItem value="work">Work</MenuItem>
                <MenuItem value="other">Other</MenuItem>
              </Select>
            </FormControl>

            <TextField
              fullWidth
              label="Full Name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              sx={{ mb: 2 }}
              required
            />

            <TextField
              fullWidth
              label="Street Address"
              name="street"
              value={formData.street}
              onChange={handleInputChange}
              sx={{ mb: 2 }}
              multiline
              rows={2}
              required
            />

            <Grid container spacing={2} sx={{ mb: 2 }}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="City"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="State"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  required
                />
              </Grid>
            </Grid>

            <Grid container spacing={2} sx={{ mb: 2 }}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Pincode"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleInputChange}
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Phone Number"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                />
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button
            variant="contained"
            onClick={handleSaveAddress}
            sx={{ bgcolor: '#fb641b' }}
          >
            {editingAddress ? 'Update' : 'Save'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AddressBook;