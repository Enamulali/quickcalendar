const express = require("express");
const { Calendar } = require("../db");
const createError = require("http-errors");

const calendarRouter = express.Router();

// Add authorisation header to requests
calendarRouter.use(async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
      throw createError(401, "Authorization header missing");
    }
    const [type, token] = authHeader.split(" ");
    if (type !== "Bearer" || !token) {
      throw createError(401, "Invalid authorization header");
    }
    req.token = token;
    next();
  } catch (err) {
    next(err);
  }
});

calendarRouter.get("/", async (req, res, next) => {
  try {
    const calendar = await Calendar.find();

    if (calendar.length === 0) {
      throw createError(404, "No calendar found");
    }
    res.status(200).send(calendar);
  } catch (err) {
    next(err);
  }
});

module.exports = calendarRouter;
