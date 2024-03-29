const express = require("express");
const { Event } = require("../db");
const { validateId } = require("../middleware/errors");
const createError = require("http-errors");
const jwt = require("jsonwebtoken");

const eventsRouter = express.Router();

// Add authorization header to requests
eventsRouter.use(async (req, res, next) => {
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

eventsRouter.get("/", async (req, res, next) => {
  try {
    const events = await Event.find({ owner: req.userId });

    if (events.length === 0) {
      throw createError(404, "No events found");
    }
    res.status(200).send(events);
  } catch (err) {
    next(err);
  }
});

eventsRouter.post("/", async (req, res, next) => {
  try {
    const postedEvent = await Event.create(req.body);
    res.status(201).send(postedEvent);
  } catch (err) {
    next(err);
  }
});

eventsRouter.get("/:id", validateId, async (req, res, next) => {
  try {
    const { id } = req.params;
    const event = await Event.findById(id);

    if (!event) throw createError(404, "Event not found");

    if (event.owner !== req.userId) {
      throw createError(401, "Unauthorized - you can only get your own events");
    }

    res.status(200).send(event);
  } catch (err) {
    next(err);
  }
});

eventsRouter.put("/:id", validateId, async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedEvent = await Event.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (Object.keys(req.body).length === 0) {
      throw createError(400, "Request body cannot be empty");
    }

    if (!updatedEvent) throw createError(404, "Event not found");

    if (updatedEvent.owner !== req.userId) {
      throw createError(
        401,
        "Unauthorized - you can only update your own events"
      );
    }

    res.status(201).send(updatedEvent);
  } catch (err) {
    next(err);
  }
});

eventsRouter.delete("/:id", validateId, async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedEvent = await Event.findByIdAndDelete(id);

    if (!deletedEvent) throw createError(404, "Event not found");

    if (deletedEvent.owner !== req.userId) {
      throw createError(
        401,
        "Unauthorized - you can only delete your own events"
      );
    }

    res.status(204).send();
  } catch (err) {
    next(err);
  }
});

module.exports = eventsRouter;
