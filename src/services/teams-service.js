const teamRepo = require("../repositories/teams-repository");
const db = require("../db/knex");

const createTeamWithMembership = async ({ name, creator_id }) => {
  return db.transaction(async (trx) => {
    const team = await teamRepo.createTeam({ name, creator_id }, trx);

    await trx("memberships").insert({
      team_id: team.id,
      user_id: creator_id,
      role: "owner",
    });
    return team;
  });
};

const addMemberToTeam = async ({ team_id, user_id, requester_id }) => {
  const isOwner = await teamRepo.isOwner(requester_id, team_id);
  if (!isOwner) {
    const err = new Error("Only team owner can add members");
    err.status = 403;
    throw err;
  }
  return teamRepo.addMember({ team_id, user_id, role: "member" });
};

const deleteTeamOwnerOnly = async ({ team_id, requester_id }) => {
  const isOwner = await teamRepo.isOwner(requester_id, team_id);
  if (!isOwner) {
    const err = new Error("Only team owner can delete the team");
    err.status = 403;
    throw err;
  }
  await db("teams").where({ id: team_id }).del();
  return { success: true };
};

module.exports = {
  createTeamWithMembership,
  addMemberToTeam,
  deleteTeamOwnerOnly,
};
