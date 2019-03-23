import React from "react";
import { List, Image, Header } from "semantic-ui-react";

const PlaylistItem = ({ title, thumbnail }) => {
  return (
    <List.Item>
      <Image avatar src={thumbnail} />
      <List.Content style={{ maxWidth: "calc(100% - 2em)" }}>
        <List.Header>{title}</List.Header>
      </List.Content>
    </List.Item>
  );
};

const Playlist = ({ title, videos }) => {
  if (videos.length < 1) {
    return null;
  }

  const items = videos.map(video => (
    <PlaylistItem key={video.videoId} {...video} />
  ));
  return (
    <div>
      <Header as="h2">{title}</Header>
      <List divided size="large" verticalAlign="middle">
        {items}
      </List>
    </div>
  );
};

Playlist.defaultProps = {
  title: "Up next",
  videos: []
};

export default Playlist;
