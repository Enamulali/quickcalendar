const request = require("supertest");
const app = require("../server");
const { seed } = require("../db/seeds/seed");
const { User } = require("../db");

beforeAll(async () => {
  await seed();
});

describe("POST /auth", () => {});
