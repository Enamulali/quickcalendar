require("dotenv").config();
const express = require("express");
const cors = require("cors");
const {
  handleInternalServerError,
  handleNotFound,
  handleGenericError,
  handleValidationError,
} = require("./middleware/errors");
const eventsRouter = require("./routes/events");
const usersRouter = require("./routes/users");
const authJwt = require("./middleware/auth");
const { authRouter } = require("./routes/auth");

const app = express();

//Middleware
app.use(
  cors({
    origin: ["http://localhost:9090", "http://localhost:3000"],
  })
);
app.use(express.json());

//Routes
app.use("/auth", authRouter);

// Protected Routes

app.use("/users", usersRouter, authJwt);
app.use("/events", eventsRouter, authJwt);

//Error handling middleware
app.use(handleNotFound);
app.use(handleValidationError);
app.use(handleGenericError);
app.use(handleInternalServerError);

module.exports = app;
