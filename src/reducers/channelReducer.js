import { SET_CHANNEL_MASTER } from "../actions/types";

const INITIAL_STATE = { master: true };

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_CHANNEL_MASTER:
      return { ...state, master: action.payload };
    default:
      return state;
  }
};
