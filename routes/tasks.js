const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/authMiddleware");

router.use(authenticate);

// Get all tasks for the logged-in user
router.get("/", (req, res) => {
  const tasks = readTasks();
  const userTasks = tasks.filter((task) => task.userId === req.userId);
  res.json(userTasks);
});

// Add a new task for the logged-in user
router.post("/", (req, res) => {
  const tasks = readTasks();
  const newTask = {
    id: Date.now(),
    text: req.body.text,
    done: false,
    userId: req.userId,
  };
  tasks.push(newTask);
  writeTasks(tasks);
  res.status(201).json(newTask);
});

// Update task text (only if it belongs to the user)
router.put("/:id", (req, res) => {
  const tasks = readTasks();
  const taskId = parseInt(req.params.id);
  const updatedTasks = tasks.map((task) =>
    task.id === taskId && task.userId === req.userId
      ? { ...task, text: req.body.text }
      : task
  );
  writeTasks(updatedTasks);
  res.json({ message: "Task updated" });
});

// Toggle task done/undone (only if it belongs to the user)
router.patch("/:id/done", (req, res) => {
  const tasks = readTasks();
  const taskId = parseInt(req.params.id);
  const updatedTasks = tasks.map((task) =>
    task.id === taskId && task.userId === req.userId
      ? { ...task, done: !task.done }
      : task
  );
  writeTasks(updatedTasks);
  res.json({ message: "Task marked done/undone" });
});

// Delete task (only if it belongs to the user)
router.delete("/:id", (req, res) => {
  const tasks = readTasks();
  const taskId = parseInt(req.params.id);
  const filteredTasks = tasks.filter(
    (task) => !(task.id === taskId && task.userId === req.userId)
  );
  writeTasks(filteredTasks);
  res.json({ message: "Task deleted" });
});

module.exports = router;
