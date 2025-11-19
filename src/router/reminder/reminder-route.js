const express = require("express");
const { requireAuth } = require("../../middlewares/authmiddlewares");

const ctrlReminder = require("../..//controllers/reminder-controller");

const router = express.Router();
router.use(requireAuth);

router.get("/", ctrlReminder);

module.exports = router;
