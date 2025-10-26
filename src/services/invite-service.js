const db = require("../db/knex");

/**
 * Stubbed email service - logs invite instead of sending actual email
 */
const sendInviteEmail = async ({
  toEmail,
  fromUser,
  teamName,
  inviteToken,
}) => {
  console.log("=".repeat(60));
  console.log("📧 EMAIL INVITE (NOT ACTUALLY SENT)");
  console.log("=".repeat(60));
  console.log(`To: ${toEmail}`);
  console.log(`From: ${fromUser.name} (${fromUser.email})`);
  console.log(`Subject: You've been invited to join team "${teamName}"`);
  console.log("");
  console.log("Hi there!");
  console.log("");
  console.log(
    `${fromUser.name} has invited you to join the team "${teamName}".`
  );
  console.log("");
  console.log(`To accept this invitation, please:`);
  console.log(`1. Register at: http://localhost:5173/`);
  console.log(`2. Use this invite code: ${inviteToken}`);
  console.log("");
  console.log(
    "If you already have an account, the team owner can add you directly."
  );
  console.log("");
  console.log("=".repeat(60));

  return {
    success: true,
    message: "Invite email logged (stubbed, not sent)",
    sentTo: toEmail,
  };
};

const createTeamInvite = async ({ team_id, email, requester_id }) => {
  const inviteToken = `INVITE-${Date.now()}-${Math.random()
    .toString(36)
    .substr(2, 9)}`.toUpperCase();

  const team = await db("teams").where({ id: team_id }).first();
  if (!team) {
    const err = new Error("Team not found");
    err.status = 404;
    throw err;
  }

  if (team.creator_id !== requester_id) {
    const err = new Error("Only team owner can send invites");
    err.status = 403;
    throw err;
  }

  const requester = await db("users").where({ id: requester_id }).first();

  // const [invite] = await db("team_invites")
  //   .insert({
  //     team_id,
  //     email,
  //     invited_by: requester_id,
  //     token: inviteToken,
  //     status: "pending",
  //     expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
  //   })
  //   .returning("*")
  //   .catch(() => {
  //     // Table might not exist, return mock invite
  //     return [
  //       {
  //         id: Date.now(),
  //         team_id,
  //         email,
  //         invited_by: requester_id,
  //         token: inviteToken,
  //         status: "pending",
  //       },
  //     ];
  //   });

  const invite = {
    id: Date.now(),
    team_id,
    email,
    invited_by: requester_id,
    token: inviteToken,
    status: "pending",
  };

  // Send stubbed email
  await sendInviteEmail({
    toEmail: email,
    fromUser: requester,
    teamName: team.name,
    inviteToken,
  });

  return {
    invite,
    message: `Invite sent to ${email} `,
  };
};

module.exports = {
  createTeamInvite,
  sendInviteEmail,
};
