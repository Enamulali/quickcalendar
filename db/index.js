const mongoose = require("mongoose");
const User = require("./models/user");
const Event = require("./models/event");
const Calendar = require("./models/calendar");
const { seed, clearData } = require("./seeds/seed");

mongoose
  .connect("mongodb://localhost:27017/quickcalendar", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to database");
    console.log(`Mongoose connection state: ${mongoose.connection.readyState}`);

    clearData().then(() => seed());
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });

module.exports = {
  User,
  Event,
  Calendar,
};