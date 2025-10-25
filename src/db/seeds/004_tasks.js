exports.seed = async function (knex) {
  await knex("tasks").del();
  await knex("tasks").insert([
    {
      id: 1,
      title: "Task 1",
      description: "Some desc",
      team_id: 1,
      assigned_to: 1,
      status: "pending",
      creator_id: 1,
    },
    {
      id: 2,
      title: "Task 2",
      description: "Another desc",
      team_id: 1,
      assigned_to: 2,
      status: "completed",
      creator_id: 1,
    },
  ]);
};
