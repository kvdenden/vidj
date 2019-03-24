import {
  PLAY_NEXT_VIDEO,
  ADD_VIDEO_TO_PLAYLIST,
  FETCH_PLAYLIST_SUCCESS
} from "../actions/types";

const INITIAL_STATE = [];

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_PLAYLIST_SUCCESS:
      return action.payload;
    case PLAY_NEXT_VIDEO:
      return state.slice(1);
    case ADD_VIDEO_TO_PLAYLIST:
      return [...state, action.payload];
    default:
      return state;
  }
};
