const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST || 'smtp.gmail.com',
  port: process.env.MAIL_PORT || 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD,
  },
});

exports.sendOtpEmail = async (to, otp) => {
  const mailOptions = {
    from: `"Smart Health Monitor" <${process.env.MAIL_USERNAME}>`,
    to,
    subject: 'Your One-Time Password (OTP) for Smart Health Password Reset',
    html: `
      <div style='font-family: Arial, sans-serif; padding: 20px; border: 1px solid #ddd; border-radius: 10px; max-width: 500px;'>
        <h2 style='color: #2563eb;'>Smart Health Password Reset</h2>
        <p>You requested a password reset. Please use the following One-Time Password (OTP) to verify your identity:</p>
        <div style='font-size: 2rem; font-weight: bold; padding: 15px; background: #f3f4f6; text-align: center; border-radius: 8px; margin: 20px 0;'>
          ${otp}
        </div>
        <p>This OTP is valid for 10 minutes. If you did not request this, please ignore this email.</p>
        <hr style='border: none; border-top: 1px solid #ddd; margin-top: 20px;'>
        <p style='font-size: 0.85rem; color: #6b7280;'>© 2026 Smart Health Monitor Project. All rights reserved.</p>
      </div>
    `
  };
  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Email sending failed:', error);
  }
};

exports.sendWelcomeCredentials = async (to, name, role, password) => {
  const mailOptions = {
    from: `"Smart Health Monitor" <${process.env.MAIL_USERNAME}>`,
    to,
    subject: 'Welcome to Smart Health - Your Account Credentials',
    html: `
      <div style='font-family: Arial, sans-serif; padding: 25px; border: 1px solid #3b82f6; border-radius: 12px; max-width: 550px;'>
        <h2 style='color: #2563eb;'>Welcome to the Team, ${name}!</h2>
        <p>An official account has been created for you as a <strong>${role}</strong> on the Smart Health Monitor platform.</p>
        <div style='background: #f8fafc; padding: 20px; border-radius: 10px; margin: 20px 0; border: 1px solid #e2e8f0;'>
          <p style='margin: 0; color: #64748b; font-size: 0.9rem;'>Use the credentials below to log in:</p>
          <p style='margin: 10px 0 5px 0;'><strong>Username/Email:</strong> ${to}</p>
          <p style='margin: 0;'><strong>Initial Password:</strong> <code style='background: #f1f5f9; padding: 2px 5px; border-radius: 4px;'>${password}</code></p>
        </div>
        <p style='color: #ef4444; font-size: 0.9rem;'><strong>Security Tip:</strong> Please change your password immediately after your first login.</p>
        <hr style='border: none; border-top: 1px solid #e2e8f0; margin-top: 20px;'>
        <p style='font-size: 0.8rem; color: #94a3b8;'>© 2026 Smart Health Monitor. Confidentially handled medical operations.</p>
      </div>
    `
  };
  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Email sending failed:', error);
  }
};

exports.sendEmail = async (to, subject, body) => {
  const mailOptions = {
    from: `"Smart Health Monitor" <${process.env.MAIL_USERNAME}>`,
    to,
    subject,
    html: body.replace(/\n/g, '<br>')
  };
  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Email sending failed:', error);
  }
};
