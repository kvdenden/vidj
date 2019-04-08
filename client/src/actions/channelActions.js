import _ from "lodash";

import {
  START_FETCH_CHANNEL,
  FETCH_CHANNEL_SUCCESS,
  FETCH_PLAYLIST_SUCCESS,
  PLAY_NEXT_VIDEO,
  ADD_VIDEO_TO_PLAYLIST,
  CHANGE_VIDEO_POSITION,
  UPVOTE_VIDEO,
  DOWNVOTE_VIDEO,
  SET_CHANNEL_MASTER,
  REMOVE_VIDEO_FROM_PLAYLIST,
  FETCH_MY_CHANNELS_SUCCESS,
  DELETE_CHANNEL_SUCCESS
} from "./types";

import { memoized as invidious } from "../api/invidious";
import * as vidj from "../api/vidj";

import { setNotificationMessage } from "./";

const fetchVideos = async videoIds => {
  const videos = await Promise.all(
    videoIds.map(videoId => invidious.get(videoId))
  );
  return videos;
};

export const updatePlaylist = playlist => async dispatch => {
  try {
    const videoIds = playlist.map(video => video.videoId);
    const videos = await fetchVideos(videoIds);
    dispatch({
      type: FETCH_PLAYLIST_SUCCESS,
      payload: _.merge(playlist, videos)
    });
  } catch (error) {
    dispatch(setNotificationMessage(error.message));
  }
};

const callAndUpdatePlaylist = async (
  dispatch,
  apiCall,
  channelId,
  ...extraArgs
) => {
  try {
    const { playlist } = await apiCall(channelId, ...extraArgs);
    dispatch(updatePlaylist(playlist));
  } catch (error) {
    dispatch(setNotificationMessage(error.message));
  }
};

export const fetchMyChannels = () => async dispatch => {
  try {
    const channels = await vidj.index();
    dispatch({
      type: FETCH_MY_CHANNELS_SUCCESS,
      payload: channels
    });
  } catch (error) {
    dispatch(setNotificationMessage(error.message));
  }
};

export const deleteChannel = channelId => async dispatch => {
  try {
    await vidj.deleteChannel(channelId);
    dispatch({
      type: DELETE_CHANNEL_SUCCESS,
      payload: channelId
    });
  } catch (error) {
    dispatch(setNotificationMessage(error.message));
  }
};

export const fetchChannel = channelId => async dispatch => {
  dispatch({
    type: START_FETCH_CHANNEL
  });

  try {
    const channel = await vidj.get(channelId);
    dispatch({
      type: FETCH_CHANNEL_SUCCESS,
      payload: channel
    });

    dispatch(updatePlaylist(channel.playlist));
  } catch (error) {
    dispatch(setNotificationMessage(error.message));
  }
};

export const playNextVideo = channelId => async dispatch => {
  dispatch({
    type: PLAY_NEXT_VIDEO
  });

  callAndUpdatePlaylist(dispatch, vidj.nextVideo, channelId);
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

export const removeVideoFromPlaylist = (channelId, index) => async dispatch => {
  dispatch({
    type: REMOVE_VIDEO_FROM_PLAYLIST,
    payload: index
  });

  callAndUpdatePlaylist(dispatch, vidj.removeVideo, channelId, index);
};

export const upvoteVideo = (channelId, index) => async dispatch => {
  dispatch({
    type: UPVOTE_VIDEO,
    payload: index
  });

  callAndUpdatePlaylist(dispatch, vidj.upvoteVideo, channelId, index);
};

export const downvoteVideo = (channelId, index) => async dispatch => {
  dispatch({
    type: DOWNVOTE_VIDEO,
    payload: index
  });

  callAndUpdatePlaylist(dispatch, vidj.downvoteVideo, channelId, index);
};

export const setChannelMaster = (master = true) => {
  return {
    type: SET_CHANNEL_MASTER,
    payload: master
  };
};
