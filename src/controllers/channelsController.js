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
      res.send(data);
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

  addSong: async (req, res) => {
    const { channelId } = req.params;
    const { videoId } = req.body;
    const channel = await channelService.addSong(channelId, videoId);
    if (channel) {
      const data = channelData(channel);
      res.send(data);
    } else {
      res.status(404).send();
    }
  },

  nextSong: async (req, res) => {
    const { channelId } = req.params;
    const channel = await channelService.nextSong(channelId);
    if (channel) {
      const data = channelData(channel);
      res.send(data);
    } else {
      res.status(404).send();
    }
  },

  moveSong: async (req, res) => {
    const { channelId } = req.params;
    const { from, to } = req.body;

    const channel = await channelService.moveSong(channelId, from, to);
    if (channel) {
      res.send(channel);
    } else {
      res.status(404).send();
    }
  }
};
