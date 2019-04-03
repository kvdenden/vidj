const syncVideoStatus = socket => {
  socket.on("videoStatus", (channelId, videoStatus) => {
    socket.to(channelId).emit("videoStatus", channelId, videoStatus);
  });
};

module.exports = syncVideoStatus;
