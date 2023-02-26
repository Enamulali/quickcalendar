require("dotenv").config();
const express = require("express");
const {
  handleInternalServerError,
  handleNotFound,
} = require("./middleware/errors");
const eventsRouter = require("./routes/events");
const usersRouter = require("./routes/users");
const authJwt = require("./middleware/auth");

const app = express();

//Middleware
app.use(express.json());

//Routes
app.use("/events", validateId, eventsRouter);
app.use("/users", validateId, usersRouter);

// Authentication middleware
app.use(authJwt);

//Error handling middleware
app.use(handleNotFound);
app.use(handleInternalServerError);

module.exports = app;
