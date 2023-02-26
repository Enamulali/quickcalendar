const express = require("express");
const { User } = require("../db");
const { validateId } = require("../middleware/errors");
const createError = require("http-errors");

const usersRouter = express.Router();

//Get all users
usersRouter.get("/", async (req, res, next) => {
  try {
    const users = await User.find();

    if (users.length === 0) throw createError(404, "No users");

    res.status(200).send(users);
  } catch (err) {
    next(err);
  }
});

//Get user by ID
usersRouter.get("/:id", validateId, async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    if (!user) throw createError(404, "User not found");

    res.status(200).send(user);
  } catch (err) {
    next(err);
  }
});

//Delete user
usersRouter.delete("/:id", validateId, async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) throw createError(404, "User not found");

    res.status(204).send();
  } catch (err) {
    next(err);
  }
});

module.exports = usersRouter;
