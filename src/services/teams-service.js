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

module.exports = {
  createTeamWithMembership,
};
