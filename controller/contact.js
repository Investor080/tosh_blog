const contactModel = require('../model/contact');
const nodemailer = require('nodemailer');

const contactForm = async (req, res, recipientEmail) => {
    try {
        const {fullname, email, subject, message} = req.body;

        const transporter = nodemailer.createTransport({
            service: "Gmail",
            auth: {
                user: process.env.my_email,
                pass: process.env.pass
            },
        });

        const mailOptions = {
            from: recipientEmail,
            to: process.env.my_email,
            subject: subject || 'Contact Form Submission',
            text:`Name: ${fullname}\nEmail: ${email}\nMessage: ${message}`,
        };
        await transporter.sendMail(mailOptions);
        res.json({ message: 'Contact form submitted successfully' });
    } catch (error) {
        console.log(err)
        return res.status(500).json({error: 'Server Error'})
    }
}


module.exports = contactForm