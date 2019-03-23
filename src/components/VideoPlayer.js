import React from "react";
import { connect } from "react-redux";
import ReactPlayer from "react-player";
import { playNextVideo } from "../actions";

const VideoPlayer = ({ videoId, onStart, onEnded }) => {
  let player;

  if (videoId) {
    player = (
      <ReactPlayer
        url={`//www.youtube.com/watch?v=${videoId}`}
        playing
        controls
        onStart={onStart}
        onEnded={onEnded}
      />
    );
  }

  return <div className="ui embed">{player}</div>;
};

VideoPlayer.defaultProps = {
  onStart: () => {},
  onEnded: () => {}
};

export default connect(
  null,
  { onEnded: playNextVideo }
)(VideoPlayer);
