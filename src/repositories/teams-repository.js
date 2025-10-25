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

module.exports = {
  createTeam,
  getTeamById,
  listTeamsForUser,
};
