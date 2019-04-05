import React, { useEffect } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Divider } from "semantic-ui-react";
import _ from "lodash";

import {
  subscribeToChannel,
  unsubscribeFromChannel,
  fetchChannel,
  playNextVideo,
  addVideoToPlaylist,
  changeVideoPosition,
  removeVideoFromPlaylist,
  upvoteVideo,
  downvoteVideo
} from "../actions";

import CurrentVideo from "./CurrentVideo";
import NextVideos from "./NextVideos";
import VideoSearch from "./VideoSearch";

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
      removeVideoFromPlaylist,
      upvoteVideo,
      downvoteVideo
    },
    action => _.partial(action, channelId)
  );
  return bindActionCreators(channelActions, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Channel);
