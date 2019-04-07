import React from "react";
import { Card } from "semantic-ui-react";

import Playlist from "./Playlist";
import SortablePlaylist from "./SortablePlaylist";

const NextVideos = props => {
  const {
    channel: {
      owner,
      playlist: [, ...nextVideos]
    },
    changeVideoPosition,
    removeVideoFromPlaylist,
    upvoteVideo,
    downvoteVideo
  } = props;

  if (nextVideos.length < 1) {
    return null;
  }

  const upvoteAction = active => {
    if (active) {
      return {
        icon: "thumbs up",
        color: "green",
        action: () => {}
      };
    } else {
      return {
        icon: "thumbs up outline",
        action: (_video, index) => upvoteVideo(index + 1)
      };
    }
  };

  const downvoteAction = active => {
    if (active) {
      return {
        icon: "thumbs down",
        color: "red",
        action: () => {}
      };
    } else {
      return {
        icon: "thumbs down outline",
        action: (_video, index) => downvoteVideo(index + 1)
      };
    }
  };

  const removeAction = {
    icon: "remove",
    color: "red",
    basic: true,
    action: (_video, index) => removeVideoFromPlaylist(index + 1)
  };

  const itemActions = video => {
    const { vote } = video;
    const userActions = [upvoteAction(vote === 1), downvoteAction(vote === -1)];
    const adminActions = [removeAction];
    return owner ? [...userActions, ...adminActions] : userActions;
  };

  const playlist = owner ? (
    <SortablePlaylist
      videos={nextVideos}
      onChangePosition={(oldIndex, newIndex) => {
        if (oldIndex !== newIndex) {
          changeVideoPosition(oldIndex + 1, newIndex + 1);
        }
      }}
      itemActions={itemActions}
    />
  ) : (
    <Playlist videos={nextVideos} itemActions={itemActions} />
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

export default NextVideos;
