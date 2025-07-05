const express = require("express");
const authenticate = require("../middleware/authMiddleware");
const {
  getTodos,
  createTodo,
  updateTodo,
  toggleCompleted,
  deleteTodo,
} = require("../controllers/todoController");

const router = express.Router();

router.use(authenticate);

router.get("/todos", getTodos);
router.post("/todos", createTodo);
router.put("/todos/:id", updateTodo);
router.patch("/todos/:id/toggle", toggleCompleted);
router.delete("/todos/:id", deleteTodo);

module.exports = router;
