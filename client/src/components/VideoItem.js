import React from "react";
import { Item, Progress, Segment, Button } from "semantic-ui-react";

const VideoItem = ({ video, videoStatus }) => {
  const { videoId, title, thumbnail } = video;
  const { playing, total, progress } = videoStatus;

  return (
    <Segment>
      <Item.Group unstackable style={{ marginBottom: 0 }}>
        <Item>
          <Item.Image size="small" src={thumbnail} />
          <Item.Content verticalAlign="middle">
            <Item.Header>{title}</Item.Header>
            <Item.Meta>{playing ? "Playing" : "Paused"}</Item.Meta>
            <Item.Extra style={{ marginTop: "1rem" }}>
              <a
                href={`https://www.youtube.com/watch?v=${videoId}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  content="Watch"
                  icon="youtube"
                  labelPosition="left"
                  color="youtube"
                />
              </a>
            </Item.Extra>
          </Item.Content>
        </Item>
      </Item.Group>
      <Progress
        total={total}
        value={progress}
        attached="bottom"
        color={playing ? "teal" : "grey"}
      />
    </Segment>
  );
};

export default VideoItem;
