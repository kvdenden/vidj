import {
  START_SEARCH_VIDEOS,
  SEARCH_VIDEOS_SUCCESS,
  SEARCH_VIDEOS_ERROR,
  AUTH_SUCCESS,
  START_AUTH
} from "./types";

import { memoized as invidious } from "../api/invidious";
import { auth } from "../api/vidj";

export const fetchAuthToken = () => async dispatch => {
  dispatch({
    type: START_AUTH
  });
  const token = await auth();
  localStorage.setItem("token", token);
  dispatch({
    type: AUTH_SUCCESS,
    payload: token
  });
};

export const searchVideos = query => async dispatch => {
  dispatch({
    type: START_SEARCH_VIDEOS
  });
  const response = query ? await invidious.search(query) : { results: [] };
  if (response.error) {
    dispatch({
      type: SEARCH_VIDEOS_ERROR,
      payload: response.error
    });
  } else {
    dispatch({
      type: SEARCH_VIDEOS_SUCCESS,
      payload: response.results
    });
  }
};

export * from "./channelActions";
export * from "./socketActions";
