import {
  PLAY_NEXT_VIDEO,
  ADD_VIDEO_TO_PLAYLIST,
  START_FETCH_PLAYLIST,
  FETCH_PLAYLIST_SUCCESS,
  CHANGE_VIDEO_POSITION
} from "./types";

import { memoized as invidious } from "../api/invidious";
import * as vidj from "../api/vidj";

const callAndUpdatePlaylist = async (
  dispatch,
  apiCall,
  channelId,
  ...extraArgs
) => {
  const { playlist } = await apiCall(channelId, ...extraArgs);
  const videos = await Promise.all(
    playlist.map(videoId => invidious.get(videoId))
  );
  dispatch({
    type: FETCH_PLAYLIST_SUCCESS,
    payload: videos
  });
};

export const fetchPlaylist = channelId => async dispatch => {
  dispatch({
    type: START_FETCH_PLAYLIST
  });

  callAndUpdatePlaylist(dispatch, vidj.get, channelId);
};

export const playNextVideo = () => async dispatch => {
  dispatch({
    type: PLAY_NEXT_VIDEO
  });

  callAndUpdatePlaylist(dispatch, vidj.nextVideo);
};

export const addVideoToPlaylist = (channelId, video) => async dispatch => {
  dispatch({
    type: ADD_VIDEO_TO_PLAYLIST,
    payload: video
  });

  callAndUpdatePlaylist(dispatch, vidj.addVideo, channelId, video.videoId);
};

export const changeVideoPosition = (channelId, from, to) => async dispatch => {
  dispatch({
    type: CHANGE_VIDEO_POSITION,
    payload: { from, to }
  });

  callAndUpdatePlaylist(dispatch, vidj.moveVideo, channelId, from, to);
};
