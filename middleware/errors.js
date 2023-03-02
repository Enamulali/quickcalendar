const mongoose = require("mongoose");

const validateId = (req, res, next) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "Invalid id" });
  }
  next();
};

const handleValidationError = (err, req, res, next) => {
  if (err.name === "ValidationError") {
    res.status(400).json({ message: err.message });
  } else {
    next(err);
  }
};

const handleInternalServerError = (err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: "Internal server error" });
};

const handleNotFound = (req, res, next) => {
  res.status(404).json({ message: "Route not found" });
};

const handleGenericError = (err, req, res, next) => {
  if (err.statusCode) {
    return res.status(err.statusCode).json({ message: err.message });
  }
  next(err);
};

module.exports = {
  validateId,
  handleInternalServerError,
  handleNotFound,
  handleGenericError,
  handleValidationError,
};
