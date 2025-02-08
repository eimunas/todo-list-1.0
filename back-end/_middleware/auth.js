import jwt from 'jsonwebtoken';
import {SECRET} from "../secret/secret.js";

export const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.status(401).json({message: 'Access denied.'});
    jwt.verify(token, SECRET, (err, user) => {
        if (err) {
            console.error("JWT verification error:", err.message);
            return res.status(403).json({ message: 'Unauthorized.' });
        }
        req.user = user;
        next();
    });
};

