import React, { useRef } from "react";
import { List, Image, Header } from "semantic-ui-react";
import { SortableContainer, SortableElement } from "react-sortable-hoc";

import "./Playlist.css";

const PlaylistItem = SortableElement(({ title, thumbnail }) => {
  return (
    <List.Item>
      <Image avatar src={thumbnail} />
      <List.Content style={{ maxWidth: "calc(100% - 2em)" }}>
        <List.Header>{title}</List.Header>
      </List.Content>
    </List.Item>
  );
});

const PlaylistItems = SortableContainer(({ videos }) => (
  <List divided size="large" verticalAlign="middle">
    {videos.map((video, index) => (
      <PlaylistItem index={index} key={video.videoId} {...video} />
    ))}
  </List>
));

const Playlist = ({ title, videos, onChangePosition }) => {
  const helperRef = useRef();

  if (videos.length < 1) {
    return null;
  }

  return (
    <div className="playlist">
      <Header as="h2">{title}</Header>
      <PlaylistItems
        videos={videos}
        helperContainer={() => helperRef.current}
        onSortEnd={({ oldIndex, newIndex }) => {
          console.log(`move song ${oldIndex} to ${newIndex}`);
          onChangePosition(oldIndex, newIndex);
        }}
      />
      <div ref={helperRef} className="ui large celled middle aligned list" />
    </div>
  );
};

Playlist.defaultProps = {
  title: "Up next",
  videos: [],
  onChangePosition: () => {}
};

export default Playlist;
