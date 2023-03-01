const request = require("supertest");
const app = require("../server");
const { seed } = require("../db/seeds/seed");
const { User } = require("../db");

beforeAll(async () => {
  await seed();
});

describe("POST /auth", () => {
  test("201 - should register a new user", async () => {
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
  test("200 - should login an existing user", async () => {
    const response = await request(app).post("/auth/login").send({
      email: "enamul@example.com",
      password: "password",
    });

    expect(response).not.toBeNull();
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("token");
  });
  test("401 - should respond with error for invalid email ", async () => {
    const response = await request(app).post("/auth/login").send({
      email: "invalid@email.com",
      password: "password",
    });

    expect(response).not.toBeNull();
    expect(response.status).toBe(401);
    expect(response.body.message).toBe("Invalid email");
  });
  test("401 - should respond with error for invalid password ", async () => {
    const response = await request(app).post("/auth/login").send({
      email: "enamul@example.com",
      password: "invalidpassword",
    });

    expect(response).not.toBeNull();
    expect(response.status).toBe(401);
    expect(response.body.message).toBe("Invalid password");
  });
  test("409 - should respond with error for user already registered ", async () => {
    const response = await request(app).post("/auth").send({
      name: "John Doe",
      email: "johndoe@example.com",
      password: "password",
    });

    expect(response).not.toBeNull();
    expect(response.status).toBe(409);
    expect(response.body.message).toBe("User already exists");
  });
  test("200 - should update existing user", async () => {
    const response = await request(app)
      .put("/auth/63fba36816343238568d7532")
      .send({
        name: "Updated Name",
      });

    console.log(response.body);
  });
});
