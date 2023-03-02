const request = require("supertest");
const app = require("../server");
const { seed } = require("../db/seeds/seed");
const { User } = require("../db");
const bcrypt = require("bcrypt");
const { validateId } = require("../middleware/errors");

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
    const newUser = {
      name: "John Doe",
      email: "john@example.com",
      password: "password",
    };

    const createUser = await request(app).post("/auth").send(newUser);
    const { user: createdUser } = createUser.body;

    const updatedUser = {
      name: "New name",
      email: "new@email.com",
      password: "newpassword",
    };
    const response = await await request(app)
      .put(`/auth/${createdUser._id}`)
      .send(updatedUser);

    expect(response.status).toBe(200);
    expect(response.body.name).toBe(updatedUser.name);
    expect(response.body.email).toBe(updatedUser.email);

    const comparePasswords = await bcrypt.compare(
      updatedUser.password,
      response.body.password
    );

    expect(comparePasswords).toBe(true);
  });
  test("404 - should respond with error for user not found", async () => {
    const updateUser = {
      name: "John Doe",
      email: "john@example.com",
      password: "password",
    };

    const response = await await request(app)
      .put(`/auth/invalid_user`)
      .send(updateUser);

    expect(response.status).toBe(404);
    expect(response.body.message).toBe("User not found");
  });
  test("404 - should respond with error invalid ID", async () => {
    const invalidMongoID = "invalid_id_format";
    const updateUser = {
      name: "John Doe",
      email: "john@example.com",
      password: "password",
    };

    const response = await request(app)
      .put(`/auth/${invalidMongoID}`)
      .send(updateUser);

    expect(response.status).toBe(404);
    expect(response.body.message).toBe("Invalid id");
  });
  test("400 - should respond with error bad request", async () => {
    const newUser = {
      name: "John Doe",
      email: "john@example.com",
      password: "password",
    };

    const createUser = await request(app).post("/auth").send(newUser);
    const { user: createdUser } = createUser.body;

    const response = await await request(app)
      .put(`/auth/${createdUser._id}`)
      .send({});

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("At least one user field is required");
  });
});
