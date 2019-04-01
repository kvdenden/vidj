import {
  SOCKET_CONNECT,
  SOCKET_DISCONNECT,
  SOCKET_AUTH,
  SUBSCRIBE_TO_CHANNEL,
  UNSUBSCRIBE_FROM_CHANNEL
} from "./types";
import { joinChannel, leaveChannel, auth } from "../api/socket";

export const socketConnect = () => {
  return {
    type: SOCKET_CONNECT
  };
};

export const socketDisconnect = () => {
  return {
    type: SOCKET_DISCONNECT
  };
};

export const socketAuth = token => async dispatch => {
  const authenticated = await auth(token);
  console.log(`socketAuth ${authenticated}`);
  dispatch({
    type: SOCKET_AUTH,
    payload: authenticated
  });
};

export const subscribeToChannel = channelId => {
  joinChannel(channelId);

  return {
    type: SUBSCRIBE_TO_CHANNEL,
    payload: channelId
  };
};

export const unsubscribeFromChannel = channelId => {
  leaveChannel(channelId);

  return {
    type: UNSUBSCRIBE_FROM_CHANNEL,
    payload: channelId
  };
};
