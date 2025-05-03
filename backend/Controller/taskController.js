import Task from "../Model/TaskModel";
import User from "../Model/userModel";

// CREATE NEW TASK
export const createTask = async (req, res) => {
  try {
    const { title, description, priority, dueDate, completed } = req.body;
    const task = new Task({
      title,
      description,
      priority,
      dueDate,
      completed:
        completed === "yes" || completed === "Yes" || completed === true,
      owner: req.user.id,
    });
    const saved = await task.save();
    res.status(201).json({ success: true, task: saved });
  } catch (err) {
    res.status(400).json({ success: false, massage: err.massage });
  }
};
