const express = require("express");
const { requireAuth } = require("../../middlewares/authmiddlewares");
const teamCtrl = require("../../controllers/teams-controller");

const router = express.Router();
router.use(requireAuth);

router.post("/", teamCtrl.createTeam);
router.get("/", teamCtrl.listUserTeams);

module.exports = router;
