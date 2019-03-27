import React, { useRef } from "react";
import { List, Header } from "semantic-ui-react";
import { SortableContainer, SortableElement } from "react-sortable-hoc";

import Playlist, { PlaylistItem } from "./Playlist";

import "./Playlist.css";

const SortablePlaylistItem = SortableElement(props => (
  <PlaylistItem {...props} />
));

const SortablePlaylistItems = SortableContainer(({ videos }) => (
  <List divided size="large" verticalAlign="middle">
    {videos.map((video, index) => (
      <SortablePlaylistItem
        index={index}
        key={`${video.videoId}-${index}`}
        {...video}
      />
    ))}
  </List>
));

const SortablePlaylist = ({ videos, onChangePosition }) => {
  const helperRef = useRef();

  if (videos.length < 1) {
    return null;
  }

  return (
    <div className="playlist">
      <SortablePlaylistItems
        videos={videos}
        helperContainer={() => helperRef.current}
        onSortEnd={({ oldIndex, newIndex }) =>
          onChangePosition(oldIndex, newIndex)
        }
        useWindowAsScrollContainer
      />
      <div ref={helperRef} className="ui large celled middle aligned list" />
    </div>
  );
};

SortablePlaylist.defaultProps = {
  ...Playlist.defaultProps,
  onChangePosition: () => {}
};

export default SortablePlaylist;
