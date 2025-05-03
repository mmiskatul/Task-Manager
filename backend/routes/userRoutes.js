import express from 'express';
import {
  registerUser,
  loginUser,
  getCurrentUser,
  updatePassword,
  updateProfile,
} from '../Controller/userController.js';
import { authMiddleware } from '../middleware/auth.js';

const userRouter = express.Router();

// PUBLIC ROUTES
userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);

// PRIVATE ROUTES
userRouter.post('/me', authMiddleware, getCurrentUser);
userRouter.put('/profile', authMiddleware, updateProfile);
userRouter.put('/password', authMiddleware, updatePassword);

export default userRouter;
