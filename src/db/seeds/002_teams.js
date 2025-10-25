/**
 * @param { import("knex").Knex } knex
 */
exports.seed = async function (knex) {
  await knex("teams").insert([{ id: 1, name: "Core Team", creator_id: 1 }]);
};
