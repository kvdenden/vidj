import React, { useEffect } from "react";
import { connect } from "react-redux";
import "./App.css";

import VideoPlayer from "./VideoPlayer";
import VideoSearch from "./VideoSearch";
import Playlist from "./Playlist";
import {
  addVideoToPlaylist,
  fetchPlaylist,
  changeVideoPosition
} from "../actions";
import { Divider, Segment } from "semantic-ui-react";

const channelId = "27I9jKM2x";

const App = ({
  videos,
  fetchPlaylist,
  addVideoToPlaylist,
  changeVideoPosition
}) => {
  useEffect(() => {
    fetchPlaylist(channelId);
  }, []);

  const [currentVideo, ...nextVideos] = videos;
  return (
    <div className="ui container">
      <VideoPlayer {...currentVideo} />
      <Divider />
      <VideoSearch onVideoSelect={addVideoToPlaylist} />
      <Segment>
        <Playlist
          videos={nextVideos}
          onChangePosition={(oldIndex, newIndex) =>
            changeVideoPosition(oldIndex + 1, newIndex + 1)
          }
        />
      </Segment>
    </div>
  );
};

const mapStateToProps = ({ playlist }) => {
  return { videos: playlist.videos };
};

export default connect(
  mapStateToProps,
  { fetchPlaylist, addVideoToPlaylist, changeVideoPosition }
)(App);
