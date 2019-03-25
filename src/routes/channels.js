const router = require("express").Router();
const channelsController = require("../controllers/channelsController");

router.get("/", channelsController.index);

router.post("/", channelsController.create);

router.get("/:channelId", channelsController.show);

router.post("/:channelId/add", channelsController.addSong);
router.post("/:channelId/next", channelsController.nextSong);
router.post("/:channelId/move", channelsController.moveSong);

module.exports = router;
