import express from "express";
import { authMiddleware } from "../middleware/auth.js";
import { createTask, deleteTask, getTask, getTaskById, updateTask } from "../Controller/taskController.js";

const taskRouter = express.Router();

// Route for handling tasks collection
taskRouter
  .route("/gp")
  .get(authMiddleware, getTask)  // GET /api/task/gp
  .post(authMiddleware, createTask);  // POST /api/task/gp

// Route for handling individual task by ID
taskRouter
  .route("/tasks/:id")
  .get(authMiddleware, getTaskById) // Get task by ID
  .put(authMiddleware, updateTask) // Update task by ID
  .delete(authMiddleware, deleteTask); // Delete task by ID

export default taskRouter;
