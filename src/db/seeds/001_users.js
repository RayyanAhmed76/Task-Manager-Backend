/**
 * @param { import("knex").Knex } knex
 */
exports.seed = async function (knex) {
  await knex("memberships").del();
  await knex("tasks").del();
  await knex("teams").del();
  await knex("users").del();

  const bcrypt = require("bcrypt");
  const hash1 = await bcrypt.hash("password123", 10);
  const hash2 = await bcrypt.hash("password123", 10);

  await knex("users").insert([
    { id: 1, name: "Alice", email: "alice@example.com", password_hash: hash1 },
    { id: 2, name: "Bob", email: "bob@example.com", password_hash: hash2 },
  ]);
};
