import mongoose from "mongoose";
export const connectDB=async()=>{
    await mongoose.connect('mongodb+srv://masabimiskat:Mishkat0325@#@cluster0.sqszxtr.mongodb.net/TaskFlow').then(()=>console.log('DB CONNECTED'));
    
}