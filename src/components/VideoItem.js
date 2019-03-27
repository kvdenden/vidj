import React from "react";
import { Item } from "semantic-ui-react";

const VideoItem = ({ video }) => {
  const { title, thumbnail } = video;

  return (
    <Item.Group>
      <Item>
        <Item.Image size="small" src={thumbnail} />
        <Item.Content verticalAlign="middle">
          <Item.Header>{title}</Item.Header>
        </Item.Content>
      </Item>
    </Item.Group>
  );
};

export default VideoItem;
