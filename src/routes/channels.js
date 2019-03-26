const router = require("express").Router();
const User = require("../models/User");
const Channel = require("../models/Channel");
const channelsController = require("../controllers/channelsController");

const onlyAuthorized = (req, res, next) => {
  req.user ? next() : res.status(401).end();
};

const onlyChannelOwner = (req, res, next) => {
  onlyAuthorized(req, res, async () => {
    const { channelId } = req.params;
    const channel = await Channel.findById(channelId);
    req.user.id == channel.owner ? next() : res.status(401).end();
  });
};

router.get("/", channelsController.index);
router.get("/:channelId", channelsController.show);

router.post("/", onlyAuthorized, channelsController.create);
router.post("/:channelId/add", channelsController.addSong);
router.post("/:channelId/next", onlyChannelOwner, channelsController.nextSong);
router.post("/:channelId/move", onlyChannelOwner, channelsController.moveSong);

module.exports = router;
