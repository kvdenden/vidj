import React from "react";
import { List, Image, Button, Label } from "semantic-ui-react";

import "./Playlist.css";

const PlaylistItemAction = ({ action, ...buttonProps }) => {
  return <Button onClick={action} {...buttonProps} />;
};

const PlaylistItemActions = ({ video, videoIndex, actions }) => {
  const buttons = actions.map((action, index) => {
    const actionProps = {
      ...action,
      action: () => action.action(video, videoIndex)
    };
    return <PlaylistItemAction key={index} {...actionProps} />;
  });
  return <Button.Group>{buttons}</Button.Group>;
};

const ScoreLabel = ({ score }) => {
  let color;
  if (score > 0) {
    color = "green";
  } else if (score < 0) {
    color = "red";
  }
  return <Label color={color}>{score > 0 ? `+${score}` : score}</Label>;
};

export const PlaylistItem = ({ index, video, itemActions }) => {
  const { title, thumbnail, score } = video;
  return (
    <List.Item style={{ display: "flex", alignItems: "center" }}>
      <Image avatar src={thumbnail} />
      <List.Content style={{ flexGrow: 1 }}>
        <List.Header style={{ display: "flex", alignItems: "center" }}>
          <span style={{ marginRight: "10px" }}>{title}</span>
          <span style={{ marginLeft: "auto" }}>
            <ScoreLabel score={score} />
          </span>
        </List.Header>
      </List.Content>
      <List.Content style={{ marginLeft: "10px" }}>
        <PlaylistItemActions
          video={video}
          videoIndex={index}
          actions={itemActions(video)}
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
  itemActions: () => []
};

export default Playlist;
