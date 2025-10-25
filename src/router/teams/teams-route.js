const express = require("express");
const { requireAuth } = require("../../middlewares/authmiddlewares");
const teamCtrl = require("../../controllers/teams-controller");
const handleValidationErrors = require("../../middlewares/validate");
const {
  createTeamValidator,
  teamIdParam,
  addMemberValidator,
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

router.delete("/:id", teamIdParam, handleValidationErrors, teamCtrl.deleteTeam);

module.exports = router;
