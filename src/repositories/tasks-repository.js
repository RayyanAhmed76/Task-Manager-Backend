const db = require("../db/knex");

function baseVisibleTasksQuery(userId) {
  return db("tasks")
    .join("memberships", "tasks.team_id", "memberships.team_id")
    .where("memberships.user_id", userId)
    .select("tasks.*");
}

const createTask = async (data) => {
  const [task] = await db("tasks").insert(data).returning("*");
  return task;
};

const getTaskByIdVisibleToUser = async (id, userId) => {
  return baseVisibleTasksQuery(userId).where("tasks.id", id).first();
};

const listTasks = async ({ userId, teamId, assigneeId }) => {
  let q = baseVisibleTasksQuery(userId).orderBy("tasks.created_at", "desc");
  if (teamId) q = q.andWhere("tasks.team_id", teamId);
  if (assigneeId) q = q.andWhere("tasks.assigned_to", assigneeId);
  return q;
};

const updateTask = async (id, changes) => {
  const [task] = await db("tasks").where({ id }).update(changes).returning("*");
  return task;
};

const deleteTask = async (id) => {
  return db("tasks").where({ id }).del();
};

module.exports = {
  createTask,
  getTaskByIdVisibleToUser,
  listTasks,
  updateTask,
  deleteTask,
};
