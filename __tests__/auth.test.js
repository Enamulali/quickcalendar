const request = require("supertest");
const app = require("../server");
const { seed } = require("../db/seeds/seed");
const { User } = require("../db");

beforeAll(async () => {
  await seed();
});

describe("POST /auth", () => {
  test("should register a new user", async () => {
    const response = await request(app).post("/auth").send({
      name: "John Doe",
      email: "johndoe@example.com",
      password: "password",
    });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("token");
    expect(response.body).toHaveProperty("user");

    const user = await User.findOne({ email: "johndoe@example.com" });
    expect(user).not.toBeNull();
  });

  test("should login an existing user", async () => {
    const response = await request(app).post("/auth/login").send({
      email: "enamul@example.com",
      password: "password",
    });

    expect(response).not.toBeNull();
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("token");
  });
});
