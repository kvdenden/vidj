import {
  SET_CHANNEL_ID,
  START_SEARCH_VIDEOS,
  SEARCH_VIDEOS_SUCCESS,
  SEARCH_VIDEOS_ERROR
} from "./types";

import { memoized as invidious } from "../api/invidious";

export const setChannelId = channelId => {
  return {
    type: SET_CHANNEL_ID,
    payload: channelId
  };
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

export * from "./playlistActions";
