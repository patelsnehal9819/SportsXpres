const axios = require('axios');

const sendSMS = async (phoneNumber, message) => {
  try {
    // Check if API key exists
    if (!process.env.FAST2SMS_API_KEY) {
      console.error('❌ FAST2SMS_API_KEY not found in .env file');
      return false;
    }

    // Clean phone number (remove +91, spaces, etc.)
    const cleanNumber = phoneNumber.toString().replace(/\D/g, '');
    
    console.log(`📱 Sending SMS to: ${cleanNumber}`);
    console.log(`📱 Message: ${message}`);

    const response = await axios.get('https://www.fast2sms.com/dev/bulkV2', {
      params: {
        authorization: process.env.FAST2SMS_API_KEY,
        route: 'v3',
        sender_id: 'FTWSMS',
        message: message,
        language: 'english',
        flash: 0,
        numbers: cleanNumber
      }
    });
    
    console.log('✅ SMS API Response:', response.data);
    
    if (response.data && response.data.return === true) {
      console.log(`✅ SMS sent successfully to ${cleanNumber}`);
      return true;
    } else {
      console.error('❌ SMS API returned error:', response.data);
      return false;
    }
  } catch (error) {
    console.error('❌ SMS failed:');
    if (error.response) {
      console.error('   Response data:', error.response.data);
      console.error('   Status:', error.response.status);
    } else if (error.request) {
      console.error('   No response received:', error.request);
    } else {
      console.error('   Error:', error.message);
    }
    return false;
  }
};

const sendWelcomeSMS = (phone, name) => {
  if (!phone) {
    console.log('❌ No phone number provided');
    return Promise.resolve(false);
  }
  const message = `Welcome to SportsXpress, ${name}! Your account has been created successfully. Start shopping now! - SportsXpress`;
  return sendSMS(phone, message);
};

const sendLoginSMS = (phone, name) => {
  if (!phone) {
    console.log('❌ No phone number provided');
    return Promise.resolve(false);
  }
  const message = `New login detected on your SportsXpress account, ${name} at ${new Date().toLocaleString()}. If this wasn't you, please contact support. - SportsXpress`;
  return sendSMS(phone, message);
};

const sendOrderSMS = (phone, name, orderId, total) => {
  if (!phone) {
    console.log('❌ No phone number provided');
    return Promise.resolve(false);
  }
  const message = `Order Confirmed! Hi ${name}, your order #${orderId} for ₹${total} has been placed successfully. Track your order at SportsXpress.`;
  return sendSMS(phone, message);
};

module.exports = {
  sendWelcomeSMS,
  sendLoginSMS,
  sendOrderSMS
};
