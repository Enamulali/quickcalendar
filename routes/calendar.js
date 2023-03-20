const express = require("express");
const jwt = require("jsonwebtoken");
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
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decodedToken.userId;
    next();
  } catch (err) {
    next(err);
  }
});

calendarRouter.get("/", async (req, res, next) => {
  try {
    const userCalendars = await Calendar.find({
      owner: req.userId,
    });
    if (userCalendars.length === 0) {
      throw createError(404, "No calendar found for this user");
    }
    res.status(200).send(userCalendars);
  } catch (err) {
    next(err);
  }
});

calendarRouter.post("/", async (req, res, next) => {
  try {
    const postedCalendar = await Calendar.create(req.body);
    res.status(201).send(postedCalendar);
  } catch (err) {
    next(err);
  }
});

calendarRouter.get("/:id", async (req, res, next) => {
  try {
    const calendar = await Calendar.find(req.params);
    res.status(200).send(calendar);
  } catch (err) {
    next(err);
  }
});

calendarRouter.delete("/:id", async (req, res, next) => {
  await Calendar.deleteOne(req.params);
  res.status(204).send();
});

module.exports = calendarRouter;
