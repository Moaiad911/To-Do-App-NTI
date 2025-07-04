const express = require('express');
const router = express.Router();
const controller = require('../controllers/todoController');

// These must all point to valid controller functions
router.get('/todos', controller.getTodos);
router.post('/todos', controller.createTodo);
router.put('/todos/:id', controller.updateTodo);
router.delete('/todos/:id', controller.deleteTodo);

module.exports = router;

console.log('Controller:', controller);