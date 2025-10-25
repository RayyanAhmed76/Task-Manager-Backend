const teamService = require("../services/teams-service");
const teamRepo = require("../repositories/teams-repository");

const createTeam = async (req, res, next) => {
  try {
    const team = await teamService.createTeamWithMembership({
      name: req.body.name,
      creator_id: req.session.userId,
    });
    res.status(201).json({ team });
  } catch (err) {
    next(err);
  }
};

const listUserTeams = async (req, res, next) => {
  try {
    const teams = await teamRepo.listTeamsForUser(req.session.userId);
    res.json({ teams });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createTeam,
  listUserTeams,
};
