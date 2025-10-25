const { body, param } = require("express-validator");

const createTeamValidator = [
  body("name").trim().notEmpty().withMessage("Team name is required"),
];

const teamIdParam = [
  param("id").isInt({ gt: 0 }).withMessage("id must be a positive integer"),
];

const addMemberValidator = [
  body("user_id")
    .isInt({ gt: 0 })
    .withMessage("user_id must be a positive integer"),
];

module.exports = {
  createTeamValidator,
  teamIdParam,
  addMemberValidator,
};
