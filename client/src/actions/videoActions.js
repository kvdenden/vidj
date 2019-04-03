import {
  VIDEO_START,
  VIDEO_PLAY,
  VIDEO_PAUSE,
  VIDEO_PROGRESS,
  SET_VIDEO_STATUS
} from "./types";

export const setVideoStatus = videoStatus => {
  return {
    type: SET_VIDEO_STATUS,
    payload: videoStatus
  };
};

export const videoStart = video => {
  return {
    type: VIDEO_START,
    payload: video
  };
};

export const videoPlay = () => {
  return {
    type: VIDEO_PLAY
  };
};

export const videoPause = () => {
  return {
    type: VIDEO_PAUSE
  };
};

export const videoProgress = progress => {
  return {
    type: VIDEO_PROGRESS,
    payload: progress
  };
};
