import {
  START_SEARCH_VIDEOS,
  SEARCH_VIDEOS_SUCCESS,
  AUTH_SUCCESS,
  START_AUTH,
  SET_NOTIFICATION_MESSAGE,
  CLEAR_NOTIFICATION_MESSAGE
} from "./types";

import { memoized as invidious } from "../api/invidious";
import { auth } from "../api/vidj";

export const fetchAuthToken = () => async dispatch => {
  dispatch({
    type: START_AUTH
  });
  try {
    const token = await auth();
    localStorage.setItem("token", token);
    dispatch({
      type: AUTH_SUCCESS,
      payload: token
    });
  } catch (error) {
    dispatch(setNotificationMessage(error.message));
  }
};

export const searchVideos = query => async dispatch => {
  dispatch({
    type: START_SEARCH_VIDEOS
  });
  try {
    const response = query ? await invidious.search(query) : { results: [] };
    dispatch({
      type: SEARCH_VIDEOS_SUCCESS,
      payload: response.results
    });
  } catch (error) {
    dispatch(setNotificationMessage(error.message));
  }
};

export const setNotificationMessage = (
  message,
  title = "Something went wrong",
  style = "error"
) => {
  return {
    type: SET_NOTIFICATION_MESSAGE,
    payload: { title, message, style }
  };
};

export const clearNotificationMessage = () => {
  return {
    type: CLEAR_NOTIFICATION_MESSAGE
  };
};

export * from "./channelActions";
export * from "./videoActions";
export * from "./socketActions";
