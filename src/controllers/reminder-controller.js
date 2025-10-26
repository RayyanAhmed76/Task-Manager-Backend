const reminderService = require("../services/reminder-service");

const ctrlReminder = async (req, res, next) => {
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
};

module.exports = ctrlReminder;
