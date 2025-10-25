const express = require("express");
const { requireAuth } = require("../../middlewares/authmiddlewares");
const taskCtrl = require("../../controllers/tasks-controller");
const {
  createTaskValidator,
  updateTaskValidator,
} = require("../../validators/taskvalidation");
const handleValidationErrors = require("../../middlewares/validate");

const router = express.Router();
router.use(requireAuth);

//to create a task
router.post(
  "/create",
  createTaskValidator,
  handleValidationErrors,
  taskCtrl.createTask
);

// to get all the tasks
router.get("/all", taskCtrl.getTasks);

//to get task by id
router.get("/:id", taskCtrl.getTaskById);

//to update task
router.patch(
  "/update/:id",
  updateTaskValidator,
  handleValidationErrors,
  taskCtrl.updateTask
);

router.delete("/delete/:id", taskCtrl.deleteTask);

module.exports = router;
