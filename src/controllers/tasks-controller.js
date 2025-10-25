const taskService = require("../services/tasks-service");
const {
  NotFoundError,
  ValidationError,
  ConflictError,
} = require("../utils/apperrors");

const createTask = async (req, res, next) => {
  try {
    const { title, description, team_id, assigned_to, status } = req.body;

    const task = await taskService.createTask({
      title,
      description,
      team_id,
      assigned_to,
      status,
      creator_id: req.session.userId,
    });

    res.status(201).json({ task });
  } catch (err) {
    if (err instanceof ValidationError || err instanceof ConflictError) {
      return res.status(err.statusCode).json({ error: err.message });
    }
    next(err);
  }
};

const updateTask = async (req, res, next) => {
  try {
    const task = await taskService.updateTask(req.params.id, req.body);
    res.json({ task });
  } catch (err) {
    if (err instanceof NotFoundError || err instanceof ValidationError) {
      return res.status(err.statusCode).json({ error: err.message });
    }
    next(err);
  }
};

const deleteTask = async (req, res, next) => {
  try {
    await taskService.deleteTask(req.params.id);
    res.json({ message: "Task deleted" });
  } catch (err) {
    if (err instanceof NotFoundError) {
      return res.status(err.statusCode).json({ error: err.message });
    }
    next(err);
  }
};

const getTasks = async (req, res, next) => {
  try {
    const tasks = await taskService.getTasks(req.query);
    res.json({ tasks });
  } catch (err) {
    next(err);
  }
};

const getTaskById = async (req, res, next) => {
  try {
    const task = await taskService.getTaskById(req.params.id);
    res.json({ task });
  } catch (err) {
    if (err instanceof NotFoundError) {
      return res.status(err.statusCode).json({ error: err.message });
    }
    next(err);
  }
};

module.exports = {
  createTask,
  updateTask,
  deleteTask,
  getTasks,
  getTaskById,
};
