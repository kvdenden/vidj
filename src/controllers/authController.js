const User = require("../models/User");

module.exports = {
  auth: async (req, res) => {
    if (req.user) {
      res.send(req.user.token);
    } else {
      const user = await new User().save();
      res.status(201).send(user.token);
    }
  }
};
