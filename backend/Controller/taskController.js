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

// GET ALL TASK FOR LOGGED IN USER
export const getTask = async (req, res) => {
  try {
    const tasks = await Task.Find({ owner: req.user.id }).sort({
      createdAt: -1,
    });
    res.json({ success: true, tasks });
  } catch (err) {
    res.status(500).json({ success: false, massage: err.massage });
  }
};

// GET SINGLE TASK BY ID(MUST BELONG TO PARTICULAR USER)
export const getTaskById = async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, owner: req.user.id });
    if (!task)
      return res
        .status(404)
        .json({ success: false, massage: "Task is NOt Found" });
    res.json({ success: true, task });
  } catch (err) {
    res.status(500).json({ success: false, massage: err.massage });
  }
};

// UPDATE TASK
export const updateTask = async (req, res) => {
  try {
    const data = { ...req.body };
    if (data.completed !== undefined) {
      data.completed =
        data.completed === "yes" ||
        data.completed === "Yes" ||
        data.completed == true;
    }
    const updated = await task.findOneAndUpdate(
      { id: req.params.id, owner: req.user.id },
      data,
      { new: true, runValidator: true }
    );

    if (!update)
      return res
        .status(404)
        .json({ success: false, massage: "Task Not Found or not yours" });
    res.json({ success: true, task: updated });
  } catch (err) {
    res.status(500).json({ success: false, massage: err.massage });
  }
};
