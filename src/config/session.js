const session = require("express-session");
const connectPgSimple = require("connect-pg-simple");
const db = require("../db/knex.js");

const PgSession = connectPgSimple(session);

function sessionMiddleware() {
  return session({
    store: new PgSession({
      knex: db,
      createTableIfMissing: true,
    }),
    name: "sid",
    secret: process.env.SESSION_SECRET || "devsecret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 1000 * 60 * 60 * 24,
    },
  });
}

module.exports = sessionMiddleware;
