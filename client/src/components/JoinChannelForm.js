import React, { useState } from "react";
import { connect } from "react-redux";
import { Form, Header } from "semantic-ui-react";
import history from "../history";
import { check } from "../api/vidj";
import { setNotificationMessage } from "../actions";

const JoinChannelForm = ({ setNotificationMessage }) => {
  const [channelId, setChannelId] = useState("");

  const handleChange = (_e, { value }) => setChannelId(value.trim());
  const handleSubmit = async () => {
    const channelExists = await check(channelId);
    if (channelExists) {
      history.push(`/${channelId}`);
    } else {
      setNotificationMessage(
        `Channel ${channelId} does not exist!`,
        "Invalid Channel ID",
        "warning"
      );
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Header>Enter Channel ID</Header>
      <Form.Input
        required
        inline
        placeholder="Channel ID"
        name="channelId"
        value={channelId}
        onChange={handleChange}
        action={{ content: "Join", icon: "sign-in", color: "blue" }}
      />
    </Form>
  );
};

export default connect(
  null,
  { setNotificationMessage }
)(JoinChannelForm);
