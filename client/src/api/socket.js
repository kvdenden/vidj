import io from "socket.io-client";
import store from "../store";
import {
  socketConnect,
  socketDisconnect,
  updatePlaylist,
  setChannelMaster
} from "../actions";

const socket = io("http://localhost:8080");

socket.on("connect", () => {
  store.dispatch(socketConnect());
});

socket.on("disconnect", () => {
  store.dispatch(socketDisconnect());
});

socket.on("playlistChange", (_channelId, playlist) =>
  store.dispatch(updatePlaylist(playlist))
);

socket.on("setMaster", (_channelId, master) =>
  store.dispatch(setChannelMaster(master))
);

export default socket;

export const auth = token => {
  console.log(`socket auth ${token}`);
  return new Promise(resolve =>
    socket.emit("auth", token, authenticated => {
      console.log(`socket auth response ${authenticated}`);
      resolve(authenticated);
    })
  );
};

export const joinChannel = channelId => {
  console.log(`join channel ${channelId}`);
  socket.emit("joinChannel", channelId);
};

export const leaveChannel = channelId => {
  console.log(`leave channel ${channelId}`);
  socket.emit("leaveChannel", channelId);
};

export const requestMaster = channelId => {
  console.log(`request master for ${channelId}`);
  socket.emit("requestMaster", channelId);
};
