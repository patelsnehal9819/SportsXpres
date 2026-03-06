const nodemailer = require('nodemailer');

// Create transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Test connection
transporter.verify((error) => {
  if (error) {
    console.log('❌ Email service error:', error.message);
  } else {
    console.log('✅ Email service ready');
  }
});

// Send welcome email on signup
const sendWelcomeEmail = async (toEmail, userName) => {
  try {
    const mailOptions = {
      from: `"SportsXpress" <${process.env.EMAIL_USER}>`,
      to: toEmail,
      subject: '🎉 Welcome to SportsXpress!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #1976d2; border-radius: 10px;">
          <h1 style="color: #1976d2; text-align: center;">Welcome ${userName}! 🎉</h1>
          <p style="font-size: 16px;">Thank you for joining SportsXpress! Your account has been created successfully.</p>
          <p style="font-size: 16px;">You can now browse thousands of sports products and start shopping.</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="https://solid-fishstick-7v74445764vj3pjgx-3001.app.github.dev/products" 
               style="background-color: #fb641b; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; font-weight: bold;">
              Start Shopping
            </a>
          </div>
          <p style="color: #666; font-size: 14px;">If you didn't create this account, please ignore this email.</p>
        </div>
      `
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`✅ Welcome email sent to ${toEmail}`);
    return true;
  } catch (error) {
    console.log(`❌ Welcome email failed: ${error.message}`);
    return false;
  }
};

// Send login notification
const sendLoginEmail = async (toEmail, userName) => {
  try {
    const mailOptions = {
      from: `"SportsXpress" <${process.env.EMAIL_USER}>`,
      to: toEmail,
      subject: '🔐 New Login to Your SportsXpress Account',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ff9800; border-radius: 10px;">
          <h1 style="color: #ff9800; text-align: center;">Welcome Back ${userName}! 👋</h1>
          <p style="font-size: 16px;">You have successfully logged into your SportsXpress account.</p>
          <p style="font-size: 16px;"><strong>Time:</strong> ${new Date().toLocaleString()}</p>
          <p style="color: #666; font-size: 14px;">If this wasn't you, please contact support immediately.</p>
        </div>
      `
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`✅ Login email sent to ${toEmail}`);
    return true;
  } catch (error) {
    console.log(`❌ Login email failed: ${error.message}`);
    return false;
  }
};

// Send order confirmation email
const sendOrderEmail = async (toEmail, userName, orderDetails) => {
  try {
    // Create items list HTML
    const itemsHtml = orderDetails.items.map(item => `
      <tr>
        <td style="padding: 8px; border-bottom: 1px solid #ddd;">${item.name}</td>
        <td style="padding: 8px; border-bottom: 1px solid #ddd; text-align: center;">${item.quantity}</td>
        <td style="padding: 8px; border-bottom: 1px solid #ddd; text-align: right;">₹${item.price}</td>
      </tr>
    `).join('');

    const mailOptions = {
      from: `"SportsXpress" <${process.env.EMAIL_USER}>`,
      to: toEmail,
      subject: '✅ Order Confirmed - SportsXpress',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #4caf50; border-radius: 10px;">
          <h1 style="color: #4caf50; text-align: center;">Order Confirmed! 🎉</h1>
          <p style="font-size: 16px;">Thank you for your order, ${userName}!</p>
          <p><strong>Order ID:</strong> ${orderDetails.orderId}</p>
          <p><strong>Order Date:</strong> ${new Date().toLocaleDateString()}</p>
          
          <h3>Order Summary:</h3>
          <table style="width:100%; border-collapse:collapse;">
            <thead>
              <tr style="background-color: #f5f5f5;">
                <th style="padding: 8px; text-align: left;">Item</th>
                <th style="padding: 8px; text-align: center;">Qty</th>
                <th style="padding: 8px; text-align: right;">Price</th>
              </tr>
            </thead>
            <tbody>
              ${itemsHtml}
            </tbody>
            <tfoot>
              <tr>
                <td colspan="2" style="padding: 8px; text-align: right;"><strong>Total:</strong></td>
                <td style="padding: 8px; text-align: right;"><strong>₹${orderDetails.total}</strong></td>
              </tr>
            </tfoot>
          </table>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="https://solid-fishstick-7v74445764vj3pjgx-3001.app.github.dev/orders" 
               style="background-color: #1976d2; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; font-weight: bold;">
              Track Your Order
            </a>
          </div>
        </div>
      `
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`✅ Order email sent to ${toEmail}`);
    return true;
  } catch (error) {
    console.log(`❌ Order email failed: ${error.message}`);
    return false;
  }
};

module.exports = {
  sendWelcomeEmail,
  sendLoginEmail,
  sendOrderEmail
};