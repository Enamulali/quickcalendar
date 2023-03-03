const ENV = process.env.NODE_ENV || "development";
require("dotenv").config({ path: `${__dirname}/../.env.${ENV}` });

const mongoose = require("mongoose");
const User = require("./models/user");
const Event = require("./models/event");
const Calendar = require("./models/calendar");
const { seed } = require("./seeds/seed");

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    process.env.NOTE_ENV === "development" &&
      console.log("Connected to database");

    mongoose.connection.once("open", async () => {
      await seed();
    });
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
