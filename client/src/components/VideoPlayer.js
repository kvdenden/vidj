import React from "react";
import ReactPlayer from "react-player";

const VideoPlayer = ({ video, playing, ...props }) => {
  let player;
  const { videoId } = video;

  if (videoId) {
    const { onStart, onPlay, onPause, onProgress, onEnded, onError } = props;
    player = (
      <ReactPlayer
        url={`//www.youtube.com/watch?v=${videoId}`}
        playing={playing}
        controls
        onStart={onStart}
        onPlay={onPlay}
        onPause={onPause}
        onProgress={onProgress}
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
  onPlay: () => {},
  onPause: () => {},
  onProgress: () => {},
  onEnded: () => {},
  onError: () => {}
};

export default VideoPlayer;
