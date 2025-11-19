require("dotenv").config();

const express = require("express");
const session = require("express-session");
const cors = require("cors");
const authRoutes = require("./router/auth/auth-route");
const teamRoutes = require("./router/teams/teams-route");
const taskRoutes = require("./router/tasks/tasks-route");
const userRoutes = require("./router/users/users-route");
const reminderRoutes = require("./router/reminder/reminder-route");
const sessionMiddleware = require("./config/session");
const errorHandler = require("./middlewares/errorhandling");

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(sessionMiddleware());

app.use("/auth", authRoutes);
app.use("/teams", teamRoutes);
app.use("/tasks", taskRoutes);
app.use("/users", userRoutes);
app.use("/reminders", reminderRoutes);

app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT} `);
});
