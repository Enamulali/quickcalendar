const bcrypt = require("bcrypt");
const User = require("../models/user");
const Event = require("../models/event");

async function clearData() {
  try {
    await User.deleteMany({});
    console.log("Deleted all users");

    await Event.deleteMany({});
    console.log("Deleted all events");
  } catch (err) {
    console.log(err);
  }
}

async function seed() {
  await clearData();
  // Define sample data
  const users = [
    { name: "Enamul", email: "enamul@example.com", password: "password" },
    { name: "Musa", email: "musa@example.com", password: "password" },
    { name: "Mahamud", email: "mahamud@example.com", password: "password" },
  ];

  const events = [
    {
      title: "Event 1",
      description: "Description of Event 1",
      start: new Date(),
      end: new Date(),
    },
    {
      title: "Event 2",
      description: "Description of Event 2",
      start: new Date(),
      end: new Date(),
    },
  ];

  // Hash passwords for users
  const saltRounds = 10;
  const hashedUsers = await Promise.all(
    users.map(async (user) => {
      const hashedPassword = await bcrypt.hash(user.password, saltRounds);
      return { ...user, password: hashedPassword };
    })
  );

  // Create users and events
  try {
    const createdUsers = await User.create(hashedUsers);
    console.log(`Created ${createdUsers.length} users`);

    const createdEvents = await Event.create([
      { ...events[0], owner: createdUsers[0]._id },
      { ...events[1], owner: createdUsers[0]._id },
      { ...events[0], owner: createdUsers[1]._id },
      { ...events[1], owner: createdUsers[1]._id },
      { ...events[0], owner: createdUsers[2]._id },
      { ...events[1], owner: createdUsers[2]._id },
    ]);
    console.log(`Created ${createdEvents.length} events`);
  } catch (err) {
    console.error(err);
  }
}

module.exports = {
  seed,
  clearData,
};
