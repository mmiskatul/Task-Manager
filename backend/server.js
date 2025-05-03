
import express from 'express' 
const app=express();
const port =process.env.PORT || 4000;

// MIDDLEWARE
app.use(express.json());