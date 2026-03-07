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
    football: 'https://images.pexels.com/photos/274506/pexels-photo-274506.jpeg',
    badminton: 'https://images.pexels.com/photos/8007075/pexels-photo-8007075.jpeg',
    basketball: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    gym: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    running: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  };

  const cricketImages = {
    bat: 'https://images.pexels.com/photos/35825599/pexels-photo-35825599.jpeg',
    ball: 'https://images.pexels.com/photos/30401506/pexels-photo-30401506.jpeg',
    pads: 'https://images.pexels.com/photos/29463867/pexels-photo-29463867.jpeg',
    gloves: 'https://images.pexels.com/photos/31096662/pexels-photo-31096662.jpeg',
    helmet: 'https://images.pexels.com/photos/30401163/pexels-photo-30401163.jpeg',
    bag: 'https://images.pexels.com/photos/27914830/pexels-photo-27914830.jpeg',
  };

  const footballImages = {
    ball: 'https://images.pexels.com/photos/3621104/pexels-photo-3621104.jpeg',
    shoes: 'https://images.pexels.com/photos/7188095/pexels-photo-7188095.jpeg',
    guards: 'https://images.unsplash.com/photo-1575361204480-a5d5b7f1f7d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    jersey: 'https://images.pexels.com/photos/35162974/pexels-photo-35162974.jpeg',
  };

  // ========== FIXED: Badminton Images with working URLs ==========
  const badmintonImages = {
    racket: 'https://images.pexels.com/photos/6307230/pexels-photo-6307230.jpeg',
    shuttle: 'https://images.pexels.com/photos/8007408/pexels-photo-8007408.jpeg',
    shoes: 'https://images.pexels.com/photos/8007173/pexels-photo-8007173.jpeg',
    grip: 'https://images.pexels.com/photos/29873463/pexels-photo-29873463.jpeg',
    bag: 'https://images.pexels.com/photos/33307140/pexels-photo-33307140.jpeg',
  };

  // ========== FIXED: Basketball Images with working URLs ==========
  const basketballImages = {
    ball: 'https://images.pexels.com/photos/1752757/pexels-photo-1752757.jpeg?auto=compress&cs=tinysrgb&w=600',
    shoes: 'https://images.pexels.com/photos/2923624/pexels-photo-2923624.jpeg?auto=compress&cs=tinysrgb&w=600',
    jersey: 'https://images.pexels.com/photos/1198168/pexels-photo-1198168.jpeg',
    hoop: 'https://images.pexels.com/photos/171571/pexels-photo-171571.jpeg?auto=compress&cs=tinysrgb&w=600',
    bag: 'https://images.pexels.com/photos/27914830/pexels-photo-27914830.jpeg?auto=compress&cs=tinysrgb&w=600',
  };

  // ========== FIXED: Gym Images with working URLs ==========
  const gymImages = {
    dumbbells: 'https://images.pexels.com/photos/841130/pexels-photo-841130.jpeg?auto=compress&cs=tinysrgb&w=600',
    bench: 'https://images.pexels.com/photos/416809/pexels-photo-416809.jpeg?auto=compress&cs=tinysrgb&w=600',
    mat: 'https://images.pexels.com/photos/4325462/pexels-photo-4325462.jpeg?auto=compress&cs=tinysrgb&w=600',
    gloves: 'https://images.pexels.com/photos/5384570/pexels-photo-5384570.jpeg?auto=compress&cs=tinysrgb&w=600',
    bag: 'https://images.pexels.com/photos/27914830/pexels-photo-27914830.jpeg?auto=compress&cs=tinysrgb&w=600',
  };

  // ========== FIXED: Running Images with working URLs ==========
  const runningImages = {
    shoes: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=600',
    shorts: 'https://images.pexels.com/photos/8180657/pexels-photo-8180657.jpeg?auto=compress&cs=tinysrgb&w=600',
    bottle: 'https://images.pexels.com/photos/593099/pexels-photo-593099.jpeg?auto=compress&cs=tinysrgb&w=600',
    belt: 'https://images.pexels.com/photos/9687152/pexels-photo-9687152.jpeg?auto=compress&cs=tinysrgb&w=600',
    cap: 'https://images.pexels.com/photos/9558758/pexels-photo-9558758.jpeg?auto=compress&cs=tinysrgb&w=600',
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

  // ========== Badminton Kits ==========
  const badmintonKits = {
    beginner: [
      {
        name: 'Badminton Starter Kit',
        price: 3499,
        image: badmintonImages.racket,
        items: [
          { name: 'Badminton Racket', price: 1299, image: badmintonImages.racket },
          { name: 'Shuttlecocks (6)', price: 599, image: badmintonImages.shuttle },
          { name: 'Badminton Shoes', price: 1599, image: badmintonImages.shoes },
        ]
      }
    ],
    intermediate: [
      {
        name: 'Pro Badminton Kit',
        price: 8999,
        image: badmintonImages.racket,
        items: [
          { name: 'Pro Racket', price: 3499, image: badmintonImages.racket },
          { name: 'Tournament Shuttles', price: 999, image: badmintonImages.shuttle },
          { name: 'Pro Shoes', price: 2999, image: badmintonImages.shoes },
          { name: 'Grip & Accessories', price: 499, image: badmintonImages.grip },
          { name: 'Racket Bag', price: 999, image: badmintonImages.bag },
        ]
      }
    ],
    advanced: [
      {
        name: 'Elite Badminton Kit',
        price: 17999,
        image: badmintonImages.racket,
        items: [
          { name: 'Carbon Fiber Racket', price: 6999, image: badmintonImages.racket },
          { name: 'Premium Shuttles', price: 1499, image: badmintonImages.shuttle },
          { name: 'Elite Shoes', price: 4999, image: badmintonImages.shoes },
          { name: 'Pro Grip Set', price: 999, image: badmintonImages.grip },
          { name: 'Tournament Bag', price: 1999, image: badmintonImages.bag },
        ]
      }
    ]
  };

  // ========== Basketball Kits ==========
  const basketballKits = {
    beginner: [
      {
        name: 'Basketball Starter Kit',
        price: 3999,
        image: basketballImages.ball,
        items: [
          { name: 'Basketball', price: 1499, image: basketballImages.ball },
          { name: 'Basketball Shoes', price: 1999, image: basketballImages.shoes },
          { name: 'Jersey Set', price: 499, image: basketballImages.jersey },
        ]
      }
    ],
    intermediate: [
      {
        name: 'Pro Basketball Kit',
        price: 9999,
        image: basketballImages.ball,
        items: [
          { name: 'Pro Basketball', price: 2999, image: basketballImages.ball },
          { name: 'Pro Shoes', price: 3999, image: basketballImages.shoes },
          { name: 'Pro Jersey', price: 1499, image: basketballImages.jersey },
          { name: 'Ankle Braces', price: 999, image: basketballImages.shoes },
          { name: 'Sports Bag', price: 499, image: basketballImages.bag },
        ]
      }
    ],
    advanced: [
      {
        name: 'Elite Basketball Kit',
        price: 19999,
        image: basketballImages.ball,
        items: [
          { name: 'NBA Official Ball', price: 4999, image: basketballImages.ball },
          { name: 'Signature Shoes', price: 6999, image: basketballImages.shoes },
          { name: 'Team Jersey', price: 2999, image: basketballImages.jersey },
          { name: 'Knee Pads', price: 1999, image: basketballImages.hoop },
          { name: 'Premium Bag', price: 1999, image: basketballImages.bag },
        ]
      }
    ]
  };

  // ========== Gym Kits ==========
  const gymKits = {
    beginner: [
      {
        name: 'Gym Starter Kit',
        price: 4499,
        image: gymImages.dumbbells,
        items: [
          { name: 'Dumbbell Set (5kg)', price: 1999, image: gymImages.dumbbells },
          { name: 'Yoga Mat', price: 999, image: gymImages.mat },
          { name: 'Gym Gloves', price: 499, image: gymImages.gloves },
          { name: 'Resistance Bands', price: 999, image: gymImages.dumbbells },
        ]
      }
    ],
    intermediate: [
      {
        name: 'Pro Gym Kit',
        price: 12999,
        image: gymImages.dumbbells,
        items: [
          { name: 'Adjustable Dumbbells', price: 4999, image: gymImages.dumbbells },
          { name: 'Weight Bench', price: 3999, image: gymImages.bench },
          { name: 'Premium Mat', price: 1499, image: gymImages.mat },
          { name: 'Pro Gloves', price: 999, image: gymImages.gloves },
          { name: 'Gym Bag', price: 1499, image: gymImages.bag },
        ]
      }
    ],
    advanced: [
      {
        name: 'Elite Gym Kit',
        price: 24999,
        image: gymImages.dumbbells,
        items: [
          { name: 'Full Dumbbell Set', price: 8999, image: gymImages.dumbbells },
          { name: 'Pro Bench Press', price: 6999, image: gymImages.bench },
          { name: 'Premium Mat', price: 1999, image: gymImages.mat },
          { name: 'Pro Gloves', price: 1499, image: gymImages.gloves },
          { name: 'Premium Gym Bag', price: 1999, image: gymImages.bag },
        ]
      }
    ]
  };

  // ========== Running Kits ==========
  const runningKits = {
    beginner: [
      {
        name: 'Running Starter Kit',
        price: 3999,
        image: runningImages.shoes,
        items: [
          { name: 'Running Shoes', price: 2499, image: runningImages.shoes },
          { name: 'Running Shorts', price: 799, image: runningImages.shorts },
          { name: 'Water Bottle', price: 699, image: runningImages.bottle },
        ]
      }
    ],
    intermediate: [
      {
        name: 'Pro Running Kit',
        price: 8999,
        image: runningImages.shoes,
        items: [
          { name: 'Pro Running Shoes', price: 4999, image: runningImages.shoes },
          { name: 'Pro Shorts', price: 1499, image: runningImages.shorts },
          { name: 'Hydration Belt', price: 1299, image: runningImages.belt },
          { name: 'Running Cap', price: 1199, image: runningImages.cap },
        ]
      }
    ],
    advanced: [
      {
        name: 'Elite Running Kit',
        price: 17999,
        image: runningImages.shoes,
        items: [
          { name: 'Elite Running Shoes', price: 8999, image: runningImages.shoes },
          { name: 'Pro Shorts', price: 1999, image: runningImages.shorts },
          { name: 'Premium Hydration Pack', price: 2999, image: runningImages.belt },
          { name: 'Pro Cap', price: 1499, image: runningImages.cap },
          { name: 'GPS Watch', price: 2499, image: runningImages.bottle },
        ]
      }
    ]
  };

  const getKitsForSport = () => {
    switch(selectedSport) {
      case 'cricket': return cricketKits;
      case 'football': return footballKits;
      case 'badminton': return badmintonKits;
      case 'basketball': return basketballKits;
      case 'gym': return gymKits;
      case 'running': return runningKits;
      default: return cricketKits;
    }
  };

  const steps = ['Sport', 'Level', 'Budget', 'Choose', 'Review'];
  const currentKits = selectedSport ? getKitsForSport()[skillLevel] : [];

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

  const handleAddToCart = async () => {
    if (customizedKit.length === 0) {
      toast.error('Please select a kit first');
      return;
    }

    const kitTotal = customizedKit.reduce((sum, item) => sum + item.price, 0);
    const sportName = sports.find(s => s.id === selectedSport)?.name || '';
    
    const kitProduct = {
      _id: `kit-${Date.now()}`,
      id: `kit-${Date.now()}`,
      name: `${sportName} ${skillLevel} Kit`,
      price: kitTotal,
      quantity: 1,
      items: customizedKit,
      sport: selectedSport,
      category: 'kit',
      image: sports.find(s => s.id === selectedSport)?.image || sportImages[selectedSport],
      brand: 'SportsXpress'
    };

    console.log('🛒 Adding kit to cart:', kitProduct);

    const saved = await saveKitToBackend();
    
    addToCart(kitProduct);
    toast.success('Starter kit added to cart!');
    
    setTimeout(() => {
      navigate('/cart');
    }, 500);
  };

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