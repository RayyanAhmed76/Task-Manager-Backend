const express = require("express");
const session = require("express-session");
const { PORT } = require("./config/server-config");
const authRoutes = require("./router/auth/auth-route");
const teamRoutes = require("./router/teams/teams-route");
const taskRoutes = require("./router/tasks/tasks-route");
const sessionMiddleware = require("./config/session");

const app = express();

app.use(express.json());
app.use(sessionMiddleware());

app.use("/auth", authRoutes);
app.use("/teams", teamRoutes);
app.use("/tasks", taskRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// app.use(
//   session({
//     secret: process.env.SESSION_SECRET,
//     resave: false,
//     saveUninitialized: false,
//     cookie: { secure: false },
//   })
// );
