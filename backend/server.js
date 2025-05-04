import 'dotenv/config';
import userRouter from './routes/userRoutes.js';
import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js'; 
import taskRouter from './routes/taskRoutes.js';
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
app.use("/api/task",taskRouter)
app.get('/', (req, res) => {
  res.send('API WORKING');
});

app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
