import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const sendEmail = async (options) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER, // Your Gmail address from .env
            pass: process.env.EMAIL_PASS, // Your Gmail App Password from .env
        },
    });

    const mailOptions = {
        from: `"LyricVerse" <${process.env.EMAIL_USER}>`,
        to: options.email,
        subject: options.subject,
        html: options.html,
    };

    await transporter.sendMail(mailOptions);
    console.log('Verification email sent successfully.');
};

export default sendEmail; 