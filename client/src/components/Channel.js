import React, { useEffect } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Divider } from "semantic-ui-react";
import _ from "lodash";
import history from "../history";

import { check } from "../api/vidj";

import {
  subscribeToChannel,
  unsubscribeFromChannel,
  fetchChannel,
  playNextVideo,
  addVideoToPlaylist,
  changeVideoPosition,
  removeVideoFromPlaylist,
  upvoteVideo,
  downvoteVideo,
  setNotificationMessage
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
    unsubscribeFromChannel,
    setNotificationMessage
  } = props;

  useEffect(() => {
    check(channelId).then(isValid => {
      if (isValid) {
        fetchChannel();
      } else {
        history.push(`/`);
        setNotificationMessage(
          `Channel ${channelId} does not exist!`,
          "Invalid Channel ID",
          "warning"
        );
      }
    });
  }, [channelId]);

  useEffect(() => {
    if (socketReady) {
      subscribeToChannel();

      return unsubscribeFromChannel;
    }
  }, [channelId, socketReady]);

  return (
    <div>
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
  const otherActions = { setNotificationMessage };

  return bindActionCreators(
    {
      ...channelActions,
      ...otherActions
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Channel);
