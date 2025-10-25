const { body } = require("express-validator");

const registerValidator = [
  body("name").trim().notEmpty().withMessage("Name is required"),
  body("email").isEmail().withMessage("Enter valid email").normalizeEmail(),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be 6+ chars"),
];

const loginValidator = [
  body("email").isEmail().withMessage("Enter valid email").normalizeEmail(),
  body("password").notEmpty().withMessage("Password required"),
];

module.exports = {
  registerValidator,
  loginValidator,
};
