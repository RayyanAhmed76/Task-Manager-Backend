const db = require("../db/knex");

const createTeam = async ({ name, creator_id }, trx = db) => {
  const [team] = await trx("teams").insert({ name, creator_id }).returning("*");
  return team;
};

const getTeamById = (id) => db("teams").where({ id }).first();

const listTeamsForUser = (userId) =>
  db("teams")
    .join("memberships", "teams.id", "memberships.team_id")
    .where("memberships.user_id", userId)
    .select("teams.*");

const isMember = async (userId, teamId) => {
  const row = await db("memberships")
    .where({ user_id: userId, team_id: teamId })
    .first();
  return !!row;
};

const isOwner = async (userId, teamId) => {
  const team = await getTeamById(teamId);
  return team && team.creator_id === userId;
};

const addMember = async ({ team_id, user_id, role = "member" }) => {
  const [m] = await db("memberships")
    .insert({ team_id, user_id, role })
    .onConflict(["team_id", "user_id"])
    .ignore()
    .returning("*");
  return m || { team_id, user_id, role };
};

module.exports = {
  createTeam,
  getTeamById,
  listTeamsForUser,
  isMember,
  isOwner,
  addMember,
};
