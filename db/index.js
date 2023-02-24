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
    console.log("Connected to database");
    console.log(`Mongoose connection state: ${mongoose.connection.readyState}`);

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
