const express = require("express");
const { User } = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const usersRouter = express.Router();

//User login
usersRouter.post("/login", async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

    res.json({ user, token });
  } catch (error) {
    next(error);
  }
});

//User registration
usersRouter.post("/", async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
    res.status(201).json({ user: newUser, token });
  } catch (err) {
    next(err);
  }
});

//Get all users
usersRouter.get("/", async (req, res, next) => {
  try {
    const users = await User.find();

    res.status(200).send(users);
  } catch (err) {
    next(err);
  }
});

//Get user by ID
usersRouter.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    res.status(200).send(user);
  } catch (err) {
    next(err);
  }
});

module.exports = usersRouter;
