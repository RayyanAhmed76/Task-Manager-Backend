const userRepo = require("../repositories/user-repository");

function requireAuth(req, res, next) {
  if (req.session && req.session.userId) return next();
  return res.status(401).json({ message: "Unauthorized" });
}

async function attachUser(req, res, next) {
  if (req.session && req.session.userId) {
    try {
      req.user = await userRepo.getUserById(req.session.userId);
    } catch (e) {
      req.user = null;
    }
  }
  next();
}

module.exports = {
  requireAuth,
  attachUser,
};
