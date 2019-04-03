import React, { useEffect } from "react";
import { connect } from "react-redux";

import {
  videoStart,
  videoPlay,
  videoPause,
  videoProgress,
  playNextVideo
} from "../actions";

import { broadcastVideoStatus } from "../api/socket";

import VideoPlayer from "./VideoPlayer";

const SyncedVideoPlayer = props => {
  const {
    video,
    channelId,
    socketReady,
    videoStatus,
    videoStart,
    videoPlay,
    videoPause,
    videoProgress,
    playNextVideo
  } = props;

  useEffect(() => {
    if (video) {
      videoStart(video);
    }
  }, [video]);

  useEffect(() => {
    if (socketReady) {
      broadcastVideoStatus(channelId, videoStatus);
    }
  }, [videoStatus, socketReady]);

  return (
    <VideoPlayer
      video={video}
      onPlay={videoPlay}
      onPause={videoPause}
      onProgress={({ playedSeconds }) => videoProgress(playedSeconds)}
      onEnded={() => playNextVideo(channelId)}
      onError={() => playNextVideo(channelId)}
    />
  );
};

const mapStateToProps = ({ videoStatus, socket }) => {
  return {
    videoStatus,
    socketReady: socket.connected
  };
};

export default connect(
  mapStateToProps,
  { videoStart, videoPlay, videoPause, videoProgress, playNextVideo }
)(SyncedVideoPlayer);
