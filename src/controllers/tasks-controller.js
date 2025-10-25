const tasksService = require("../services/tasks-service");

const create = async (req, res, next) => {
  try {
    const task = await tasksService.createTask({
      title: req.body.title,
      description: req.body.description,
      team_id: req.body.team_id,
      assigned_to: req.body.assigned_to,
      due_date: req.body.due_date,
      userId: req.session.userId,
    });

    res.status(201).json({ task });
  } catch (err) {
    next(err);
  }
};

const list = async (req, res, next) => {
  try {
    const tasks = await tasksService.listTasks({
      userId: req.session.userId,
      teamId: req.query.teamId,
      assigneeId: req.query.assigneeId,
    });
    res.json({ tasks });
  } catch (err) {
    next(err);
  }
};

const update = async (req, res, next) => {
  try {
    const task = await tasksService.updateTask({
      id: parseInt(req.params.id, 10),
      userId: req.session.userId,
      changes: req.body,
    });
    res.json({ task });
  } catch (err) {
    next(err);
  }
};

const remove = async (req, res, next) => {
  try {
    const result = await tasksService.deleteTask({
      id: parseInt(req.params.id, 10),
      userId: req.session.userId,
    });
    res.json(result);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  create,
  list,
  update,
  remove,
};
