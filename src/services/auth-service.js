const bcrypt = require("bcrypt");
const userRepo = require("../repositories/user-repository");

const ConflictError = require("../utils/apperrors");

const register = async ({ name, email, password }) => {
  const existing = await userRepo.getUserByEmail(email);
  if (existing) throw new ConflictError("Email already registered");

  const password_hash = await bcrypt.hash(password, 10);
  const user = await userRepo.createUser({ name, email, password_hash });
  return user;
};

const login = async ({ email, password }) => {
  const user = await userRepo.getUserByEmail(email);
  if (!user) return null;

  const match = await bcrypt.compare(password, user.password_hash);
  if (!match) return null;

  const { password_hash, ...safe } = user;
  return safe;
};

module.exports = {
  register,
  login,
};
