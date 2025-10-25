const express = require("express");
const { requireAuth } = require("../../middlewares/authmiddlewares");
const reminderService = require("../../services/reminder-service");

const router = express.Router();
router.use(requireAuth);

// Get task reminders (due soon and overdue)
router.get("/", async (req, res, next) => {
  try {
    const dueSoon = await reminderService.getDueSoonTasks(req.session.userId);
    const overdue = await reminderService.getOverdueTasks(req.session.userId);

    res.json({
      dueSoon,
      overdue,
      count: dueSoon.length + overdue.length,
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
