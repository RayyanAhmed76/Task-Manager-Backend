const { body } = require("express-validator");

const createTeamValidator = [
  body("name").trim().notEmpty().withMessage("Team name is required"),
  body("description")
    .optional()
    .trim()
    .isString()
    .withMessage("Description must be a string"),
];

module.exports = {
  createTeamValidator,
};
