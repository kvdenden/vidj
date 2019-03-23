import React from "react";
import { connect } from "react-redux";
import "./App.css";

import VideoPlayer from "./VideoPlayer";
import VideoSearch from "./VideoSearch";
import Playlist from "./Playlist";
import { addVideoToPlaylist } from "../actions";
import { Divider, Segment } from "semantic-ui-react";

const App = ({ currentVideo, nextVideos, addVideoToPlaylist }) => {
  return (
    <div className="ui container">
      <VideoPlayer {...currentVideo} />
      <Divider />
      <VideoSearch onVideoSelect={addVideoToPlaylist} />
      <Segment>
        <Playlist videos={nextVideos} />
      </Segment>
    </div>
  );
};

const mapStateToProps = ({ videos }) => {
  const [currentVideo, ...nextVideos] = videos;
  return {
    currentVideo,
    nextVideos
  };
};

export default connect(
  mapStateToProps,
  { addVideoToPlaylist }
)(App);
