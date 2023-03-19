const ENV = process.env.NODE_ENV || "development";
require("dotenv").config({ path: `${__dirname}/../.env.${ENV}` });

const mongoose = require("mongoose");
const User = require("./models/user");
const Event = require("./models/event");
const Calendar = require("./models/calendar");
const { seed } = require("./seeds/seed");
const inquirer = require("inquirer");

async function main() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to database");

    let answer = "y";
    while (answer.toLowerCase() === "y") {
      answer = (
        await inquirer.prompt({
          type: "input",
          name: "continue",
          message: "Seed database again? (y/n)",
        })
      ).continue;
      if (answer.toLowerCase() === "y") {
        await seed();
      }
    }

    mongoose.disconnect();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

main();

module.exports = {
  User,
  Event,
  Calendar,
};
