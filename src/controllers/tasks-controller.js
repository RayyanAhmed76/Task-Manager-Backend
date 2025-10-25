const db = require("../db/knex");
const taskService = require("../services/tasks-service");

const createTask = async (req, res, next) => {
  try {
    const { title, description, team_id, assigned_to, status } = req.body;

    const task = await db("tasks")
      .insert({
        title,
        description,
        team_id,
        assigned_to,
        status,
        creator_id: req.session.userId,
      })
      .returning("*");

    res.status(201).json({ task: task[0] });
  } catch (err) {
    next(err);
  }
};

const updateTask = async (req, res, next) => {
  try {
    const task = await taskService.updateTask(req.params.id, req.body);
    res.json({ task });
  } catch (err) {
    next(err);
  }
};

const deleteTask = async (req, res, next) => {
  try {
    await taskService.deleteTask(req.params.id);
    res.json({ message: "Task deleted" });
  } catch (err) {
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
