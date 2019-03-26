import { SET_CHANNEL_ID } from "../actions/types";

const INITIAL_STATE = { channelId: "27I9jKM2x" };

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_CHANNEL_ID:
      return { channelId: action.payload };
    default:
      return state;
  }
};
