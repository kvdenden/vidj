const channelService = require("../services/channelService");

const serviceMethods = [
  "addVideo",
  "nextVideo",
  "moveVideo",
  "removeVideo",
  "vote"
];

module.exports = io => {
  const broadcastPlaylistChange = channel => {
    const channelId = channel.id;
    io.to(channelId).emit("playlistChange", channelId);
  };

  serviceMethods.forEach(method => {
    const originalMethod = channelService[method];
    const wrappedMethod = async (...args) => {
      const result = await originalMethod(...args);
      broadcastPlaylistChange(result);
      return result;
    };
    channelService[method] = wrappedMethod;
  });
};
