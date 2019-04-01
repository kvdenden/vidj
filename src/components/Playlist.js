import React from "react";
import { List, Image, Button } from "semantic-ui-react";

import "./Playlist.css";

const PlaylistAction = ({ title, action, ...buttonProps }) => {
  return (
    <Button onClick={action} {...buttonProps}>
      {title}
    </Button>
  );
};

const PlaylistActions = ({ video, videoIndex, actions }) => {
  const buttons = actions.map((action, index) => {
    const actionProps = {
      ...action,
      action: () => action.action(video, videoIndex)
    };
    return <PlaylistAction key={index} {...actionProps} />;
  });
  return <Button.Group>{buttons}</Button.Group>;
};

export const PlaylistItem = ({ index, video, itemActions }) => {
  const { title, thumbnail } = video;
  return (
    <List.Item style={{ display: "flex", alignItems: "center" }}>
      <Image avatar src={thumbnail} />
      <List.Content style={{ flexGrow: 1 }}>
        <List.Header>{title}</List.Header>
      </List.Content>
      <List.Content>
        <PlaylistActions
          video={video}
          videoIndex={index}
          actions={itemActions}
        />
      </List.Content>
    </List.Item>
  );
};

const PlaylistItems = ({ videos, itemActions }) => (
  <List divided size="large" verticalAlign="middle">
    {videos.map((video, index) => (
      <PlaylistItem
        index={index}
        key={`${video.videoId}-${index}`}
        video={video}
        itemActions={itemActions}
      />
    ))}
  </List>
);

const Playlist = ({ videos, itemActions }) => {
  if (videos.length < 1) {
    return null;
  }

  return (
    <div className="playlist">
      <PlaylistItems videos={videos} itemActions={itemActions} />
    </div>
  );
};

Playlist.defaultProps = {
  videos: [],
  itemActions: []
};

export default Playlist;
