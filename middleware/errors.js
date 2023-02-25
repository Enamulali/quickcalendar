const mongoose = require("mongoose");

const validateId = (req, res, next) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send({ message: "Invalid id" });
  }
  next();
};

const handleInternalServerError = (err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: "Internal server error" });
};

const handleNotFound = (req, res, next) => {
  res.status(404).json({ message: "Route not found" });
};

module.exports = { validateId, handleInternalServerError, handleNotFound };
