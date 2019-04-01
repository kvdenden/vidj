const channelService = require("../services/channelService");

const channelData = channel => {
  const { id, playlist } = channel;
  return { id, playlist };
};

module.exports = {
  index: async (req, res) => {
    const { id } = req.query;
    const filter = id ? { _id: id } : {};
    const channels = await channelService.find(filter);
    const data = channels.map(channelData);
    res.send(data);
  },

  show: async (req, res) => {
    const { channelId } = req.params;
    const channel = await channelService.get(channelId);
    if (channel) {
      const data = channelData(channel);
      const isOwner = req.user && req.user.id == channel.owner;
      res.send({ ...data, owner: isOwner });
    } else {
      res.status(404).send();
    }
  },

  create: async (req, res) => {
    try {
      const channel = await channelService.create({ owner: req.user });
      const data = channelData(channel);
      res.send(data);
    } catch (err) {
      res.status(422).send(err);
    }
  },

  addVideo: async (req, res) => {
    const { channelId } = req.params;
    const { videoId } = req.body;
    const channel = await channelService.addVideo(channelId, videoId);
    if (channel) {
      const data = channelData(channel);
      res.send(data);
    } else {
      res.status(404).send();
    }
  },

  nextVideo: async (req, res) => {
    const { channelId } = req.params;
    const channel = await channelService.nextVideo(channelId);
    if (channel) {
      const data = channelData(channel);
      res.send(data);
    } else {
      res.status(404).send();
    }
  },

  moveVideo: async (req, res) => {
    const { channelId } = req.params;
    const { from, to } = req.body;

    const channel = await channelService.moveVideo(channelId, from, to);
    if (channel) {
      res.send(channel);
    } else {
      res.status(404).send();
    }
  },

  removeVideo: async (req, res) => {
    const { channelId } = req.params;
    const { index } = req.body;

    const channel = await channelService.removeVideo(channelId, index);
    if (channel) {
      const data = channelData(channel);
      res.send(data);
    } else {
      res.status(404).send();
    }
  }
};
