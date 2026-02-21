const express = require('express');
const router = express.Router();
const {
  registerUser,
  loginUser,
  sendOTP,
  verifyOTP,
  getProfile,
  updateProfile,
} = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/send-otp', sendOTP);
router.post('/verify-otp', verifyOTP);
router.route('/profile')
  .get(protect, getProfile)
  .put(protect, updateProfile);

module.exports = router;
