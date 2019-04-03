import React, { useEffect, useState } from "react";
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
import { Button } from "semantic-ui-react";

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

  const [playing, setPlaying] = useState(true);

  return (
    <div>
      <VideoPlayer
        video={video}
        onPlay={videoPlay}
        onPause={videoPause}
        playing={playing}
        onProgress={({ playedSeconds }) => videoProgress(playedSeconds)}
        onEnded={() => playNextVideo(channelId)}
        onError={() => playNextVideo(channelId)}
      />
      <div
        style={{ display: "flex", alignItems: "center", marginTop: "0.5em" }}
      >
        <Button
          size="huge"
          circular
          color="teal"
          title={playing ? "Pause" : "Play"}
          icon={playing ? "pause" : "play"}
          onClick={() => setPlaying(!playing)}
        />
        <Button
          basic
          labelPosition="right"
          floated="right"
          content="Next Video"
          icon="forward"
          onClick={() => playNextVideo(channelId)}
          style={{ marginLeft: "auto" }}
        />
      </div>
    </div>
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
