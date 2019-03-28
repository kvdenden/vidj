import io from "socket.io-client";
import store from "../store";
import { updatePlaylist } from "../actions/playlistActions";

const socket = io("http://localhost:8080");

const dispatchPlaylistChange = playlist => {
  updatePlaylist(playlist)(store.dispatch);
};

export const joinChannel = channelId => {
  socket.emit("joinChannel", channelId);

  socket.on("playlistChange", dispatchPlaylistChange);
};

export const leaveChannel = channelId => {
  socket.emit("leaveChannel", channelId);

  socket.off("playlistChange", dispatchPlaylistChange);
};
