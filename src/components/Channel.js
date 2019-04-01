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
  subscribeToChannel,
  unsubscribeFromChannel,
  fetchChannel,
  playNextVideo,
  addVideoToPlaylist,
  changeVideoPosition,
  removeVideoFromPlaylist
} from "../actions";
import VideoItem from "./VideoItem";

const CurrentVideo = props => {
  const {
    channel: {
      master,
      playlist: [currentVideo]
    },
    playNextVideo
  } = props;

  if (master) {
    return (
      <VideoPlayer
        video={currentVideo}
        onEnded={playNextVideo}
        onError={playNextVideo}
      />
    );
  } else if (currentVideo) {
    return (
      <Card fluid>
        <Card.Content>
          <Card.Header>Currently playing</Card.Header>
        </Card.Content>
        <Card.Content>
          <VideoItem video={currentVideo} />
        </Card.Content>
      </Card>
    );
  } else {
    return null;
  }
};

const NextVideos = props => {
  const {
    channel: {
      owner,
      playlist: [, ...nextVideos]
    },
    changeVideoPosition,
    removeVideoFromPlaylist
  } = props;

  if (nextVideos.length < 1) {
    return null;
  }

  const adminActions = [
    {
      title: "Remove",
      color: "red",
      basic: true,
      action: (_video, index) => removeVideoFromPlaylist(index + 1)
    }
  ];

  const playlist = owner ? (
    <SortablePlaylist
      videos={nextVideos}
      onChangePosition={(oldIndex, newIndex) =>
        changeVideoPosition(oldIndex + 1, newIndex + 1)
      }
      itemActions={adminActions}
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
  const {
    channelId,
    fetchChannel,
    addVideoToPlaylist,
    socketReady,
    subscribeToChannel,
    unsubscribeFromChannel
  } = props;

  useEffect(() => {
    fetchChannel();
  }, [channelId]);

  useEffect(() => {
    if (socketReady) {
      subscribeToChannel();

      return unsubscribeFromChannel;
    }
  }, [channelId, socketReady]);

  return (
    <div style={{ marginTop: "2em" }}>
      <CurrentVideo {...props} />
      <Divider />
      <VideoSearch onVideoSelect={addVideoToPlaylist} />
      <NextVideos {...props} />
    </div>
  );
};

const mapStateToProps = ({ channel, socket }) => {
  return {
    channel,
    socketReady: socket.authenticated
  };
};

const mapDispatchToProps = (dispatch, { channelId }) => {
  const channelActions = _.mapValues(
    {
      subscribeToChannel,
      unsubscribeFromChannel,
      fetchChannel,
      playNextVideo,
      addVideoToPlaylist,
      changeVideoPosition,
      removeVideoFromPlaylist
    },
    action => _.partial(action, channelId)
  );
  return bindActionCreators(channelActions, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Channel);
