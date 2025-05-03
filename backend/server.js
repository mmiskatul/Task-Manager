import 'dotenv/config';
import userRouter from './routes/userRoutes.js';
import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js'; 
const app = express();
const port = process.env.PORT || 4000;

// MIDDLEWARE
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// DB CONNECT
connectDB();

// Routes
app.use("/api/user",userRouter);

app.get('/', (req, res) => {
  res.send('API WORKING');
});

app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
