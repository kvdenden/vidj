import io from "socket.io-client";
import store from "../store";
import { setChannelMaster, updatePlaylist } from "../actions";

const socket = io("http://localhost:8080");

socket.on("connect", () => {
  let authToken;

  // store.subscribe returns unsubscribe function
  const unsubscribe = store.subscribe(() => {
    const prevToken = authToken;
    authToken = store.getState().auth.token;
    if (prevToken !== authToken) {
      socket.emit("auth", authToken);
    }
  });

  socket.on("playlistChange", dispatchPlaylistChange);
  socket.on("setMaster", dispatchSetChannelMaster);

  socket.on("disconnect", () => {
    unsubscribe();
  });
});

const dispatchPlaylistChange = playlist => {
  updatePlaylist(playlist)(store.dispatch);
};

const dispatchSetChannelMaster = master => {
  store.dispatch(setChannelMaster(master));
};

socket.on("playlistChange", (_channelId, playlist) =>
  dispatchPlaylistChange(playlist)
);
socket.on("setMaster", (_channelId, master) =>
  dispatchSetChannelMaster(master)
);

export const joinChannel = channelId => {
  socket.emit("joinChannel", channelId);
};

export const leaveChannel = channelId => {
  socket.emit("leaveChannel", channelId);
};
