const express = require("express");
const { Event } = require("../db");
const { validateId } = require("../middleware/errors");
const createError = require("http-errors");

const eventsRouter = express.Router();

eventsRouter.get("/", async (req, res, next) => {
  try {
    const events = await Event.find();

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

    res.status(204).send();
  } catch (err) {
    next(err);
  }
});

module.exports = eventsRouter;
