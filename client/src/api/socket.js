import io from "socket.io-client";
import store from "../store";
import {
  socketConnect,
  socketDisconnect,
  updatePlaylist,
  setChannelMaster,
  setVideoStatus
} from "../actions";

const socket = io("http://localhost:8080");

socket.on("connect", () => {
  store.dispatch(socketConnect());
});

socket.on("disconnect", () => {
  store.dispatch(socketDisconnect());
});

socket.on("playlistChange", (_channelId, playlist) => {
  store.dispatch(updatePlaylist(playlist));
});

socket.on("setMaster", (_channelId, master) => {
  store.dispatch(setChannelMaster(master));
});

socket.on("videoStatus", (_channelId, videoStatus) => {
  console.log(videoStatus);
  store.dispatch(setVideoStatus(videoStatus));
});

export default socket;

export const auth = token => {
  return new Promise(resolve =>
    socket.emit("auth", token, authenticated => {
      console.log(`socket auth response ${authenticated}`);
      resolve(authenticated);
    })
  );
};

export const joinChannel = channelId => {
  socket.emit("joinChannel", channelId);
};

export const leaveChannel = channelId => {
  socket.emit("leaveChannel", channelId);
};

export const broadcastVideoStatus = (channelId, videoStatus) => {
  console.log("broadcasting video status", videoStatus);
  socket.emit("videoStatus", channelId, videoStatus);
};
