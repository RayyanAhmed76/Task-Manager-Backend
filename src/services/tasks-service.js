const taskRepo = require("../repositories/tasks-repository");

const createTask = async (taskData) => {
  try {
    return await taskRepo.createTask(taskData);
  } catch (err) {
    if (err.code === "23503") {
      throw new Error("Invalid team_id or assigned_to");
    }
    throw err;
  }
};

const updateTask = async (id, patch) => {
  return taskRepo.updateTask(id, patch);
};

const deleteTask = async (id) => {
  return taskRepo.deleteTask(id);
};

const getTaskById = async (id) => {
  return taskRepo.getTaskById(id);
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
