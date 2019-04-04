import { START_SEARCH_VIDEOS, SEARCH_VIDEOS_SUCCESS } from "../actions/types";

const INITIAL_STATE = {
  loading: false,
  results: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case START_SEARCH_VIDEOS:
      return { ...state, loading: true };
    case SEARCH_VIDEOS_SUCCESS:
      return { ...state, results: action.payload, loading: false };
    default:
      return state;
  }
};
