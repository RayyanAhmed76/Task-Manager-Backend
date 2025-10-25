const db = require("../db/knex");

const createTask = async (task) => {
  const [t] = await db("tasks").insert(task).returning("*");
  return t;
};

const updateTask = (id, patch) =>
  db("tasks").where({ id }).update(patch).returning("*");

const deleteTask = (id) => db("tasks").where({ id }).delete();

const getTaskById = async (id) => {
  const task = await db("tasks").where({ id }).first();
  if (!task) throw new Error("Task not found");
  return task;
};

const getTasks = (filters = {}) => {
  const q = db("tasks")
    .select("tasks.*")
    .leftJoin("users as assignee", "tasks.assigned_to", "assignee.id");

  if (filters.team_id) q.where("tasks.team_id", filters.team_id);
  if (filters.assigned_to) q.where("tasks.assigned_to", filters.assigned_to);
  if (filters.status) q.where("tasks.status", filters.status);
  if (filters.search) q.whereILike("tasks.title", `%${filters.search}%`);

  return q;
};

module.exports = {
  createTask,
  updateTask,
  deleteTask,
  getTaskById,
  getTasks,
};
