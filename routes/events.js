const express = require("express");
const { Event } = require("../db");

const eventsRouter = express.Router();

eventsRouter.get("/", async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).send(events);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

eventsRouter.post("/", async (req, res) => {
  try {
    if (!req.body.title || !req.body.start || !req.body.end) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const postedEvent = await Event.create(req.body);
    res.status(201).send(postedEvent);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = eventsRouter;
