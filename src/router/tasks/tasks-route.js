const express = require("express");
const { requireAuth } = require("../../middlewares/authmiddlewares");
const handleValidationErrors = require("../../middlewares/validate");
const taskCtrl = require("../../controllers/tasks-controller");
const {
  createTaskValidator,
  listTasksValidator,
  taskIdParam,
  updateTaskValidator,
} = require("../../validators/taskvalidation");

const router = express.Router();

router.use(requireAuth);

router.get("/", listTasksValidator, handleValidationErrors, taskCtrl.list);
router.post("/", createTaskValidator, handleValidationErrors, taskCtrl.create);
router.patch(
  "/:id",
  taskIdParam,
  updateTaskValidator,
  handleValidationErrors,
  taskCtrl.update
);
router.delete("/:id", taskIdParam, handleValidationErrors, taskCtrl.remove);

module.exports = router;
