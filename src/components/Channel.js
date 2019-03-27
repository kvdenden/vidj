import React, { useEffect } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Divider, Card } from "semantic-ui-react";
import _ from "lodash";

import VideoPlayer from "./VideoPlayer";
import VideoSearch from "./VideoSearch";
import Playlist from "./Playlist";
import SortablePlaylist from "./SortablePlaylist";
import {
  fetchPlaylist,
  playNextVideo,
  addVideoToPlaylist,
  changeVideoPosition
} from "../actions";
import VideoItem from "./VideoItem";

const CurrentVideo = props => {
  const {
    videos: [currentVideo],
    master,
    playNextVideo
  } = props;

  if (!currentVideo) {
    return null;
  }

  if (master) {
    return (
      <VideoPlayer
        video={currentVideo}
        onEnded={playNextVideo}
        onError={playNextVideo}
      />
    );
  } else {
    return <VideoItem video={currentVideo} />;
  }
};

const NextVideos = props => {
  const {
    videos: [, ...nextVideos],
    master,
    changeVideoPosition
  } = props;

  if (nextVideos.length < 1) {
    return null;
  }

  const playlist = master ? (
    <SortablePlaylist
      videos={nextVideos}
      onChangePosition={(oldIndex, newIndex) =>
        changeVideoPosition(oldIndex + 1, newIndex + 1)
      }
    />
  ) : (
    <Playlist videos={nextVideos} />
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

const Channel = props => {
  const { channelId, fetchPlaylist, addVideoToPlaylist } = props;

  useEffect(() => {
    fetchPlaylist();
  }, [channelId]);

  return (
    <div style={{ marginTop: "2em" }}>
      <CurrentVideo {...props} />
      <Divider />
      <VideoSearch onVideoSelect={addVideoToPlaylist} />
      <NextVideos {...props} />
    </div>
  );
};

const mapStateToProps = ({ channel, playlist }) => {
  return { master: channel.master, videos: playlist.videos };
};

const mapDispatchToProps = (dispatch, { channelId }) => {
  const channelActions = _.mapValues(
    { fetchPlaylist, playNextVideo, addVideoToPlaylist, changeVideoPosition },
    action => _.partial(action, channelId)
  );
  return bindActionCreators(channelActions, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Channel);
