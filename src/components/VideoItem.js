import React from "react";
import { Item } from "semantic-ui-react";

const VideoItem = ({ video }) => {
  const { title, description, thumbnail } = video;
  return (
    <Item.Group>
      <Item>
        <Item.Image size="small" src={thumbnail} />

        <Item.Content>
          <Item.Header>{title}</Item.Header>
          <Item.Description>{description}</Item.Description>
        </Item.Content>
      </Item>
    </Item.Group>
  );
};

export default VideoItem;
