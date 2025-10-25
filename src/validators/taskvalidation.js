const { body, param, query } = require("express-validator");

const createTaskValidator = [
  body("title").trim().notEmpty().withMessage("Title is required"),
  body("team_id")
    .isInt({ gt: 0 })
    .withMessage("team_id must be a positive integer"),
  body("assigned_to")
    .optional({ nullable: true })
    .isInt({ gt: 0 })
    .withMessage("assigned_to must be an integer"),
  body("due_date")
    .optional({ nullable: true })
    .isISO8601()
    .withMessage("due_date must be a valid date"),
  body("description").optional({ nullable: true }).isString(),
];

const listTasksValidator = [
  query("teamId").optional().isInt({ gt: 0 }).toInt(),
  query("assigneeId").optional().isInt({ gt: 0 }).toInt(),
];

const taskIdParam = [
  param("id").isInt({ gt: 0 }).withMessage("id must be a positive integer"),
];

const updateTaskValidator = [
  body("title").optional().isString(),
  body("description").optional().isString(),
  body("assigned_to").optional({ nullable: true }).isInt({ gt: 0 }),
  body("due_date").optional({ nullable: true }).isISO8601(),
  body("status").optional().isIn(["pending", "in_progress", "completed"]),
];

module.exports = {
  createTaskValidator,
  listTasksValidator,
  taskIdParam,
  updateTaskValidator,
};
