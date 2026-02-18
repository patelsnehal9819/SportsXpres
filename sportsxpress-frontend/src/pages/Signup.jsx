import React, { useState } from 'react';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Button,
  Box,
  TextField,
  Divider,
  Alert,
  InputAdornment,
  Menu,
  MenuItem,
  Chip,
  Stepper,
  Step,
  StepLabel,
  IconButton,
} from '@mui/material';
import {
  Phone,
  Email,
  ArrowForward,
  Lock,
  Person,
  VerifiedUser,
  Visibility,
  VisibilityOff,
} from '@mui/icons-material';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const Signup = () => {
  const navigate = useNavigate();
  const { signup } = useAuth();
  
  const [activeStep, setActiveStep] = useState(0);
  const [signupMethod, setSignupMethod] = useState('phone');
  const [identifier, setIdentifier] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [countryCode, setCountryCode] = useState('+91');
  const [anchorEl, setAnchorEl] = useState(null);
  
  // Form Data
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const steps = ['Create Account', 'Verify OTP', 'Complete Profile'];

  const countryCodes = ['+91', '+1', '+44', '+61', '+971'];

  const handleCountryMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCountryMenuClose = (code) => {
    if (code) setCountryCode(code);
    setAnchorEl(null);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleOtpChange = (index, value) => {
    if (value.length > 1) return;
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleSendOtp = async () => {
    if (!identifier) {
      toast.error(`Please enter your ${signupMethod === 'phone' ? 'phone number' : 'email'}`);
      return;
    }

    if (signupMethod === 'phone' && identifier.length < 10) {
      toast.error('Please enter valid 10-digit phone number');
      return;
    }

    if (signupMethod === 'email' && !identifier.includes('@')) {
      toast.error('Please enter valid email address');
      return;
    }

    setLoading(true);
    
    setTimeout(() => {
      toast.success(`OTP sent to ${signupMethod === 'phone' ? countryCode + ' ' + identifier : identifier}`);
      setActiveStep(1);
      setLoading(false);
    }, 1500);
  };

  const handleVerifyOtp = async () => {
    const otpString = otp.join('');
    if (otpString.length !== 6) {
      toast.error('Please enter complete 6-digit OTP');
      return;
    }

    setLoading(true);
    
    setTimeout(() => {
      toast.success('OTP verified successfully!');
      setActiveStep(2);
      setLoading(false);
    }, 1500);
  };

  const handleCompleteProfile = async () => {
    if (!formData.name) {
      toast.error('Please enter your name');
      return;
    }

    if (!formData.password) {
      toast.error('Please enter password');
      return;
    }

    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    setLoading(true);
    
    const userData = {
      name: formData.name,
      email: formData.email || (signupMethod === 'email' ? identifier : ''),
      phone: formData.phone || (signupMethod === 'phone' ? identifier : ''),
      password: formData.password,
    };

    const result = await signup(userData);
    if (result.success) {
      toast.success('Account created successfully!');
      navigate('/login');
    }
    setLoading(false);
  };

  return (
    <Container maxWidth="lg" sx={{ 
      py: 4, 
      minHeight: 'calc(100vh - 64px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      bgcolor: '#f1f3f6'
    }}>
      <Grid container sx={{ maxWidth: 1000, boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
        {/* Left Panel - Brand Message */}
        <Grid item xs={12} md={5} sx={{
          bgcolor: '#2874f0',
          color: 'white',
          p: 4,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          borderRadius: '8px 0 0 8px',
        }}>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Create Account
          </Typography>
          <Typography variant="body1" sx={{ opacity: 0.9, mb: 3 }}>
            Join SportsXpress to get access to exclusive deals and personalized recommendations
          </Typography>
          
          {/* REMOVED: The three bullet points that were here */}
          
          {/* ADDED: Horizontal Steps at the top of right panel instead */}
        </Grid>

        {/* Right Panel - Signup Form */}
        <Grid item xs={12} md={7} sx={{
          bgcolor: 'white',
          p: 4,
          borderRadius: '0 8px 8px 0',
        }}>
          {/* ADDED: Horizontal Steps at the top */}
          <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          {activeStep === 0 && (
            /* Step 1: Choose Signup Method */
            <Box>
              <Typography variant="h5" fontWeight="bold" gutterBottom>
                Create your account
              </Typography>
              
              <Box sx={{ display: 'flex', gap: 2, mb: 3, mt: 2 }}>
                <Chip
                  label="Use Phone"
                  icon={<Phone />}
                  onClick={() => setSignupMethod('phone')}
                  color={signupMethod === 'phone' ? 'primary' : 'default'}
                  sx={{ 
                    fontWeight: 500,
                    px: 2,
                    py: 2.5,
                  }}
                />
                <Chip
                  label="Use Email"
                  icon={<Email />}
                  onClick={() => setSignupMethod('email')}
                  color={signupMethod === 'email' ? 'primary' : 'default'}
                  sx={{ 
                    fontWeight: 500,
                    px: 2,
                    py: 2.5,
                  }}
                />
              </Box>

              {signupMethod === 'phone' ? (
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="Enter Phone Number"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value.replace(/\D/g, '').slice(0, 10))}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Button
                          onClick={handleCountryMenuOpen}
                          sx={{ color: 'text.primary', fontWeight: 500 }}
                        >
                          {countryCode} ▼
                        </Button>
                        <Menu
                          anchorEl={anchorEl}
                          open={Boolean(anchorEl)}
                          onClose={() => handleCountryMenuClose()}
                        >
                          {countryCodes.map((code) => (
                            <MenuItem 
                              key={code} 
                              onClick={() => handleCountryMenuClose(code)}
                              selected={code === countryCode}
                            >
                              {code}
                            </MenuItem>
                          ))}
                        </Menu>
                      </InputAdornment>
                    ),
                  }}
                  sx={{ mb: 2 }}
                />
              ) : (
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="Enter Email Address"
                  type="email"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Email sx={{ color: 'action.active' }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={{ mb: 2 }}
                />
              )}

              <Button
                fullWidth
                variant="contained"
                size="large"
                onClick={handleSendOtp}
                disabled={loading}
                endIcon={<ArrowForward />}
                sx={{ 
                  py: 1.5, 
                  bgcolor: '#fb641b',
                  '&:hover': { bgcolor: '#f4511e' },
                  mb: 2
                }}
              >
                {loading ? 'Sending OTP...' : 'Send OTP'}
              </Button>
            </Box>
          )}

          {activeStep === 1 && (
            /* Step 2: Verify OTP */
            <Box>
              <Typography variant="h5" fontWeight="bold" gutterBottom>
                Verify OTP
              </Typography>
              
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Enter the 6-digit OTP sent to{' '}
                <strong>
                  {signupMethod === 'phone' 
                    ? `${countryCode} ${identifier}` 
                    : identifier
                  }
                </strong>
              </Typography>

              <Button 
                variant="text" 
                onClick={() => setActiveStep(0)}
                sx={{ mb: 2, p: 0, color: '#2874f0', fontWeight: 600 }}
              >
                Change Number/Email
              </Button>

              <Box sx={{ display: 'flex', gap: 1, justifyContent: 'space-between', mb: 3 }}>
                {otp.map((digit, index) => (
                  <TextField
                    key={index}
                    id={`otp-${index}`}
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    inputProps={{
                      maxLength: 1,
                      style: { 
                        textAlign: 'center', 
                        fontSize: '24px',
                        width: '40px',
                        height: '50px',
                        padding: '12px 0'
                      }
                    }}
                    sx={{ width: '50px' }}
                  />
                ))}
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
                <Typography variant="body2" color="text.secondary">
                  Didn't receive OTP?
                </Typography>
                <Button 
                  onClick={handleSendOtp}
                  sx={{ color: '#2874f0', fontWeight: 600 }}
                >
                  Resend OTP
                </Button>
              </Box>

              <Button
                fullWidth
                variant="contained"
                size="large"
                onClick={handleVerifyOtp}
                disabled={loading || otp.join('').length !== 6}
                sx={{ 
                  py: 1.5, 
                  bgcolor: '#fb641b',
                  '&:hover': { bgcolor: '#f4511e' }
                }}
              >
                {loading ? 'Verifying...' : 'Verify & Continue'}
              </Button>
            </Box>
          )}

          {activeStep === 2 && (
            /* Step 3: Complete Profile */
            <Box>
              <Typography variant="h5" fontWeight="bold" gutterBottom>
                Complete Your Profile
              </Typography>
              
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Just a few more details to personalize your experience
              </Typography>

              <TextField
                fullWidth
                label="Full Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Person sx={{ color: 'action.active' }} />
                    </InputAdornment>
                  ),
                }}
                sx={{ mb: 2 }}
              />

              {signupMethod === 'email' && (
                <TextField
                  fullWidth
                  label="Phone Number (Optional)"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Phone sx={{ color: 'action.active' }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={{ mb: 2 }}
                />
              )}

              {signupMethod === 'phone' && (
                <TextField
                  fullWidth
                  label="Email (Optional)"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Email sx={{ color: 'action.active' }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={{ mb: 2 }}
                />
              )}

              <TextField
                fullWidth
                label="Password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock sx={{ color: 'action.active' }} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{ mb: 2 }}
              />

              <TextField
                fullWidth
                label="Confirm Password"
                name="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                value={formData.confirmPassword}
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock sx={{ color: 'action.active' }} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{ mb: 3 }}
              />

              <Alert severity="info" sx={{ mb: 3 }}>
                By creating an account, you agree to our Terms of Use and Privacy Policy
              </Alert>

              <Button
                fullWidth
                variant="contained"
                size="large"
                onClick={handleCompleteProfile}
                disabled={loading}
                sx={{ 
                  py: 1.5, 
                  bgcolor: '#fb641b',
                  '&:hover': { bgcolor: '#f4511e' }
                }}
              >
                {loading ? 'Creating Account...' : 'Create Account'}
              </Button>
            </Box>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default Signup;