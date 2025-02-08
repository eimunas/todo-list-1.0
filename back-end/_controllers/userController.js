import { User } from '../_database/models/user.js';
import { SECRET } from "../secret/secret.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const registerUser = async (req, res) => {
    const { username, password } = req.body;

    const existingUser = await User.findOne({ username });
    if (existingUser) return res.status(409).json({ message: "Username is already in use." });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
        username,
        password: hashedPassword
    });

    await user.save();
    const token = jwt.sign({userId: user._id}, SECRET, {expiresIn: "1h"});
    return res.status(201).json({ message: 'User registered successfully!', token });
};

export const loginUser = async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ message: 'User does not exist...' });
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) return res.status(401).json({ message: 'Username or password is incorrect.' });
    const token = jwt.sign({ userId: user._id, username: username }, SECRET, { expiresIn: '1h' });
    return res.status(200).json({ token });
};
