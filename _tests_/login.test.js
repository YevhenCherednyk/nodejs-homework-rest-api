const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const request = require("supertest");
require("dotenv").config();

const app = require("../app");
const { User } = require("../models/user");

const { DB_HOST, PORT = 3000 } = process.env;

describe("Test login controller", () => {
  let server;
  beforeAll(() => (server = app.listen(PORT)));
  afterAll(() => server.close());

  beforeEach(async () => {
    mongoose.set("strictQuery", false);
    await mongoose.connect(DB_HOST);

    const user = await User.create({
      email: "user@mail.com",
      password: await bcrypt.hash("password", 10),
      avatarURL: "avatarlink",
    });
  });

  afterEach(async () => {
    await User.deleteMany({});
    await mongoose.disconnect();
  });

  test("should return 200 status code, token and user object with email and subscription properties", async () => {
    const user = { email: "user@mail.com", password: "password" };
    const response = await request(app).post("/api/users/login").send(user);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("token");
    expect(response.body.user).toHaveProperty("email", "user@mail.com");
    expect(response.body.user).toHaveProperty(
      "subscription",
      expect.any(String)
    );
  });
});
