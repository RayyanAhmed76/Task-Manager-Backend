/**
 * @param { import("knex").Knex } knex
 */
exports.seed = async function (knex) {
  await knex("memberships").insert([
    { id: 1, team_id: 1, user_id: 1, role: "owner" },
    { id: 2, team_id: 1, user_id: 2, role: "member" },
  ]);
};
