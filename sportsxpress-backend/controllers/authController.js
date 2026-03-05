const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

// @desc    Register user
// @route   POST /api/auth/register
const registerUser = async (req, res) => {
  try {
    console.log('📥 REGISTER REQUEST RECEIVED:', req.body);
    
    const { name, email, phone, password, height, weight, age, favoriteSport } = req.body;

    // Validate required fields
    if (!name || !email || !phone || !password) {
      console.log('❌ Missing required fields');
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields'
      });
    }

    // Check if user exists
    const userExists = await User.findOne({ 
      $or: [{ email }, { phone }] 
    });
    
    console.log('🔍 User exists?', userExists ? 'YES' : 'NO');

    if (userExists) {
      console.log('❌ User already exists');
      return res.status(400).json({
        success: false,
        message: 'User already exists with this email or phone. Please login.'
      });
    }

    // Create user
    console.log('📝 Creating user...');
    const user = await User.create({
      name,
      email,
      phone,
      password,
      height,
      weight,
      age,
      favoriteSport,
    });

    console.log('✅ User created successfully:', user._id);

    res.status(201).json({
      success: true,
      message: 'Registration successful! Please login.',
      userId: user._id
    });

  } catch (error) {
    console.log('❌ SERVER ERROR:', error);
    
    // Handle duplicate key error
    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0];
      return res.status(400).json({
        success: false,
        message: `${field} already exists. Please use different ${field}.`
      });
    }

    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Login user
// @route   POST /api/auth/login
const loginUser = async (req, res) => {
  try {
    console.log('📥 LOGIN REQUEST RECEIVED:', req.body.email);
    
    const { email, password } = req.body;

    // Check for user
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      console.log('❌ User not found');
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Check password
    const isPasswordMatch = await user.matchPassword(password);
    console.log('🔑 Password match?', isPasswordMatch ? 'YES' : 'NO');

    if (!isPasswordMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    console.log('✅ Login successful for:', user.email);

    res.json({
      success: true,
      token: generateToken(user._id),
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role || 'user',
      },
    });

  } catch (error) {
    console.log('❌ LOGIN ERROR:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
};