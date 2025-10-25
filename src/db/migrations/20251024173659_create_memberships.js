/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("memberships", (table) => {
    table.increments("id").primary();
    table
      .integer("team_id")
      .unsigned()
      .references("id")
      .inTable("teams")
      .onDelete("CASCADE");
    table
      .integer("user_id")
      .unsigned()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");
    table.string("role").defaultTo("member");
    table.timestamps(true, true);
    table.unique(["team_id", "user_id"]);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("memberships");
};
