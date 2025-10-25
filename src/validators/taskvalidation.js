const { body } = require("express-validator");
const teamRepo = require("../repositories/teams-repository");
const db = require("../db/knex");

// Validator for creating a task
const createTaskValidator = [
  body("title").trim().notEmpty().withMessage("Title is required"),
  body("description").optional().isString(),
  body("team_id")
    .notEmpty()
    .withMessage("team_id is required")
    .bail()
    .custom(async (team_id, { req }) => {
      const team = await teamRepo.getTeamById(team_id);
      if (!team) return Promise.reject("Team does not exist");

      const membership = await db("memberships")
        .where({ team_id, user_id: req.session.userId })
        .first();

      if (!membership)
        return Promise.reject("You are not a member of this team");
    }),
  body("assigned_to")
    .optional()
    .isInt()
    .withMessage("assigned_to must be a number"),
  body("status")
    .optional()
    .isIn(["pending", "in_progress", "completed"])
    .withMessage("Invalid status"),
];

const updateTaskValidator = [
  body("title")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Title cannot be empty"),
  body("description").optional().isString(),
  body("assigned_to")
    .optional()
    .isInt()
    .withMessage("assigned_to must be a number"),
  body("status")
    .optional()
    .isIn(["pending", "in_progress", "completed"])
    .withMessage("Invalid status"),
];

module.exports = {
  createTaskValidator,
  updateTaskValidator,
};
