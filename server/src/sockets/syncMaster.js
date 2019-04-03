const User = require("../models/User");
const Channel = require("../models/Channel");

const masterSockets = {};

const currentMaster = channelId => {
  const masterSocket = masterSockets[channelId];
  if (masterSocket && masterSocket.connected) {
    return masterSocket;
  }
};

const setMaster = (channelId, socket) => {
  socket.emit("setMaster", channelId, true);
  masterSockets[channelId] = socket;
};

const unsetMaster = channelId => {
  const masterSocket = currentMaster(channelId);
  if (masterSocket) {
    masterSocket.emit("setMaster", channelId, false);
  }
  masterSockets[channelId] = undefined;
};

const syncMaster = socket => {
  let socketUser = {};

  socket.on("auth", async token => {
    socketUser = await User.findOne({ token });
  });

  socket.on("joinChannel", async channelId => {
    const channel = await Channel.findById(channelId);
    if (socketUser.id == channel.owner && !currentMaster(channelId)) {
      console.log("Setting master");
      setMaster(channelId, socket);
    }
  });

  socket.on("leaveChannel", channelId => {
    if (socket === currentMaster(channelId)) {
      unsetMaster(channelId);
    }
    socket.leave(channelId);
  });
};

module.exports = syncMaster;
