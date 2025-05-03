import express from 'express';
import registerUser, { getCurrentUser, updatePassword, updateProfile } from '../Controller/userController.js'

const userRouter=express.Router();


// PUBLIC  LINKS
userRouter.post('/register',registerUser);
userRouter.post('/login',loginUser);

// PRIVATE LINKS
userRouter.post('/me',getCurrentUser);
userRouter.put('/profile',updateProfile);
userRouter.put('/password',updatePassword);