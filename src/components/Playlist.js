import React from "react";
import { List, Image } from "semantic-ui-react";

const PlaylistItem = ({ title, description, thumbnail }) => {
  return (
    <List.Item>
      <Image avatar src={thumbnail} />
      <List.Content>
        <List.Header>{title}</List.Header>
        <List.Description>{description}</List.Description>
      </List.Content>
    </List.Item>
  );
};

const Playlist = ({ videos }) => {
  const items = videos.map(video => (
    <PlaylistItem key={video.videoId} {...video} />
  ));
  return <List divided>{items}</List>;
};

export default Playlist;
