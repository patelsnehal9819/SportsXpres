import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Alert,
  IconButton,
  InputAdornment,
} from '@mui/material';
import { CheckCircle, Cancel, Visibility, VisibilityOff } from '@mui/icons-material'; // Added Visibility icons

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false); // ← ADD THIS
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  // Password validation state
  const [passwordValidations, setPasswordValidations] = useState({
    minLength: false,
    hasUpperCase: false,
    hasLowerCase: false,
    hasNumber: false,
    hasSpecialChar: false,
    isValid: false
  });

  // ✅ USE THIS EXACT URL - Copy from your Ports tab for port 5000
  const BASE_URL = 'https://solid-fishstick-7v74445764vj3pjgx-5000.app.github.dev';

  // Password validation function
  const validatePassword = (password) => {
    const minLength = password.length >= 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const isValid = minLength && hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar;

    setPasswordValidations({
      minLength,
      hasUpperCase,
      hasLowerCase,
      hasNumber,
      hasSpecialChar,
      isValid
    });
  };

  // Password visibility toggle functions
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  // Updated handleChange with password validation
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (e.target.name === 'password') {
      validatePassword(e.target.value);
    }
  };

  // Updated handleSubmit with password validation check
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Check password requirements
    if (!passwordValidations.isValid) {
      setError('Password must meet all requirements shown below');
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      console.log('🔍 Connecting to:', `${BASE_URL}/api/auth/register`);
      
      const response = await fetch(`${BASE_URL}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });
      
      const data = await response.json();
      console.log('✅ Response:', data);
      
      if (data.success) {
        alert('✅ Account created! Please login.');
        navigate('/login');
      } else {
        setError(data.message || 'Registration failed');
      }
    } catch (err) {
      console.error('❌ Error:', err);
      setError('Failed to connect to server. Using URL: ' + BASE_URL);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Sign Up
        </Typography>
        
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            margin="normal"
            required
          />
          
          {/* UPDATED: Password field with visibility toggle */}
          <TextField
            fullWidth
            label="Password"
            type={showPassword ? 'text' : 'password'}
            name="password"
            value={formData.password}
            onChange={handleChange}
            margin="normal"
            required
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          
          {/* Password Requirements Display */}
          <Box sx={{ mt: 1, mb: 2, p: 2, bgcolor: '#f5f5f5', borderRadius: 1 }}>
            <Typography variant="caption" color="text.secondary" gutterBottom sx={{ fontWeight: 'bold' }}>
              Password must contain:
            </Typography>
            
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
              {passwordValidations.minLength ? 
                <CheckCircle sx={{ color: '#4caf50', fontSize: 16 }} /> : 
                <Cancel sx={{ color: '#f44336', fontSize: 16 }} />
              }
              <Typography variant="caption">At least 8 characters</Typography>
            </Box>
            
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
              {passwordValidations.hasUpperCase ? 
                <CheckCircle sx={{ color: '#4caf50', fontSize: 16 }} /> : 
                <Cancel sx={{ color: '#f44336', fontSize: 16 }} />
              }
              <Typography variant="caption">At least one uppercase letter (A-Z)</Typography>
            </Box>
            
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
              {passwordValidations.hasLowerCase ? 
                <CheckCircle sx={{ color: '#4caf50', fontSize: 16 }} /> : 
                <Cancel sx={{ color: '#f44336', fontSize: 16 }} />
              }
              <Typography variant="caption">At least one lowercase letter (a-z)</Typography>
            </Box>
            
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
              {passwordValidations.hasNumber ? 
                <CheckCircle sx={{ color: '#4caf50', fontSize: 16 }} /> : 
                <Cancel sx={{ color: '#f44336', fontSize: 16 }} />
              }
              <Typography variant="caption">At least one number (0-9)</Typography>
            </Box>
            
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
              {passwordValidations.hasSpecialChar ? 
                <CheckCircle sx={{ color: '#4caf50', fontSize: 16 }} /> : 
                <Cancel sx={{ color: '#f44336', fontSize: 16 }} />
              }
              <Typography variant="caption">At least one special character (!@#$%^&*)</Typography>
            </Box>
            
            {passwordValidations.isValid && (
              <Typography variant="caption" sx={{ color: '#4caf50', display: 'block', mt: 1, fontWeight: 'bold' }}>
                ✓ Password meets all requirements
              </Typography>
            )}
          </Box>
          
          <Button
            fullWidth
            type="submit"
            variant="contained"
            disabled={loading}
            sx={{ mt: 1, bgcolor: '#fb641b' }}
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </Button>
        </form>

        <Box sx={{ textAlign: 'center', mt: 2 }}>
          <Typography variant="body2">
            Already have account? <Link to="/login">Login</Link>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default Signup;