import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Segment, List, Header, Button } from "semantic-ui-react";

import { fetchMyChannels, deleteChannel } from "../actions";

const pluralize = (count, singular, plural) => {
  let word = singular;
  if (count !== 1) {
    word = plural || singular + "s";
  }
  return `${count} ${word}`;
};

const ChannelItem = ({ id, title, playlist, onDelete }) => {
  const channelTitle = (title && title.trim()) || `Channel ${id}`;
  return (
    <List.Item style={{ display: "flex", alignItems: "center" }}>
      <List.Content style={{ flexGrow: 1 }}>
        <List.Header>
          <Link to={`/${id}`}>{channelTitle}</Link>
        </List.Header>
        <List.Description>
          {pluralize(playlist.length, "video")}
        </List.Description>
      </List.Content>
      <List.Content style={{ marginLeft: "10px" }}>
        <Button icon="remove" color="red" onClick={onDelete} />
      </List.Content>
    </List.Item>
  );
};

const MyChannels = ({ channels, fetchMyChannels, deleteChannel }) => {
  useEffect(() => {
    fetchMyChannels();
  }, []);

  if (channels.length < 1) {
    return null;
  }

  return (
    <Segment>
      <Header>Your Channels</Header>
      <List divided>
        {channels.map(channel => (
          <ChannelItem
            key={channel.id}
            {...channel}
            onDelete={() => deleteChannel(channel.id)}
          />
        ))}
      </List>
    </Segment>
  );
};

const mapStateToProps = ({ myChannels }) => {
  return { channels: myChannels };
};

export default connect(
  mapStateToProps,
  { fetchMyChannels, deleteChannel }
)(MyChannels);
