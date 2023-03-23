const request = require("supertest");
const app = require("../server");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const { seed } = require("../db/seeds/seed");

describe("/events", () => {
  beforeAll(async () => {
    await seed();
  });

  afterAll(async () => {
    // await clearData();
    await mongoose.connection.close();
  });

  test("200 - should return a list of events for current logged in user", async () => {
    //Log in user
    let token; // store the authentication token
    let userId;
    const login = await request(app).post("/auth/login").send({
      email: "enamul@example.com",
      password: "password",
    });
    token = login.body.token;
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    userId = decodedToken.userId;
    // send a GET request to /events with the authentication token
    const response = await request(app)
      .get("/events")
      .set("Authorization", `Bearer ${token}`);

    // check that the response contains only the test user's events and has status code 200
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveLength(2);
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          _id: expect.any(String),
          title: expect.any(String),
          description: expect.any(String),
          start: expect.any(String),
          end: expect.any(String),
          owner: userId,
        }),
      ])
    );
  });
  test("201 - should return posted event for current logged in user", async () => {
    //Log in user
    let token; // store the authentication token
    let userId;
    const login = await request(app).post("/auth/login").send({
      email: "enamul@example.com",
      password: "password",
    });
    token = login.body.token;
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    userId = decodedToken.userId;

    const newEvent = {
      title: "Test Event",
      description: "This is a test event",
      owner: userId,
      start: "2023-03-01T10:00:00.000Z",
      end: "2023-03-01T12:00:00.000Z",
    };
    // send a POST request to /events with the authentication token and the new event data
    const response = await request(app)
      .post("/events")
      .set("Authorization", `Bearer ${token}`)
      .send(newEvent);
    // check that the response contains the posted event and has status code 201
    expect(response.statusCode).toBe(201);
    expect(response.body).toEqual(
      expect.objectContaining({
        _id: expect.any(String),
        title: newEvent.title,
        description: newEvent.description,
        start: newEvent.start,
        end: newEvent.end,
        owner: userId,
      })
    );
  });
  test("200 - should return event when passed event ID", async () => {
    //Log in user
    let token; // store the authentication token
    let userId;
    const login = await request(app).post("/auth/login").send({
      email: "enamul@example.com",
      password: "password",
    });
    token = login.body.token;
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    userId = decodedToken.userId;

    const newEvent = {
      title: "Test Event",
      description: "This is a test event",
      owner: userId,
      start: "2023-03-01T10:00:00.000Z",
      end: "2023-03-01T12:00:00.000Z",
    };

    const createdEvent = await request(app)
      .post("/events")
      .set("Authorization", `Bearer ${token}`)
      .send(newEvent);

    const eventId = createdEvent._body._id;

    const response = await request(app)
      .get(`/events/${eventId}`)
      .set("Authorization", `Bearer ${token}`);

    console.log(response.body, "<<<<");

    expect(response.statusCode).toBe(200);
  });
});
