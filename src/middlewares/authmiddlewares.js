const userRepo = require("../repositories/user-repository");

function requireAuth(req, res, next) {
  if (req.session && req.session.userId) return next();
  return res.status(401).json({ message: "Unauthorized" });
}

async function attachUser(req, res, next) {
  if (req.session && req.session.userId) {
    req.user = await userRepo.findById(req.session.userId);
  }
  next();
}

module.exports = {
  requireAuth,
  attachUser,
};
