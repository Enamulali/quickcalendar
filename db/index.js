const mongoose = require("mongoose");
const User = require("./user");
const Event = require("./event");
const Calendar = require("./calendar");

mongoose
  .connect("mongodb://localhost:27017/quickcalendar", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to database");
    console.log(`Mongoose connection state: ${mongoose.connection.readyState}`);
  })
  .catch((err) => console.log(err));

module.exports = {
  User,
  Event,
  Calendar,
};
