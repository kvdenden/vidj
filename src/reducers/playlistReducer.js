import {
  PLAY_NEXT_VIDEO,
  ADD_VIDEO_TO_PLAYLIST,
  START_FETCH_PLAYLIST,
  FETCH_PLAYLIST_SUCCESS,
  CHANGE_VIDEO_POSITION
} from "../actions/types";

const INITIAL_STATE = { loading: false, videos: [] };

const moveArray = (array, from, to) => {
  array = [...array]; // copy array
  array.splice(to, 0, ...array.splice(from, 1));
  return array;
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case START_FETCH_PLAYLIST:
      return { ...state, loading: true };
    case FETCH_PLAYLIST_SUCCESS:
      return { ...state, loading: false, videos: action.payload };
    case PLAY_NEXT_VIDEO:
      return { ...state, videos: state.videos.slice(1) };
    case ADD_VIDEO_TO_PLAYLIST:
      return { ...state, videos: [...state.videos, action.payload] };
    case CHANGE_VIDEO_POSITION:
      const { from, to } = action.payload;
      return { ...state, videos: moveArray(state.videos, from, to) };
    default:
      return state;
  }
};
