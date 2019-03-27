import React, { useEffect } from "react";
import { connect } from "react-redux";
import "./App.css";

import VideoPlayer from "./VideoPlayer";
import VideoSearch from "./VideoSearch";
import Playlist from "./Playlist";
import SortablePlaylist from "./SortablePlaylist";
import {
  fetchAuthToken,
  fetchPlaylist,
  playNextVideo,
  addVideoToPlaylist,
  changeVideoPosition
} from "../actions";
import { Divider, Card } from "semantic-ui-react";
import VideoItem from "./VideoItem";

const renderCurrentVideo = (video, master) => {
  if (!video) {
    return null;
  }

  if (master) {
    return <VideoPlayer video={video} />;
  } else {
    return <VideoItem video={video} />;
  }
};

const renderPlaylist = (videos, master, changeVideoPosition) => {
  if (videos.length < 1) {
    return null;
  }

  const playlist = master ? (
    <SortablePlaylist
      videos={videos}
      onChangePosition={(oldIndex, newIndex) =>
        changeVideoPosition(oldIndex + 1, newIndex + 1)
      }
    />
  ) : (
    <Playlist videos={videos} />
  );

  return (
    <Card fluid>
      <Card.Content>
        <Card.Header>Up next</Card.Header>
      </Card.Content>
      <Card.Content>{playlist}</Card.Content>
    </Card>
  );
};

const App = ({
  master,
  videos,
  fetchAuthToken,
  fetchPlaylist,
  addVideoToPlaylist,
  changeVideoPosition
}) => {
  useEffect(() => {
    fetchAuthToken();
  }, []);

  useEffect(() => {
    fetchPlaylist();
  }, []);

  const [currentVideo, ...nextVideos] = videos;

  return (
    <div className="ui container" style={{ marginTop: "2em" }}>
      {renderCurrentVideo(currentVideo, master)}
      <Divider />
      <VideoSearch onVideoSelect={addVideoToPlaylist} />
      {renderPlaylist(nextVideos, master, changeVideoPosition)}
    </div>
  );
};

const mapStateToProps = ({ channel, playlist }) => {
  return { master: channel.master, videos: playlist.videos };
};

export default connect(
  mapStateToProps,
  {
    fetchAuthToken,
    fetchPlaylist,
    playNextVideo,
    addVideoToPlaylist,
    changeVideoPosition
  }
)(App);
