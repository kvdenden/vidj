const router = require("express").Router();
const Channel = require("../models/Channel");

router.get("/", async (req, res) => {
  const channels = await Channel.find();
  res.send(channels);
});

router.post("/", async (req, res) => {
  const { title } = req.body;
  try {
    const channel = await new Channel({ title }).save();
    res.send(channel);
  } catch (err) {
    res.status(422).send(err);
  }
});

router.get("/:channelId", async (req, res) => {
  const { channelId } = req.params;
  const channel = await Channel.findById(channelId);
  if (channel) {
    res.send(channel);
  } else {
    res.status(404).send();
  }
});

router.post("/:channelId/add", async (req, res) => {
  const { channelId } = req.params;
  const { videoId } = req.body;
  const channel = await Channel.findByIdAndUpdate(channelId, {
    $push: { playlist: videoId }
  });
  if (channel) {
    res.status(204).send();
  } else {
    res.status(404).send();
  }
});

module.exports = router;
