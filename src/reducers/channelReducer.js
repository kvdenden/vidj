import { SET_CHANNEL_ID, SET_CHANNEL_MASTER } from "../actions/types";

const INITIAL_STATE = { channelId: "A0RFpuoNR", master: true };

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_CHANNEL_ID:
      return { ...state, channelId: action.payload };
    case SET_CHANNEL_MASTER:
      return { ...state, master: action.payload };
    default:
      return state;
  }
};
