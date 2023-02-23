const express = require("express");
const { Event } = require("../db");

const eventsRouter = express.Router();

eventsRouter.get("/", async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = eventsRouter;
