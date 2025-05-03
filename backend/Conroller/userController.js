import mongoose from "mongoose";
import User from "../Model/userModel.js";
import validator from "validator";
import bcrypt, { hash } from "bcrypt";
import { response } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your_JWt_secret_here";
const TOKEN_EXPIRES = "24h";

const createToken = (userId) =>
  jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: TOKEN_EXPIRES });

// REGISTER FUNCTION
export async function registerUser(req, res) {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ success: false, massage: "All fields are required" });
  }
  if (!validator.isEmail(email)) {
    return res.status(400).json({ success: false, massage: "Inavalid Email" });
  }
  if (password.length < 8) {
    return res.status(400).json({
      success: false,
      massage: "Password must Be atleast 8 characters ",
    });
  }
  try {
    if (await User.findOne({ email })) {
      return res
        .status(409)
        .json({ success: false, massage: "User Already exits" });
    }
    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashed });
    const token = createToken(user._id);

    res.status(201).json({
      success: true,
      token,
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (err) {
    console.log(err);
    response.status(500).json({ success: false, massage: "Server error" });
  }
}

// LOGIN FUNCTION
export async function loginUser(req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .json({ success: false, massage: "Email &  password required" });
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(401)
        .json({ success: false, massage: "Invalid Credentials" });
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res
        .status(401)
        .json({ success: false, massage: "Invalid Credentials" });
    }
    const token = createToken(user._id);
    res.json({
      success: true,
      token,
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (err) {
    console.log(err);
    response.status(500).json({ success: false, massage: "Server error" });
  }
}

// GET CURRENT USER
export async function getCurrentUser(req, res) {
  try {
    const user = await User.findById(req.user.id).select("name email ");
    if (!user) {
      return res
        .status(400)
        .json({ success: false, massage: "User Not found" });
    }
    res.json({ success: true, user });
  } catch (err) {
    console.log(err);
    response.status(500).json({ success: false, massage: "Server error" });
  }
}

// UPDATE USER PROFILE

export async function updateProfile(req, res) {
  const { name, email } = req.body;
  if (!name || !email || !validator.isEmail(email)) {
    return res
      .status(400)
      .json({ success: false, massage: "valid  name  & Email required" });
  }
  try {
    const exits = await User.findOne({ email, _id: { $ne: req.user.id } });
    if(exits){
        return res.status(409).json({success:false,massage:"Email already used by another account"});
    }
    const user = await User.findByIdAndUpdate(
        req.user.id,
        {name ,email},
        {new :true , runValidator :true ,select : "name email"}
    );
    req.json({success:true ,user});
  } catch (err) {
    console.log(err);
    response.status(500).json({ success: false, massage: "Server error" });
  }
}
