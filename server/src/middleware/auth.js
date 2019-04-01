const User = require("../models/User");

const authMiddleware = async (req, res, next) => {
  const token = req.token;
  if (token) {
    const user = await User.findOne({ token });
    req.user = user;
  }
  next();
};

module.exports = authMiddleware;
