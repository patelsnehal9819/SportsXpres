require('dotenv').config();
const { sendWelcomeSMS } = require('./services/smsService');

// Replace with your actual phone number (10 digits only)
sendWelcomeSMS('9876543210', 'Test User')
  .then(result => {
    console.log('Test complete:', result ? '✅ SUCCESS' : '❌ FAILED');
  })
  .catch(err => {
    console.error('Error:', err);
  });
