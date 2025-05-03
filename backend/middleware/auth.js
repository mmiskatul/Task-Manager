import jwt from 'jsonwebtoken';
import User from '../Model/userModel.js';


const JWT_SECRET = process.env.JWT_SECRET || "your_JWt_secret_here";


export async function authMiddleware(req,res,next){
    // GRAB THE BEARER TOKEN FROM AUTHORIZATION  HEADER
    const  authHeader=req.headers.authorization;
    if(!authHeader || !authHeader.startsWith('Bearer ')){
        return res.status(401).json({success:false,massage:"NOt Authorized token missing"});
    }
    const token =authHeader.split(' ')[1];

    // VERIFY &  ATTACH  USER OBJECT
    try{
        const payLoad=jwt.verify(token,JWT_SECRET);
        const user =await User.findById(payLoad.id).select('-password');

        if(!user){
            return res.status(401).json({success:false,massage :"User Not Found"});
        }
        req.user=user;
        next();
    }catch(err){
        console.log("JWt verification Failed");
        return res.status(401).json({success:false,massage:"Token invalide or Expired"});
    }
}