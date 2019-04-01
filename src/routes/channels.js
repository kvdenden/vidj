const router = require("express").Router();
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
router.post("/:channelId/add", channelsController.addVideo);
router.post("/:channelId/next", onlyChannelOwner, channelsController.nextVideo);
router.post("/:channelId/move", onlyChannelOwner, channelsController.moveVideo);
router.post(
  "/:channelId/remove",
  onlyChannelOwner,
  channelsController.removeVideo
);

module.exports = router;
