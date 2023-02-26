const express = require("express");
const createError = require("http-errors");
const { User } = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validateId } = require("../middleware/errors");

const authRouter = express.Router();

//User login
authRouter.post("/login", async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) throw createError(401, "Invalid email");

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) throw createError(401, "Invalid password");

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

    res.json({ user, token });
  } catch (error) {
    next(error);
  }
});

//User registration
authRouter.post("/", async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) throw createError(409, "User already exists");

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

//Update user
authRouter.put("/:id", validateId, async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, email, password } = req.body;

    if (!name && !email && !password) {
      throw createError(400, "At least one user field is required");
    }

    const hashedPassword = password && (await bcrypt.hash(password, 10));
    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        name,
        email,
        password: hashedPassword,
      },
      { new: true }
    );

    if (!updatedUser) {
      throw createError(404, "User not found");
    }

    res.status(200).json(updatedUser);
  } catch (err) {
    next(err);
  }
});

module.exports = { authRouter };
