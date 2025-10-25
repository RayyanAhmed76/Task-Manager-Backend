const db = require("../db/knex");

const createUser = async ({ name, email, password_hash }) => {
  const [user] = await db("users")
    .insert({ name, email, password_hash })
    .returning(["id", "name", "email", "created_at"]);
  return user;
};

const getUserById = async (id) => {
  const user = await db("users").where({ id }).first();
  if (!user) throw new Error("User not found");
  return user;
};

const getUserByEmail = async (email) => {
  const user = await db("users").where({ email }).first();
  return user || null;
};

module.exports = {
  createUser,
  getUserById,
  getUserByEmail,
};
