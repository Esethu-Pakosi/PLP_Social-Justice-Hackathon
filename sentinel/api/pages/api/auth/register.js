import bcrypt from "bcrypt";
import Cors from "cors";
import dotenv from 'dotenv';
dotenv.config();
import dbConnect from '@/utils/dbConnect';
import User from '@/models/User';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        await dbConnect();

        const { fullname, email, phoneNumber, username, password, country, gender, dateOfBirth } = req.body;

        try {
            // Check if user already exists
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ message: 'User already exists' });
            }

            // Hash the password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Create a new user
            const newUser = new User({
                fullname,
                email,
                phoneNumber,
                username,
                password: hashedPassword,
                country,
                gender,
                dateOfBirth
            });

            await newUser.save();

            res.status(201).json({ message: 'User registered successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Server error', error });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}