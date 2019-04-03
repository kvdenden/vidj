import {
  VIDEO_START,
  VIDEO_PLAY,
  VIDEO_PAUSE,
  VIDEO_PROGRESS,
  SET_VIDEO_STATUS,
  PLAY_NEXT_VIDEO
} from "../actions/types";

const INITIAL_STATE = { playing: false };

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case VIDEO_START:
      return { total: action.payload.duration };
    case VIDEO_PLAY:
      return { ...state, playing: true };
    case VIDEO_PAUSE:
      return { ...state, playing: false };
    case VIDEO_PROGRESS:
      return { ...state, progress: action.payload };
    case SET_VIDEO_STATUS:
      return action.payload;
    case PLAY_NEXT_VIDEO:
      return INITIAL_STATE;
    default:
      return state;
  }
};
