const taskRepo = require("../repositories/tasks-repository");
const { NotFoundError, ValidationError } = require("../utils/apperrors");

const createTask = async (taskData) => {
  try {
    return await taskRepo.createTask(taskData);
  } catch (err) {
    if (err.code === "23503") {
      throw new ValidationError("Invalid team_id or assigned_to");
    }
    throw err;
  }
};

const updateTask = async (id, patch) => {
  const existingTask = await taskRepo.getTaskById(id);
  if (!existingTask) {
    throw new NotFoundError(`Task with id ${id} does not exist`);
  }

  return taskRepo.updateTask(id, patch);
};

const deleteTask = async (id) => {
  const existingTask = await taskRepo.getTaskById(id);
  if (!existingTask) {
    throw new NotFoundError(`Task with id ${id} does not exist`);
  }

  return taskRepo.deleteTask(id);
};

const getTaskById = async (id) => {
  const task = await taskRepo.getTaskById(id);
  if (!task) {
    throw new NotFoundError(`Task with id ${id} does not exist`);
  }
  return task;
};

const getTasks = async (filters) => {
  return taskRepo.getTasks(filters);
};

module.exports = {
  createTask,
  updateTask,
  deleteTask,
  getTaskById,
  getTasks,
};
