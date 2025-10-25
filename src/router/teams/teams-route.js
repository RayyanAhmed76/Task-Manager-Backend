const express = require("express");
const { requireAuth } = require("../../middlewares/authmiddlewares");
const teamCtrl = require("../../controllers/teams-controller");
const handleValidationErrors = require("../../middlewares/validate");
const {
  createTeamValidator,
  teamIdParam,
  addMemberValidator,
} = require("../../validators/teamvalidation");
const inviteService = require("../../services/invite-service");
const { body } = require("express-validator");

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

// Email invite endpoint (stubbed)
router.post(
  "/:id/invite",
  teamIdParam,
  body("email").isEmail().withMessage("Valid email required"),
  handleValidationErrors,
  async (req, res, next) => {
    try {
      const result = await inviteService.createTeamInvite({
        team_id: parseInt(req.params.id, 10),
        email: req.body.email,
        requester_id: req.session.userId,
      });
      res.status(201).json(result);
    } catch (err) {
      next(err);
    }
  }
);

router.delete("/:id", teamIdParam, handleValidationErrors, teamCtrl.deleteTeam);

module.exports = router;
