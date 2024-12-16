const { db } = require('../config/database');
const express = require('express');
const nodemailer = require('nodemailer');
const router = new express.Router();

// POST route for handling contact form submissions
router.post('/contact', (req, res) => {
    const { firstName, lastName, mobile, email, message } = req.body;

    const query = 'INSERT INTO contacts (firstName, lastName, mobile, email, message) VALUES (?, ?, ?, ?, ?)';

    db.query(query, [firstName, lastName, mobile, email, message], (err, result) => {
        if (err) {
            console.error('Error saving contact information:', err);
            return res.render('index', { alertMessage: 'Server error, please try again later.' });
        }

        // Nodemailer setup for sending email
        const transporter = nodemailer.createTransport({
            service: 'gmail', // You can use another email service if needed
            auth: {
                user: 'productionhouse2201@gmail.com', // Replace with your email
                pass: 'rxgq asts hpfq chws'   // Replace with your email password or app-specific password
            }
        });

        // Define the email options with dynamic recipient
        const mailOptions = {
            from: 'productionhouse2201@gmail.com',
            to: email,  // Use the user's email from the contact form
            subject: 'User Data',
            text: `You have a new contact form submission:\n\nName: ${firstName} ${lastName}\nMobile: ${mobile}\nEmail: ${email}\nMessage: ${message}`
        };

        // Send the email
        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                console.error('Error sending email:', err);
                return res.status(500).send(`
                    <script>
                        alert('Error sending email!');                            
                        window.location.href = '/';                                 
                    </script>
                `);      
            } else {
                return res.status(200).send(`
                    <script>
                        alert('Message sent successfully!');                             
                        window.location.href = '/';                               
                    </script>
                `);      
            }
        });
    });
});

module.exports = router;
