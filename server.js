require("dotenv").config();
const express = require("express");
const {
  validateId,
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

const port = 9090;
app.listen(port, () => console.log(`Server listening on port ${port}`));
