const express = require("express");
const { requireAuth } = require("../../middlewares/authmiddlewares");
const db = require("../../db/knex");

const router = express.Router();
router.use(requireAuth);

// List all users (for adding members to teams)
router.get("/", async (req, res, next) => {
  try {
    const users = await db("users").select("id", "name", "email");
    res.json({ users });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
