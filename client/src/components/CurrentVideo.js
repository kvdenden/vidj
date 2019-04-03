import React from "react";
import { connect } from "react-redux";

import SyncedVideoPlayer from "./SyncedVideoPlayer";
import VideoItem from "./VideoItem";

const CurrentVideo = ({ channelId, channel, videoStatus }) => {
  const {
    master,
    playlist: [currentVideo]
  } = channel;

  if (master) {
    return <SyncedVideoPlayer channelId={channelId} video={currentVideo} />;
  } else if (currentVideo) {
    return <VideoItem video={currentVideo} videoStatus={videoStatus} />;
  } else {
    return null;
  }
};

const mapStateToProps = ({ videoStatus }) => {
  return { videoStatus };
};

export default connect(mapStateToProps)(CurrentVideo);
