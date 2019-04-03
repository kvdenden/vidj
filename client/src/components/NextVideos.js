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

export default NextVideos;
