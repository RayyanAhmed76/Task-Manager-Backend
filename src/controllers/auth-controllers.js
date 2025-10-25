const authService = require("../services/auth-service");
const userRepo = require("../repositories/user-repository");
const ConflictError = require("../utils/apperrors");

const register = async (req, res, next) => {
  try {
    const user = await authService.register(req.body);
    req.session.userId = user.id;
    res.status(201).json({ user });
  } catch (err) {
    if (err instanceof ConflictError) {
      return res.status(err.statusCode).json({ error: err.message });
    }
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const user = await authService.login(req.body);
    if (!user) return res.status(401).json({ message: "Invalid credentials" });
    req.session.userId = user.id;
    res.json({ user });
  } catch (err) {
    next(err);
  }
};

const logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(500).json({ error: "Logout failed" });

    res.clearCookie("sid", {
      path: "/",
      httpOnly: true,
    });

    res.json({ message: "Logged out" });
  });
};

const me = async (req, res, next) => {
  try {
    if (!req.session.userId) return res.json({ user: null });
    const user = await userRepo.getUserById(req.session.userId);
    if (!user) return res.json({ user: null });
    const { password_hash, ...safe } = user;
    res.json({ user: safe });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  register,
  login,
  logout,
  me,
};
