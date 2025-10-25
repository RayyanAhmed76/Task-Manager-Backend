const db = require("../db/knex");
const tasksRepo = require("../repositories/tasks-repository");
const teamsRepo = require("../repositories/teams-repository");

async function ensureUserInTeam(userId, teamId) {
  const isMember = await teamsRepo.isMember(userId, teamId);
  if (!isMember) {
    const err = new Error("Not a member of the team");
    err.status = 403;
    throw err;
  }
}

const createTask = async ({
  title,
  description,
  team_id: teamId,
  assigned_to: assignedTo,
  due_date: dueDate,
  userId,
}) => {
  await ensureUserInTeam(userId, teamId);

  if (assignedTo) {
    await ensureUserInTeam(assignedTo, teamId);
  }

  const data = {
    title,
    description,
    team_id: teamId,
    assigned_to: assignedTo || null,
    due_date: dueDate || null,
    creator_id: userId,
    status: "pending",
  };

  return tasksRepo.createTask(data);
};

const listTasks = async ({ userId, teamId, assigneeId }) => {
  return tasksRepo.listTasks({ userId, teamId, assigneeId });
};

const updateTask = async ({ id, userId, changes }) => {
  const existing = await tasksRepo.getTaskByIdVisibleToUser(id, userId);
  if (!existing) {
    const err = new Error("Task not found");
    err.status = 404;
    throw err;
  }
  if (changes.assigned_to) {
    await ensureUserInTeam(changes.assigned_to, existing.team_id);
  }
  return tasksRepo.updateTask(id, changes);
};

const deleteTask = async ({ id, userId }) => {
  const existing = await tasksRepo.getTaskByIdVisibleToUser(id, userId);
  if (!existing) {
    const err = new Error("Task not found");
    err.status = 404;
    throw err;
  }
  await tasksRepo.deleteTask(id);
  return { success: true };
};

module.exports = {
  createTask,
  listTasks,
  updateTask,
  deleteTask,
};
