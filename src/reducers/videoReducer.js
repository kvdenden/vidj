import { PLAY_NEXT_VIDEO, ADD_VIDEO_TO_PLAYLIST } from "../actions/types";

export default (state = [], action) => {
  switch (action.type) {
    case PLAY_NEXT_VIDEO:
      return state.slice(1);
    case ADD_VIDEO_TO_PLAYLIST:
      return [...state, action.payload];
    default:
      return state;
  }
};
