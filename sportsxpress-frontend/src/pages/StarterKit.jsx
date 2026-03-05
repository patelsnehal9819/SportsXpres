import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Stepper,
  Step,
  StepLabel,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Divider,
  Alert,
  Chip,
  Slider,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from '@mui/material';
import {
  SportsCricket,
  SportsSoccer,
  SportsTennis,
  FitnessCenter,
  SportsBasketball,
  DirectionsRun,
  CheckCircle,
  ShoppingCart,
  ArrowForward,
  ArrowBack,
  EmojiEvents,
  School,
  MilitaryTech,
  FlashOn,
  Save,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { formatINR } from '../utils/currencyFormatter';
import toast from 'react-hot-toast';

const StarterKit = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [activeStep, setActiveStep] = useState(0);
  const [selectedSport, setSelectedSport] = useState('');
  const [skillLevel, setSkillLevel] = useState('beginner');
  const [budget, setBudget] = useState(5000);
  const [customizedKit, setCustomizedKit] = useState([]);
  const [saving, setSaving] = useState(false);

  const BASE_URL = 'https://solid-fishstick-7v74445764vj3pjgx-5000.app.github.dev';

  const sportImages = {
    cricket: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    football: 'https://images.unsplash.com/photo-1575361204480-a5d5b7f1f7d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    badminton: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    basketball: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    gym: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    running: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  };

  const cricketImages = {
    bat: 'https://images.unsplash.com/photo-1624526267942-ab0ff8a3e972?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    ball: 'https://images.unsplash.com/photo-1624526267942-ab0ff8a3e972?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    pads: 'https://images.unsplash.com/photo-1624526267942-ab0ff8a3e972?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    gloves: 'https://images.unsplash.com/photo-1624526267942-ab0ff8a3e972?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    helmet: 'https://images.unsplash.com/photo-1624526267942-ab0ff8a3e972?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    bag: 'https://images.unsplash.com/photo-1624526267942-ab0ff8a3e972?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  };

  const footballImages = {
    ball: 'https://images.unsplash.com/photo-1614632537190-5a2d9b63c2c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    shoes: 'https://images.unsplash.com/photo-1511886929837-354d827aae26?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    guards: 'https://images.unsplash.com/photo-1575361204480-a5d5b7f1f7d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    jersey: 'https://images.unsplash.com/photo-1575361204480-a5d5b7f1f7d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  };

  const sports = [
    { id: 'cricket', name: 'Cricket', icon: <SportsCricket />, color: '#4CAF50', image: sportImages.cricket },
    { id: 'football', name: 'Football', icon: <SportsSoccer />, color: '#2196F3', image: sportImages.football },
    { id: 'badminton', name: 'Badminton', icon: <SportsTennis />, color: '#FF9800', image: sportImages.badminton },
    { id: 'basketball', name: 'Basketball', icon: <SportsBasketball />, color: '#F44336', image: sportImages.basketball },
    { id: 'gym', name: 'Gym', icon: <FitnessCenter />, color: '#9C27B0', image: sportImages.gym },
    { id: 'running', name: 'Running', icon: <DirectionsRun />, color: '#00BCD4', image: sportImages.running },
  ];

  const cricketKits = {
    beginner: [
      {
        name: 'Cricket Starter Kit',
        price: 5499,
        image: cricketImages.bat,
        items: [
          { name: 'Cricket Bat', price: 2499, image: cricketImages.bat },
          { name: 'Cricket Ball', price: 599, image: cricketImages.ball },
          { name: 'Batting Pads', price: 1299, image: cricketImages.pads },
          { name: 'Gloves', price: 899, image: cricketImages.gloves },
          { name: 'Helmet', price: 1499, image: cricketImages.helmet },
        ]
      }
    ],
    intermediate: [
      {
        name: 'Pro Cricket Kit',
        price: 12999,
        image: cricketImages.bat,
        items: [
          { name: 'Premium Bat', price: 5999, image: cricketImages.bat },
          { name: 'Pro Pads', price: 2499, image: cricketImages.pads },
          { name: 'Pro Gloves', price: 1499, image: cricketImages.gloves },
          { name: 'Premium Helmet', price: 2499, image: cricketImages.helmet },
          { name: 'Kit Bag', price: 1499, image: cricketImages.bag },
        ]
      }
    ],
    advanced: [
      {
        name: 'Elite Cricket Kit',
        price: 24999,
        image: cricketImages.bat,
        items: [
          { name: 'International Bat', price: 12999, image: cricketImages.bat },
          { name: 'Pro Series Pads', price: 3999, image: cricketImages.pads },
          { name: 'Pro Gloves', price: 2499, image: cricketImages.gloves },
          { name: 'Carbon Helmet', price: 3999, image: cricketImages.helmet },
          { name: 'Premium Bag', price: 2499, image: cricketImages.bag },
        ]
      }
    ]
  };

  const footballKits = {
    beginner: [
      {
        name: 'Football Starter Kit',
        price: 4499,
        image: footballImages.ball,
        items: [
          { name: 'Football', price: 1299, image: footballImages.ball },
          { name: 'Football Shoes', price: 2499, image: footballImages.shoes },
          { name: 'Shin Guards', price: 699, image: footballImages.guards },
        ]
      }
    ],
    intermediate: [
      {
        name: 'Pro Football Kit',
        price: 12999,
        image: footballImages.ball,
        items: [
          { name: 'Match Ball', price: 3499, image: footballImages.ball },
          { name: 'Pro Boots', price: 5999, image: footballImages.shoes },
          { name: 'Pro Guards', price: 1299, image: footballImages.guards },
          { name: 'Team Jersey', price: 2499, image: footballImages.jersey },
        ]
      }
    ],
    advanced: [
      {
        name: 'Elite Football Kit',
        price: 24999,
        image: footballImages.ball,
        items: [
          { name: 'Pro Match Ball', price: 5499, image: footballImages.ball },
          { name: 'Elite Boots', price: 9999, image: footballImages.shoes },
          { name: 'Elite Guards', price: 1999, image: footballImages.guards },
          { name: 'Pro Jersey', price: 3999, image: footballImages.jersey },
          { name: 'GK Gloves', price: 2999, image: footballImages.guards },
        ]
      }
    ]
  };

  const getKitsForSport = () => {
    switch(selectedSport) {
      case 'cricket': return cricketKits;
      case 'football': return footballKits;
      default: return cricketKits;
    }
  };

  const steps = ['Sport', 'Level', 'Budget', 'Choose', 'Review'];
  const currentKits = selectedSport ? getKitsForSport()[skillLevel] : [];

  // ========== NEW: Save kit to backend ==========
  const saveKitToBackend = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      toast.error('Please login to save your kit');
      return false;
    }

    if (customizedKit.length === 0) {
      toast.error('No kit to save');
      return false;
    }

    setSaving(true);
    
    const kitTotal = customizedKit.reduce((sum, item) => sum + item.price, 0);
    const sportName = sports.find(s => s.id === selectedSport)?.name || '';
    
    const kitData = {
      user: user._id,
      sport: selectedSport,
      skillLevel: skillLevel,
      budget: budget,
      selectedKit: {
        name: `${sportName} ${skillLevel} Kit`,
        price: kitTotal,
        items: customizedKit.map(item => ({
          name: item.name,
          price: item.price,
          image: item.image
        }))
      },
      totalPrice: kitTotal
    };

    try {
      const response = await fetch(`${BASE_URL}/api/starter-kit/save`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(kitData)
      });
      
      const data = await response.json();
      if (data.success) {
        console.log('✅ Kit saved to database:', data.kit);
        toast.success('Kit saved to your account!');
        return true;
      }
    } catch (error) {
      console.error('Error saving kit:', error);
      toast.error('Failed to save kit');
    } finally {
      setSaving(false);
    }
    return false;
  };

  // ========== NEW: Auto-save when reaching review step ==========
  useEffect(() => {
    if (activeStep === 4 && customizedKit.length > 0) {
      saveKitToBackend();
    }
  }, [activeStep]);

  const handleNext = () => {
    if (activeStep === 0 && !selectedSport) {
      toast.error('Please select a sport');
      return;
    }
    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const handleSelectKit = (kit) => {
    setCustomizedKit(kit.items);
    toast.success(`${kit.name} selected!`);
  };

  // ========== UPDATED: handleAddToCart with save ==========
  const handleAddToCart = async () => {
    if (customizedKit.length === 0) {
      toast.error('Please select a kit first');
      return;
    }

    const kitTotal = customizedKit.reduce((sum, item) => sum + item.price, 0);
    const sportName = sports.find(s => s.id === selectedSport)?.name || '';
    
    const kitProduct = {
      id: `kit-${Date.now()}`,
      name: `${sportName} ${skillLevel} Kit`,
      price: kitTotal,
      items: customizedKit,
      sport: selectedSport,
    };

    // Save to backend first
    const saved = await saveKitToBackend();
    
    // Add to cart
    addToCart(kitProduct);
    toast.success('Starter kit added to cart!');
    navigate('/cart');
  };

  // ========== NEW: Save button for manual save ==========
  const handleSaveKit = async () => {
    await saveKitToBackend();
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" fontWeight="bold" gutterBottom align="center">
        Build Your Starter Kit
      </Typography>

      <Stepper activeStep={activeStep} sx={{ mb: 3, py: 1 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Paper sx={{ p: 2, borderRadius: 2 }}>
        {/* Step 1: Select Sport */}
        {activeStep === 0 && (
          <Box>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              Choose Your Sport
            </Typography>
            <Grid container spacing={1.5}>
              {sports.map((sport) => (
                <Grid item xs={6} key={sport.id}>
                  <Card
                    onClick={() => setSelectedSport(sport.id)}
                    sx={{
                      cursor: 'pointer',
                      border: selectedSport === sport.id ? `2px solid ${sport.color}` : '1px solid #e0e0e0',
                    }}
                  >
                    <CardMedia component="img" height="100" image={sport.image} />
                    <CardContent sx={{ p: 1, textAlign: 'center' }}>
                      <Box sx={{ color: sport.color }}>{sport.icon}</Box>
                      <Typography variant="body2">{sport.name}</Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}

        {/* Step 2: Skill Level */}
        {activeStep === 1 && (
          <Box>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              Your Skill Level
            </Typography>
            <FormControl component="fieldset" fullWidth>
              <RadioGroup value={skillLevel} onChange={(e) => setSkillLevel(e.target.value)}>
                {['beginner', 'intermediate', 'advanced'].map((level) => (
                  <Card key={level} sx={{ mb: 1, p: 1, borderRadius: 2 }}>
                    <FormControlLabel
                      value={level}
                      control={<Radio />}
                      label={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          {level === 'beginner' && <School />}
                          {level === 'intermediate' && <MilitaryTech />}
                          {level === 'advanced' && <EmojiEvents />}
                          <Typography variant="body2" sx={{ textTransform: 'capitalize' }}>
                            {level}
                          </Typography>
                        </Box>
                      }
                    />
                  </Card>
                ))}
              </RadioGroup>
            </FormControl>
          </Box>
        )}

        {/* Step 3: Budget */}
        {activeStep === 2 && (
          <Box>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              Set Your Budget
            </Typography>
            <Box sx={{ px: 1, mt: 4 }}>
              <Typography gutterBottom align="center">
                <strong>{formatINR(budget)}</strong>
              </Typography>
              <Slider
                value={budget}
                onChange={(e, newValue) => setBudget(newValue)}
                min={2000}
                max={30000}
                step={1000}
                valueLabelDisplay="auto"
                valueLabelFormat={(value) => formatINR(value)}
              />
            </Box>
            <Alert severity="info" sx={{ mt: 2 }}>
              <FlashOn sx={{ mr: 1 }} /> We'll recommend kits within your budget
            </Alert>
          </Box>
        )}

        {/* Step 4: Choose Kit */}
        {activeStep === 3 && selectedSport && (
          <Box>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              Select Your Kit
            </Typography>
            <Grid container spacing={2}>
              {currentKits.map((kit, index) => (
                <Grid item xs={12} key={index}>
                  <Card 
                    sx={{ 
                      border: customizedKit === kit.items ? `2px solid #fb641b` : '1px solid #e0e0e0',
                      cursor: 'pointer',
                    }}
                    onClick={() => handleSelectKit(kit)}
                  >
                    <CardMedia component="img" height="140" image={kit.image} />
                    <CardContent>
                      <Typography variant="subtitle2" fontWeight="bold">{kit.name}</Typography>
                      <Typography variant="h6" color="primary.main" fontWeight="bold">
                        {formatINR(kit.price)}
                      </Typography>
                      <Divider sx={{ my: 1 }} />
                      <Typography variant="caption" color="text.secondary">Includes:</Typography>
                      <List dense>
                        {kit.items.map((item, i) => (
                          <ListItem key={i} disableGutters>
                            <ListItemAvatar>
                              <Avatar src={item.image} sx={{ width: 30, height: 30 }} />
                            </ListItemAvatar>
                            <ListItemText 
                              primary={item.name}
                              secondary={formatINR(item.price)}
                              primaryTypographyProps={{ variant: 'caption' }}
                              secondaryTypographyProps={{ variant: 'caption', color: 'primary.main' }}
                            />
                          </ListItem>
                        ))}
                      </List>
                      {kit.price <= budget && (
                        <Chip label="Within Budget" color="success" size="small" />
                      )}
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}

        {/* Step 5: Review */}
        {activeStep === 4 && (
          <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
              <Typography variant="subtitle1" fontWeight="bold">
                Your Kit
              </Typography>
              <Button
                size="small"
                startIcon={<Save />}
                onClick={handleSaveKit}
                disabled={saving || customizedKit.length === 0}
                sx={{ color: '#1976d2' }}
              >
                {saving ? 'Saving...' : 'Save Kit'}
              </Button>
            </Box>
            {customizedKit.length > 0 ? (
              <>
                <Alert severity="success" sx={{ mb: 2 }}>
                  Great! Here's your kit
                </Alert>
                <Card>
                  <CardMedia
                    component="img"
                    height="160"
                    image={sports.find(s => s.id === selectedSport)?.image}
                  />
                  <CardContent>
                    <Typography variant="subtitle1" fontWeight="bold" color="primary.main">
                      {sports.find(s => s.id === selectedSport)?.name} {skillLevel} Kit
                    </Typography>
                    <Divider sx={{ my: 1 }} />
                    <List>
                      {customizedKit.map((item, index) => (
                        <ListItem key={index} disableGutters>
                          <ListItemAvatar>
                            <Avatar src={item.image} sx={{ width: 40, height: 40 }} />
                          </ListItemAvatar>
                          <ListItemText 
                            primary={item.name}
                            secondary={formatINR(item.price)}
                          />
                        </ListItem>
                      ))}
                    </List>
                    <Divider sx={{ my: 1 }} />
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="subtitle1">Total</Typography>
                      <Typography variant="h6" color="primary.main">
                        {formatINR(customizedKit.reduce((sum, item) => sum + item.price, 0))}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </>
            ) : (
              <Alert severity="warning">Please select a kit first</Alert>
            )}
          </Box>
        )}

        {/* Navigation */}
        <Box sx={{ display: 'flex', gap: 1, mt: 3 }}>
          <Button
            fullWidth
            disabled={activeStep === 0}
            onClick={handleBack}
            variant="outlined"
            startIcon={<ArrowBack />}
            sx={{ borderRadius: 2 }}
          >
            Back
          </Button>
          {activeStep < steps.length - 1 ? (
            <Button
              fullWidth
              variant="contained"
              onClick={handleNext}
              endIcon={<ArrowForward />}
              sx={{ bgcolor: '#1976d2', borderRadius: 2 }}
            >
              Next
            </Button>
          ) : (
            <Button
              fullWidth
              variant="contained"
              onClick={handleAddToCart}
              startIcon={<ShoppingCart />}
              disabled={customizedKit.length === 0 || saving}
              sx={{ bgcolor: '#fb641b', borderRadius: 2 }}
            >
              {saving ? 'Saving...' : 'Add to Cart'}
            </Button>
          )}
        </Box>
      </Paper>
    </Box>
  );
};

export default StarterKit;