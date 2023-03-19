const request = require("supertest");
const app = require("../server");
const jwt = require("jsonwebtoken");
const { mongoose } = require("mongoose");
const { seed } = require("../db/seeds/seed");

describe("/events", () => {
  let token; // store the authentication token
  let userId;

  beforeAll(async () => {
    await seed();
    //Log in user
    const response = await request(app).post("/auth/login").send({
      email: "enamul@example.com",
      password: "password",
    });
    token = response.body.token;
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    userId = decodedToken.userId;
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  test("200 - should return a list of events for current logged in user", async () => {
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
});
