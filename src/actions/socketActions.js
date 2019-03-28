import { SUBSCRIBE_TO_CHANNEL, UNSUBSCRIBE_FROM_CHANNEL } from "./types";
import { joinChannel, leaveChannel } from "../api/sockets";

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
