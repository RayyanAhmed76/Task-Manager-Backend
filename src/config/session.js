const session = require("express-session");
const connectPgSimple = require("connect-pg-simple");
const db = require("../db/knex.js");
const { Pool } = require("pg");

const PgSession = connectPgSimple(session);

function sessionMiddleware() {
  // Create explicit pool with connection string to override system env vars
  const pool = new Pool({
    connectionString: `postgresql://${process.env.DB_USER || "postgres"}:${
      process.env.DB_PASS || ""
    }@${process.env.DB_HOST || "127.0.0.1"}:${process.env.DB_PORT || 5432}/${
      process.env.DB_NAME || "Task-Manager"
    }`,
  });

  return session({
    store: new PgSession({
      pool: pool,
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
