import React from "react";
import { List, Image } from "semantic-ui-react";

import "./Playlist.css";

export const PlaylistItem = ({ title, thumbnail }) => {
  return (
    <List.Item>
      <Image avatar src={thumbnail} />
      <List.Content style={{ maxWidth: "calc(100% - 2em)" }}>
        <List.Header>{title}</List.Header>
      </List.Content>
    </List.Item>
  );
};

const PlaylistItems = ({ videos }) => (
  <List divided size="large" verticalAlign="middle">
    {videos.map((video, index) => (
      <PlaylistItem
        index={index}
        key={`${video.videoId}-${index}`}
        {...video}
      />
    ))}
  </List>
);

const Playlist = ({ videos }) => {
  if (videos.length < 1) {
    return null;
  }

  return (
    <div className="playlist">
      <PlaylistItems videos={videos} />
    </div>
  );
};

Playlist.defaultProps = {
  videos: []
};

export default Playlist;
