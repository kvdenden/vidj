import {
  START_FETCH_CHANNEL,
  FETCH_CHANNEL_SUCCESS,
  SET_CHANNEL_MASTER,
  FETCH_PLAYLIST_SUCCESS,
  PLAY_NEXT_VIDEO,
  ADD_VIDEO_TO_PLAYLIST,
  CHANGE_VIDEO_POSITION,
  REMOVE_VIDEO_FROM_PLAYLIST
} from "../actions/types";

const INITIAL_STATE = {
  loading: false,
  owner: false,
  master: false,
  playlist: []
};

const moveArray = (array, from, to) => {
  array = [...array]; // copy array
  array.splice(to, 0, ...array.splice(from, 1));
  return array;
};

const removeAt = (array, index) => {
  array = [...array]; // copy array
  array.splice(index, 1);
  return array;
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case START_FETCH_CHANNEL:
      return { ...INITIAL_STATE, loading: true };
    case FETCH_CHANNEL_SUCCESS:
      const { playlist, owner } = action.payload;
      return { ...state, loading: false, owner, playlist };
    case SET_CHANNEL_MASTER:
      return { ...state, master: action.payload };
    case FETCH_PLAYLIST_SUCCESS:
      return { ...state, playlist: action.payload };
    case PLAY_NEXT_VIDEO:
      return { ...state, playlist: state.playlist.slice(1) };
    case ADD_VIDEO_TO_PLAYLIST:
      return { ...state, playlist: [...state.playlist, action.payload] };
    case CHANGE_VIDEO_POSITION:
      const { from, to } = action.payload;
      return { ...state, playlist: moveArray(state.playlist, from, to) };
    case REMOVE_VIDEO_FROM_PLAYLIST:
      const position = action.payload;
      return { ...state, playlist: removeAt(state.playlist, position) };
    default:
      return state;
  }
};
