import {
  FETCH_MY_CHANNELS_SUCCESS,
  DELETE_CHANNEL_SUCCESS
} from "../actions/types";

export default (state = [], action) => {
  switch (action.type) {
    case FETCH_MY_CHANNELS_SUCCESS:
      return action.payload;
    case DELETE_CHANNEL_SUCCESS:
      return state.filter(({ id }) => id !== action.payload);
    default:
      return state;
  }
};
