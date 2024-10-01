const { body, param, validationResult } = require("express-validator");

const validateCreateTodo = [
  body("title")
    .isString()
    .notEmpty()
    .withMessage("The title is required and cannot be empty"),
];

const validateUpdateTodo = [
  param("id").isMongoId().withMessage("ID must be a valid MongoDB ID"),
  body("title")
    .optional()
    .isString()
    .notEmpty()
    .withMessage("Title must be a valid string"),
  body("completed").optional().isBoolean().withMessage("Must be true or false"),
];

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = {
  validateCreateTodo,
  validateUpdateTodo,
  validate,
};
