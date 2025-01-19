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
    const { name, email, phone, message } = req.body;

    // Validate input
    if (!name || !email || !phone || !message) {
        return res.status(400).send('All fields are required');
    }

    // Configure your mail transporter
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'yaduvikas1111@gmail.com', // Replace with your email
            pass: 'niax tugk lxuu ufqp' // Replace with your App Password
        }
    });

    const mailOptions = {
        from: 'yaduvikas1111@gmail.com', // Use your verified email as the sender
        to: 'yaduvikas1111@gmail.com', // Replace with the recipient email
        subject: 'Contact Form Submission',
        text: `Name: ${name}\nEmail: ${email}\nContact: ${phone}\nMessage: ${message}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            res.status(500).send('Failed to send email. Please try again later.');
        } else {
            console.log('Email sent: ', info.response);
            res.send('Email sent successfully');
        }
    });
});

// Start server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
