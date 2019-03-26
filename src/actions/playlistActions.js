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
  getState,
  apiCall,
  ...extraArgs
) => {
  const { channelId } = getState().channel;
  const { playlist } = await apiCall(channelId, ...extraArgs);
  const videos = await Promise.all(
    playlist.map(videoId => invidious.get(videoId))
  );
  dispatch({
    type: FETCH_PLAYLIST_SUCCESS,
    payload: videos
  });
};

export const fetchPlaylist = () => async (dispatch, getState) => {
  dispatch({
    type: START_FETCH_PLAYLIST
  });

  callAndUpdatePlaylist(dispatch, getState, vidj.get);
};

export const playNextVideo = () => async (dispatch, getState) => {
  dispatch({
    type: PLAY_NEXT_VIDEO
  });

  callAndUpdatePlaylist(dispatch, getState, vidj.nextVideo);
};

export const addVideoToPlaylist = video => async (dispatch, getState) => {
  dispatch({
    type: ADD_VIDEO_TO_PLAYLIST,
    payload: video
  });

  callAndUpdatePlaylist(dispatch, getState, vidj.addVideo, video.videoId);
};

export const changeVideoPosition = (from, to) => async (dispatch, getState) => {
  dispatch({
    type: CHANGE_VIDEO_POSITION,
    payload: { from, to }
  });

  callAndUpdatePlaylist(dispatch, getState, vidj.moveVideo, from, to);
};
