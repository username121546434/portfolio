const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: ['https://personal-website-admin-panel.vercel.app', 'http://localhost:5173'],
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Serve static files from .well-known directory with proper CORS headers
app.get('/.well-known/admin-panel-verification.txt', (req, res) => {
  try {
    // Read the verification file from the filesystem
    const filePath = path.join(__dirname, '.well-known', 'admin-panel-verification.txt');
    
    if (fs.existsSync(filePath)) {
      const fileContent = fs.readFileSync(filePath, 'utf8');
      
      // Set CORS headers specifically for this endpoint
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET');
      res.header('Access-Control-Allow-Headers', 'Content-Type');
      
      res.type('text/plain').send(fileContent);
    } else {
      res.status(404).send('Verification file not found');
    }
  } catch (error) {
    console.error('Error serving verification file:', error);
    res.status(500).send('Error serving verification file');
  }
});

// Email sending handler (same as in the serverless function)
const sendEmail = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Validate input
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Please provide all required fields' });
    }

    // Email transporter setup
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.EMAIL_PORT || '587'),
      secure: process.env.EMAIL_SECURE === 'true',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      // Add explicit TLS options to resolve SSL issues
      tls: {
        // Do not fail on invalid certificates
        rejectUnauthorized: false,
        // Force specific TLS version to prevent version mismatch
        minVersion: 'TLSv1.2'
      }
    });

    const mailOptions = {
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
      to: process.env.EMAIL_RECIPIENT || process.env.EMAIL_USER,
      subject: `Portfolio Contact: Message from ${name}`,
      text: `
        Name: ${name}
        Email: ${email}
        
        Message:
        ${message}
      `,
      html: `
        <h3>New Message from Your Portfolio Contact Form</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    };

    // Send the email
    await transporter.sendMail(mailOptions);
    
    return res.status(200).json({ 
      success: true, 
      message: 'Email sent successfully' 
    });
  } catch (error) {
    console.error('Error sending email:', error);
    
    return res.status(500).json({ 
      success: false, 
      message: 'Failed to send email',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
};

// API endpoint for sending emails
app.post('/api/contact', sendEmail);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 