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

const addMember = async (req, res, next) => {
  try {
    const membership = await teamService.addMemberToTeam({
      team_id: parseInt(req.params.id, 10),
      user_id: req.body.user_id,
      requester_id: req.session.userId,
    });
    res.status(201).json({ membership });
  } catch (err) {
    next(err);
  }
};

const deleteTeam = async (req, res, next) => {
  try {
    const result = await teamService.deleteTeamOwnerOnly({
      team_id: parseInt(req.params.id, 10),
      requester_id: req.session.userId,
    });
    res.json(result);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createTeam,
  listUserTeams,
  addMember,
  deleteTeam,
};
