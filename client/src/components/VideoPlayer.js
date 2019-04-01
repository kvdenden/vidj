import React from "react";
import ReactPlayer from "react-player";

const VideoPlayer = ({ video, onStart, onEnded, onError }) => {
  let player;
  const { videoId } = video;

  if (videoId) {
    player = (
      <ReactPlayer
        url={`//www.youtube.com/watch?v=${videoId}`}
        playing
        controls
        onStart={onStart}
        onEnded={onEnded}
        onError={onError}
      />
    );
  }

  return <div className="ui embed">{player}</div>;
};

VideoPlayer.defaultProps = {
  video: {},
  onStart: () => {},
  onEnded: () => {},
  onError: () => {}
};

export default VideoPlayer;
