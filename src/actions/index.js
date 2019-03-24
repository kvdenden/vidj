import {
  START_FETCH_VIDEOS,
  FETCH_VIDEOS_SUCCESS,
  FETCH_VIDEOS_ERROR,
  PLAY_NEXT_VIDEO,
  ADD_VIDEO_TO_PLAYLIST,
  START_FETCH_PLAYLIST,
  FETCH_PLAYLIST_SUCCESS,
  CHANGE_VIDEO_POSITION
} from "./types";

import * as invidious from "../api/invidious";
import * as vidj from "../api/vidj";

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

export const fetchPlaylist = channelId => async dispatch => {
  dispatch({
    type: START_FETCH_PLAYLIST
  });
  const { playlist } = await vidj.get(channelId);
  const videos = await Promise.all(
    playlist.map(videoId => invidious.get(videoId))
  );
  dispatch({
    type: FETCH_PLAYLIST_SUCCESS,
    payload: videos
  });
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

export const changeVideoPosition = (from, to) => {
  return {
    type: CHANGE_VIDEO_POSITION,
    payload: { from, to }
  };
};
