const bcrypt = require("bcrypt");
const User = require("../models/user");
const Event = require("../models/event");
const Calendar = require("../models/calendar");

async function clearData() {
  try {
    await User.deleteMany({});
    console.log("Deleted all users");

    await Event.deleteMany({});
    console.log("Deleted all events");

    await Calendar.deleteMany({});
    console.log("Deleted all calendars");
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

  let createdUsers, createdEvents;

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
    createdUsers = await User.create(hashedUsers);
    console.log(`Created ${createdUsers.length} users`);

    createdEvents = await Event.create([
      {
        ...events[0],
        title: "Event 1",
        description: "Description of Event 1",
        owner: createdUsers[0]._id,
      },
      {
        ...events[1],
        title: "Event 2",
        description: "Description of Event 2",
        owner: createdUsers[0]._id,
      },
      {
        ...events[0],
        title: "Event 1",
        description: "Description of Event 1",
        owner: createdUsers[1]._id,
      },
      {
        ...events[1],
        title: "Event 2",
        description: "Description of Event 2",
        owner: createdUsers[1]._id,
      },
      {
        ...events[0],
        title: "Event 1",
        description: "Description of Event 1",
        owner: createdUsers[2]._id,
      },
      {
        ...events[1],
        title: "Event 2",
        description: "Description of Event 2",
        owner: createdUsers[2]._id,
      },
    ]);
    console.log(`Created ${createdEvents.length} events`);
  } catch (err) {
    console.error(err);
  }

  try {
    const calendars = [
      {
        name: "My Calendar",
        owner: createdUsers[0]._id,
        events: [createdEvents[0]._id, createdEvents[1]._id],
      },
      {
        name: "Work Calendar",
        owner: createdUsers[1]._id,
        events: [createdEvents[2]._id, createdEvents[3]._id],
      },
      {
        name: "Family Calendar",
        owner: createdUsers[2]._id,
        events: [createdEvents[4]._id, createdEvents[5]._id],
      },
    ];
    const createdCalendars = await Calendar.create(calendars);
    console.log(`Created ${createdCalendars.length} calendars`);
  } catch (err) {
    console.error(err);
  }
}

module.exports = {
  seed,
  clearData,
};
