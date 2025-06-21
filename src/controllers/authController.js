import User from '../models/User.js';
import UserVerification from '../models/UserVerification.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import dotenv from 'dotenv';
import sendEmail from '../utils/sendEmail.js';

dotenv.config();

export const signup = async (req, res) => {
    if (!req.body || !req.body.name) {
        return res.status(400).json({ msg: 'User name is required.' });
    }
    const { name, email, password, ph_no, purpose } = req.body;
    try {
        let user = await User.findOne({ email });

        // CASE 1: User exists and is already verified.
        if (user && user.verified) {
            return res.status(400).json({ msg: 'This email is already registered. Please log in.' });
        }

        // CASE 2: User exists but is NOT verified.
        if (user && !user.verified) {
            // Check for a recent, valid verification link.
            const existingVerification = await UserVerification.findOne({ user_id: user._id }).sort({ createdAt: -1 });
            
            if (existingVerification) {
                const fifteenMinutes = 15 * 60 * 1000;
                const timeDifference = new Date() - existingVerification.createdAt;

                if (timeDifference < fifteenMinutes) {
                    return res.status(400).json({ msg: 'A verification link was recently sent to this email. Please check your inbox and spam folder. It will be valid for 15 minutes.' });
                }
            }
        }

        // CASE 3: User is new. Create them.
        if (!user) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            user = new User({ name, email, password: hashedPassword, ph_no, purpose });
            await user.save();
        }

        // --- At this point, we have a user who needs a verification link ---

        const verificationLink = uuidv4();
        const newVerification = new UserVerification({
            user_id: user._id,
            link: verificationLink
        });
        await newVerification.save();

        const verifyUrl = `https://dev.oilnwine.tech/verify?userId=${user._id}&link=${verificationLink}`;
        const message = `
            <h1>Welcome to LyricVerse!</h1>
            <p>Thank you for registering. Please click the link below to verify your email address:</p>
            <a href="${verifyUrl}" style="background-color: #4CAF50; color: white; padding: 14px 25px; text-align: center; text-decoration: none; display: inline-block;">Verify Email</a>
            <p>This link will expire in 15 minutes.</p>
        `;

        try {
            await sendEmail({
                email: user.email,
                subject: 'Email Verification - LyricVerse',
                html: message,
            });
    
            res.status(200).json({ msg: 'A verification link has been sent to your email. Please check your inbox.' });

        } catch (error) {
            console.error(error);
            return res.status(500).json({ msg: 'Account processed, but verification email could not be sent.' });
        }

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        if (user && !user.verified) {
            // Check for a recent, valid verification link.
            const existingVerification = await UserVerification.findOne({ user_id: user._id }).sort({ createdAt: -1 });
            
            if (existingVerification) {
                const fifteenMinutes = 15 * 60 * 1000;
                const timeDifference = new Date() - existingVerification.createdAt;

                if (timeDifference < fifteenMinutes) {
                    return res.status(400).json({ msg: 'A verification link was recently sent to this email. Please check your inbox and spam folder. It will be valid for 15 minutes.' });
                }
            }
        }

        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '5h' },
            (err, token) => {
                if (err) throw err;
                res.json({ token });
            }
        );

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
};

export const verifyEmail = async (req, res) => {
    try {
        console.log('--- Email Verification Started ---');
        console.log('Searching for User ID:', req.query.userId);
        console.log('Searching for Link ID:', req.query.link);

        const verificationRecord = await UserVerification.findOne({
            user_id: req.query.userId,
            link: req.query.link,
        });

        if (!verificationRecord) {
            console.log('Verification record NOT FOUND in database.');
            return res.status(400).send('Invalid or expired verification link.');
        }

        console.log('Verification record found:', verificationRecord);

        const updateResult = await User.updateOne({ _id: req.query.userId }, { verified: true });
        
        console.log('Database update result:', updateResult);

        if (updateResult.modifiedCount === 0) {
            console.log('Warning: User document was found but not modified. It might have already been verified.');
        } else {
            console.log('User document successfully updated to verified: true');
        }

        await UserVerification.deleteOne({ _id: verificationRecord._id });
        console.log('Verification record has been deleted.');
        console.log('--- Email Verification Finished ---');

        res.send('Email verified successfully. You can now log in.');

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
}; 