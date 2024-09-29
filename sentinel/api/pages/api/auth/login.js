import bcrypt from "bcrypt";
import Cors from "cors";
import dotenv from 'dotenv';
dotenv.config();
import jwt from 'jsonwebtoken';
import dbConnect from '@/utils/dbConnect';
import User from '@/models/User';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        await dbConnect();

        const { emailOrUsername, password } = req.body;

        try {
            // Find user by email or username
            const user = await User.findOne({
                $or: [{ email: emailOrUsername }, { username: emailOrUsername }]
            });

            if (!user) {
                return res.status(400).json({ message: 'Invalid credentials' });
            }

            // Check password
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({ message: 'Invalid credentials' });
            }

            // Generate JWT token
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

            res.status(200).json({ message: "Login successful", token, user: { id: user._id, username: user.username, email: user.email } });
        } catch (error) {
            res.status(500).json({ message: 'Server error', error });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}