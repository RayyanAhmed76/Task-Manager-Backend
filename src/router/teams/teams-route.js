const express = require("express");
const { requireAuth } = require("../../middlewares/authmiddlewares");
const teamCtrl = require("../../controllers/teams-controller");
const { createTeamValidator } = require("../../validators/teamvalidation");
const validate = require("../../middlewares/validate");

const router = express.Router();
router.use(requireAuth);

router.post("/", createTeamValidator, validate, teamCtrl.createTeam);
router.get("/", teamCtrl.listUserTeams);

module.exports = router;
