const mongoose = require("mongoose");

const validateId = (req, res, next) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send({ message: "Invalid event id" });
  }
  next();
};

const handleInternalServerError = (err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: "Internal server error" });
};

module.exports = { validateId, handleInternalServerError };
