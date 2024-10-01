const express = require("express");
const {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
} = require("../controllers/todoController");
const {
  validateCreateTodo,
  validateUpdateTodo,
  validate,
} = require("../middlewares/validationMiddleware");

const router = express.Router();

router.get("/todos", getTodos);
router.post("/todos", validateCreateTodo, validate, createTodo);
router.put("/todos/:id", validateUpdateTodo, validate, updateTodo);
router.delete("/todos/:id", deleteTodo);

module.exports = router;
