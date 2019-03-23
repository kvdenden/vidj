import {
  START_FETCH_VIDEOS,
  FETCH_VIDEOS_SUCCESS,
  FETCH_VIDEOS_ERROR,
  PLAY_NEXT_VIDEO,
  ADD_VIDEO_TO_PLAYLIST
} from "./types";

import * as invidious from "../api/invidious";

export const searchVideos = query => async dispatch => {
  dispatch({
    type: START_FETCH_VIDEOS
  });
  const response = query ? await invidious.search(query) : { results: [] };
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

export const playNextVideo = () => {
  return {
    type: PLAY_NEXT_VIDEO
  };
};

export const addVideoToPlaylist = video => {
  return {
    type: ADD_VIDEO_TO_PLAYLIST,
    payload: video
  };
};
