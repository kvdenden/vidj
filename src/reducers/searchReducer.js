import {
  START_FETCH_VIDEOS,
  FETCH_VIDEOS_SUCCESS,
  FETCH_VIDEOS_ERROR
} from "../actions/types";

const INITIAL_STATE = {
  loading: false,
  results: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case START_FETCH_VIDEOS:
      return { ...state, loading: true };
    case FETCH_VIDEOS_SUCCESS:
      return { ...state, results: action.payload, loading: false };
    case FETCH_VIDEOS_ERROR:
      return { ...state, results: [], loading: false, error: action.payload };
    default:
      return state;
  }
};
