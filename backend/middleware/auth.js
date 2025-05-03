import jwt from 'jsonwebtoken';
import User from '../Model/userModel.js';

const JWT_SECRET = process.env.JWT_SECRET || "your_JWT_secret_here";

export async function authMiddleware(req, res, next) {
  // GRAB THE BEARER TOKEN FROM AUTHORIZATION HEADER
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: "Not authorized, token missing" });
  }

  const token = authHeader.split(' ')[1];

  try {
    // VERIFY & ATTACH USER OBJECT
    const payload = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(payload.id).select('-password');

    if (!user) {
      return res.status(401).json({ success: false, message: "User not found" });
    }

    req.user = user;
    next();
  } catch (err) {
    console.error("JWT verification failed:", err.message);
    return res.status(401).json({ success: false, message: "Token invalid or expired" });
  }
}
