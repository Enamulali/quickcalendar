require("dotenv").config();
const express = require("express");
const { validateId } = require("./middleware/errors");
const eventsRouter = require("./routes/events");
const usersRouter = require("./routes/users");
const authJwt = require("./middleware/auth");

const app = express();

//Middleware
app.use(express.json());
app.use("/events/:id", validateId);

//Routes
app.use("/events", eventsRouter);
app.use("/users", usersRouter);

// Authentication middleware
app.use(authJwt);

const port = 9090;
app.listen(port, () => console.log(`Server listening on port ${port}`));
