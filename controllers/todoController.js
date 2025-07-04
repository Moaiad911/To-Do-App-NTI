const Todo = require('../models/Todo');

// GET all todos
const getTodos = async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
};

// POST new todo
const createTodo = async (req, res) => {
  const todo = new Todo({ text: req.body.text });
  await todo.save();
  res.status(201).json(todo);
};

// PUT update todo
const updateTodo = async (req, res) => {
  const { id } = req.params;
  const { text, completed } = req.body;

  const updated = await Todo.findByIdAndUpdate(
    id,
    { text, completed },
    { new: true }
  );

  if (!updated) return res.status(404).json({ error: 'Todo not found' });
  res.json(updated);
};

// DELETE todo
const deleteTodo = async (req, res) => {
  const { id } = req.params;
  const deleted = await Todo.findByIdAndDelete(id);
  if (!deleted) return res.status(404).json({ error: 'Todo not found' });

  res.json({ message: 'Deleted successfully' });
};

// Export correctly ✅
module.exports = {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo
};
