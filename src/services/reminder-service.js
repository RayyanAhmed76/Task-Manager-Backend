const db = require("../db/knex");

/**
 * Get tasks due soon (within next 3 days) for a user
 */
const getDueSoonTasks = async (userId) => {
  const today = new Date();
  const threeDaysFromNow = new Date();
  threeDaysFromNow.setDate(today.getDate() + 3);

  const tasks = await db("tasks")
    .join("memberships", "tasks.team_id", "memberships.team_id")
    .where("memberships.user_id", userId)
    .where("tasks.status", "!=", "completed")
    .whereNotNull("tasks.due_date")
    .whereBetween("tasks.due_date", [
      today.toISOString().split("T")[0],
      threeDaysFromNow.toISOString().split("T")[0],
    ])
    .select("tasks.*")
    .orderBy("tasks.due_date", "asc");

  return tasks;
};

const getOverdueTasks = async (userId) => {
  const today = new Date().toISOString().split("T")[0];

  const tasks = await db("tasks")
    .join("memberships", "tasks.team_id", "memberships.team_id")
    .where("memberships.user_id", userId)
    .where("tasks.status", "!=", "completed")
    .whereNotNull("tasks.due_date")
    .where("tasks.due_date", "<", today)
    .select("tasks.*")
    .orderBy("tasks.due_date", "asc");

  return tasks;
};

module.exports = {
  getDueSoonTasks,
  getOverdueTasks,
};
