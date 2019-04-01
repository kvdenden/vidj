const socketio = require("socket.io");
const server = require("../server");
const User = require("../models/User");
const Channel = require("../models/Channel");
const channelService = require("../services/channelService");

const io = socketio(server);

const broadcastPlaylistChange = channel => {
  const channelId = channel.id;
  io.to(channelId).emit("playlistChange", channelId, channel.playlist);
};

["addVideo", "nextVideo", "moveVideo", "removeVideo"].forEach(method => {
  const originalMethod = channelService[method];
  const wrappedMethod = async (...args) => {
    const result = await originalMethod(...args);
    console.log(`broadcasting channel update: ${method}`);
    broadcastPlaylistChange(result);
    return result;
  };
  channelService[method] = wrappedMethod;
});

const masterSockets = {};

const currentMaster = channelId => {
  const masterSocket = masterSockets[channelId];
  if (masterSocket && masterSocket.connected) {
    return masterSocket;
  }
};

const unsetMaster = channelId => {
  const masterSocket = currentMaster(channelId);
  if (masterSocket) {
    masterSocket.emit("setMaster", channelId, false);
  }
  masterSockets[channelId] = undefined;
};

const setMaster = (channelId, socket) => {
  socket.emit("setMaster", channelId, true);
  masterSockets[channelId] = socket;
};

io.on("connection", socket => {
  console.log(`${socket.id} connected`);
  let socketUser;

  socket.on("auth", async (token, callback) => {
    socketUser = await User.findOne({ token });
    console.log(`${socket.id} auth as user ${socketUser}`);
    if (callback) {
      const authenticated = !!socketUser;
      callback(authenticated);
    }
  });

  socket.on("joinChannel", async channelId => {
    console.log(`${socket.id} joined channel ${channelId}`);
    socket.join(channelId);
    const channel = await Channel.findById(channelId);
    if (
      socketUser &&
      socketUser.id == channel.owner &&
      !currentMaster(channelId)
    ) {
      console.log("Setting master");
      setMaster(channelId, socket);
    }
  });

  socket.on("leaveChannel", channelId => {
    console.log(`${socket.id} left channel ${channelId}`);
    if (socket === currentMaster(channelId)) {
      unsetMaster(channelId);
    }
    socket.leave(channelId);
  });

  socket.on("requestMaster", channelId => {
    console.log(`${socket.id} requests master`);
    if (socketUser && socketUser.id == channel.owner) {
      if (currentMaster(channelId)) {
        unsetMaster(channelId);
      }
      setMaster(channelId, socket);
    }
  });

  socket.on("disconnect", () => {
    console.log(`${socket.id} disconnected`);
  });
});

module.exports = io;
