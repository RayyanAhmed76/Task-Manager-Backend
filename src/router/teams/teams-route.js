const express = require("express");
const { requireAuth } = require("../../middlewares/authmiddlewares");
const teamCtrl = require("../../controllers/teams-controller");
const handleValidationErrors = require("../../middlewares/validate");
const {
  createTeamValidator,
  teamIdParam,
  addMemberValidator,
  emailValidator,
} = require("../../validators/teamvalidation");

const router = express.Router();
router.use(requireAuth);

router.post(
  "/",
  createTeamValidator,
  handleValidationErrors,
  teamCtrl.createTeam
);
router.get("/", teamCtrl.listUserTeams);

router.post(
  "/:id/members",
  teamIdParam,
  addMemberValidator,
  handleValidationErrors,
  teamCtrl.addMember
);

router.post(
  "/:id/invite",
  teamIdParam,
  emailValidator,
  handleValidationErrors,
  teamCtrl.inviteByemail
);

router.delete("/:id", teamIdParam, handleValidationErrors, teamCtrl.deleteTeam);

module.exports = router;
