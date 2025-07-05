const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "../data/tasks.json");

function readTasks() {
  if (!fs.existsSync(filePath)) return [];
  const data = fs.readFileSync(filePath);
  return JSON.parse(data || "[]");
}

function writeTasks(tasks) {
  fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2));
}

function getTodos(req, res) {
  const tasks = readTasks();
  const userTasks = tasks.filter((task) => task.userId === req.userId);
  res.json(userTasks);
}

function createTodo(req, res) {
  const tasks = readTasks();
  const newTask = {
    id: Date.now(),
    text: req.body.text,
    completed: false,
    userId: req.userId,
  };
  tasks.push(newTask);
  writeTasks(tasks);
  res.status(201).json(newTask);
}

function updateTodo(req, res) {
  const tasks = readTasks();
  const taskId = parseInt(req.params.id);
  let updated = null;
  const updatedTasks = tasks.map((task) => {
    if (task.id === taskId && task.userId === req.userId) {
      updated = { ...task, text: req.body.text, completed: req.body.completed };
      return updated;
    }
    return task;
  });
  if (!updated) return res.status(404).json({ error: "Todo not found" });
  writeTasks(updatedTasks);
  res.json(updated);
}

function toggleCompleted(req, res) {
  const tasks = readTasks();
  const taskId = parseInt(req.params.id);
  let updated = null;
  const updatedTasks = tasks.map((task) => {
    if (task.id === taskId && task.userId === req.userId) {
      updated = { ...task, completed: !task.completed };
      return updated;
    }
    return task;
  });
  if (!updated) return res.status(404).json({ error: "Todo not found" });
  writeTasks(updatedTasks);
  res.json(updated);
}

function deleteTodo(req, res) {
  const tasks = readTasks();
  const taskId = parseInt(req.params.id);
  const exists = tasks.some(
    (task) => task.id === taskId && task.userId === req.userId
  );
  if (!exists) return res.status(404).json({ error: "Todo not found" });
  const filteredTasks = tasks.filter(
    (task) => !(task.id === taskId && task.userId === req.userId)
  );
  writeTasks(filteredTasks);
  res.json({ message: "Deleted successfully" });
}

module.exports = {
  readTasks,
  writeTasks,
  getTodos,
  createTodo,
  updateTodo,
  toggleCompleted,
  deleteTodo,
};
