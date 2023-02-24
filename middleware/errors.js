const mongoose = require("mongoose");

const validateId = (req, res, next) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send({ message: "Invalid event id" });
  }
  next();
};

module.exports = { validateId };
