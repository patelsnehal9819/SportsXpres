import React, { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  Button,
  Box,
  TextField,
  Divider,
  InputAdornment,
  Alert,
  Link as MuiLink,
} from '@mui/material';
import {
  Person,
  Email,
  Lock,
  ArrowForward,
} from '@mui/icons-material';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const validateForm = () => {
    if (!formData.fullName.trim()) {
      setError('Please enter your full name');
      return false;
    }
    if (!formData.email.trim()) {
      setError('Please enter your email address');
      return false;
    }
    if (!formData.email.includes('@')) {
      setError('Please enter a valid email address');
      return false;
    }
    if (!formData.password) {
      setError('Please enter your password');
      return false;
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);
    setError('');

    // Create user object
    const userData = {
      name: formData.fullName,
      email: formData.email,
      isAuthenticated: true,
      loginTime: new Date().toISOString(),
    };

    // Call login function from AuthContext
    const result = await login(formData.email, formData.password, userData);
    
    if (result.success) {
      toast.success(`Welcome back, ${formData.fullName}!`);
      navigate('/');
    } else {
      setError('Login failed. Please try again.');
    }
    
    setLoading(false);
  };

  const handleForgotPassword = () => {
    toast.info('Password reset link sent to your email!');
  };

  return (
    <Box sx={{ 
      minHeight: 'calc(100vh - 64px)', 
      bgcolor: '#f5f5f5',
      display: 'flex',
      alignItems: 'center',
      py: 4
    }}>
      <Container maxWidth="sm">
        <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
          {/* Header */}
          <Typography variant="h4" fontWeight="bold" gutterBottom align="center">
            Login
          </Typography>
          <Typography variant="body1" color="text.secondary" align="center" sx={{ mb: 4 }}>
            Login to Your Account
          </Typography>

          {/* Error Alert */}
          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              ❗ {error}
            </Alert>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit}>
            {/* Full Name Field */}
            <TextField
              fullWidth
              required
              label="Full Name *"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="e.g., Snehal"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Person sx={{ color: '#1976d2' }} />
                  </InputAdornment>
                ),
              }}
              sx={{ mb: 3 }}
            />

            {/* Email Field */}
            <TextField
              fullWidth
              required
              label="Email Address *"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="e.g., s@gmail.com"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Email sx={{ color: '#1976d2' }} />
                  </InputAdornment>
                ),
              }}
              sx={{ mb: 3 }}
            />

            {/* Password Field */}
            <TextField
              fullWidth
              required
              label="Password *"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock sx={{ color: '#1976d2' }} />
                  </InputAdornment>
                ),
              }}
              sx={{ mb: 2 }}
            />

            {/* Forgot Password Link */}
            <Box sx={{ textAlign: 'right', mb: 3 }}>
              <MuiLink
                component="button"
                variant="body2"
                onClick={handleForgotPassword}
                sx={{ textDecoration: 'none', color: '#1976d2' }}
              >
                Forgot Password?
              </MuiLink>
            </Box>

            {/* Login Button */}
            <Button
              fullWidth
              type="submit"
              variant="contained"
              size="large"
              disabled={loading}
              endIcon={<ArrowForward />}
              sx={{ 
                py: 1.5,
                bgcolor: '#fb641b',
                '&:hover': { bgcolor: '#f4511e' },
                mb: 3
              }}
            >
              {loading ? 'Logging in...' : 'Login →'}
            </Button>

            {/* Divider */}
            <Divider sx={{ my: 2 }}>
              <Typography variant="body2" color="text.secondary">
                OR
              </Typography>
            </Divider>

            {/* Signup Link */}
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary">
                Don't have an account?{' '}
                <Link 
                  to="/signup" 
                  style={{ 
                    color: '#1976d2', 
                    textDecoration: 'none',
                    fontWeight: 600 
                  }}
                >
                  Sign up
                </Link>
              </Typography>
            </Box>
          </form>
        </Paper>

        {/* Bottom Navigation Text */}
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3, mt: 3 }}>
          <Link to="/" style={{ color: '#666', textDecoration: 'none', fontSize: '14px' }}>Home</Link>
          <Link to="/products" style={{ color: '#666', textDecoration: 'none', fontSize: '14px' }}>Products</Link>
          <Link to="/cart" style={{ color: '#666', textDecoration: 'none', fontSize: '14px' }}>Cart</Link>
          <Link to="/wishlist" style={{ color: '#666', textDecoration: 'none', fontSize: '14px' }}>Wishlist</Link>
          <Link to="/login" style={{ color: '#1976d2', textDecoration: 'none', fontSize: '14px', fontWeight: 600 }}>Login</Link>
        </Box>
      </Container>
    </Box>
  );
};

export default Login;