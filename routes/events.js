const express = require("express");
const mongoose = require("mongoose");
const { Event } = require("../db");

const eventsRouter = express.Router();

eventsRouter.get("/", async (req, res, next) => {
  try {
    const events = await Event.find();
    res.status(200).send(events);
  } catch (err) {
    next(err);
  }
});

eventsRouter.post("/", async (req, res, next) => {
  try {
    if (!req.body.title || !req.body.start || !req.body.end) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const postedEvent = await Event.create(req.body);
    res.status(201).send(postedEvent);
  } catch (err) {
    next(err);
  }
});

eventsRouter.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const event = await Event.findById(id);

    //To do - 404 Event not found

    res.status(200).send(event);
  } catch (err) {
    next(err);
  }
});

eventsRouter.put("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedEvent = await Event.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    res.status(201).send(updatedEvent);
  } catch (err) {
    next(err);
  }
});

eventsRouter.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedEvent = await Event.findByIdAndDelete(id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
});

module.exports = eventsRouter;
