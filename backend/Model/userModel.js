import mongoose from "mongoose";


const userScema= new mongoose.Schema({
    name: {
        type: String,
        required :true
    },
    email:{
        type:String,
        required :true,
        unique: true
    },
    password: {
        type :String ,
        required:true
    }
})
const userModel=mongoose.models  || mongoose.model("user",userScema);

export default userModel;