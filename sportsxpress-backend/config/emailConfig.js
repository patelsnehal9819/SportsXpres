const nodemailer = require('nodemailer');

console.log('📧 Email configuration loading...');

// Create transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Verify connection
transporter.verify((error, success) => {
  if (error) {
    console.log('❌ Email connection failed:', error.message);
  } else {
    console.log('✅ Email server ready');
  }
});

// Send welcome email
const sendWelcomeEmail = async (userEmail, userName) => {
  try {
    const mailOptions = {
      from: `"SportsXpress" <${process.env.EMAIL_USER}>`,
      to: userEmail,
      subject: '🎉 Welcome to SportsXpress!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 2px solid #1976d2; border-radius: 10px;">
          <h1 style="color: #1976d2; text-align: center;">Welcome ${userName}! 🎉</h1>
          <p>Thank you for joining SportsXpress! Your account has been created successfully.</p>
          <p>You can now browse thousands of sports products and start shopping.</p>
          <a href="https://solid-fishstick-7v74445764vj3pjgx-3001.app.github.dev/products" 
             style="display: inline-block; background: #fb641b; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
            Start Shopping
          </a>
        </div>
      `
    };
    await transporter.sendMail(mailOptions);
    console.log(`✅ Welcome email sent to ${userEmail}`);
    return true;
  } catch (error) {
    console.log(`❌ Welcome email failed:`, error.message);
    return false;
  }
};

// Send login notification
const sendLoginNotificationEmail = async (userEmail, userName) => {
  try {
    const mailOptions = {
      from: `"SportsXpress" <${process.env.EMAIL_USER}>`,
      to: userEmail,
      subject: '🔐 New Login to Your SportsXpress Account',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 2px solid #ff9800; border-radius: 10px;">
          <h1 style="color: #ff9800; text-align: center;">Welcome Back ${userName}! 👋</h1>
          <p>You have successfully logged into your SportsXpress account.</p>
          <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
        </div>
      `
    };
    await transporter.sendMail(mailOptions);
    console.log(`✅ Login email sent to ${userEmail}`);
    return true;
  } catch (error) {
    console.log(`❌ Login email failed:`, error.message);
    return false;
  }
};

// Send order confirmation
const sendOrderConfirmationEmail = async (userEmail, userName, orderDetails) => {
  try {
    const itemsList = orderDetails.items.map(item => 
      `<tr>
        <td style="padding: 8px; border-bottom: 1px solid #ddd;">${item.name}</td>
        <td style="padding: 8px; border-bottom: 1px solid #ddd; text-align: center;">${item.quantity}</td>
        <td style="padding: 8px; border-bottom: 1px solid #ddd; text-align: right;">₹${item.price}</td>
      </tr>`
    ).join('');

    const mailOptions = {
      from: `"SportsXpress" <${process.env.EMAIL_USER}>`,
      to: userEmail,
      subject: '✅ Order Confirmed - SportsXpress',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 2px solid #4caf50; border-radius: 10px;">
          <h1 style="color: #4caf50; text-align: center;">Order Confirmed! 🎉</h1>
          <p>Thank you for your order, ${userName}!</p>
          <p><strong>Order ID:</strong> ${orderDetails.orderId}</p>
          <table style="width:100%; border-collapse:collapse;">
            <thead><tr><th>Item</th><th>Qty</th><th>Price</th></tr></thead>
            <tbody>${itemsList}</tbody>
            <tfoot><tr><td colspan="2" style="text-align:right;"><strong>Total:</strong></td>
            <td><strong>₹${orderDetails.total}</strong></td></tr></tfoot>
          </table>
        </div>
      `
    };
    await transporter.sendMail(mailOptions);
    console.log(`✅ Order email sent to ${userEmail}`);
    return true;
  } catch (error) {
    console.log(`❌ Order email failed:`, error.message);
    return false;
  }
};

module.exports = {
  sendWelcomeEmail,
  sendLoginNotificationEmail,
  sendOrderConfirmationEmail
};