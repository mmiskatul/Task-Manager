import express from 'express';
import registerUser, { getCurrentUser, updatePassword, updateProfile } from '../Controller/userController.js'
import   authMiddleware  from '../middleware/auth.js'

const userRouter=express.Router();


// PUBLIC  LINKS
userRouter.post('/register',registerUser);
userRouter.post('/login',loginUser);

// PRIVATE LINKS
userRouter.post('/me',authMiddleware, getCurrentUser);
userRouter.put('/profile',authMiddleware, updateProfile);
userRouter.put('/password',authMiddleware, updatePassword);