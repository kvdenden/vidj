import {
  START_FETCH_VIDEOS,
  FETCH_VIDEOS_SUCCESS,
  FETCH_VIDEOS_ERROR
} from "./types";

// import youtube from "../api/youtube";
import invidious from "../api/invidious";

export const searchVideos = query => async dispatch => {
  dispatch({
    type: START_FETCH_VIDEOS
  });
  const response = query ? await invidious(query) : { results: [] };
  if (response.error) {
    dispatch({
      type: FETCH_VIDEOS_ERROR,
      payload: response.error
    });
  } else {
    dispatch({
      type: FETCH_VIDEOS_SUCCESS,
      payload: response.results
    });
  }
};
