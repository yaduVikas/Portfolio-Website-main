const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors'); // Import CORS

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors()); // Use CORS middleware to allow requests from any origin
app.use(express.static('public')); // Serve static files from 'public' directory

// Handle POST request to /send-email
app.post('/send-email', (req, res) => {
    console.log(req.body); // Debugging line
    const { name, email, phone, message} = req.body;

    // Configure your mail transporter
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'vikaskumaryadu11@gmail.com', // Replace with your email
            pass: 'aulesrtxhevxnsvs'   // Replace with your email password
        }
    });

    const mailOptions = {
        from: email,
        to: 'vikaskumaryadu11@gmail.com',  // Replace with your email
        subject: 'Contact Form Submission',
        text: `Name: ${name}\nEmail: ${email}\nContact:${phone}\nMessage: ${message}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            res.status(500).send('Failed to send email');
        } else {
            res.send('Email sent successfully');
        }
    });
});

// Start server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

