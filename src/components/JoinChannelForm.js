import React, { useState } from "react";
import { Form, Header } from "semantic-ui-react";
import history from "../history";
import { check } from "../api/vidj";

const JoinChannelForm = () => {
  const [channelId, setChannelId] = useState("");

  const handleChange = (e, { value }) => setChannelId(value);
  const handleSubmit = async () => {
    const channelExists = await check(channelId);
    if (channelExists) {
      history.push(`/channels/${channelId}`);
    } else {
      console.log(`channel ${channelId} does not exist!`);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Header>Enter Channel ID</Header>
      <Form.Input
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

export default JoinChannelForm;
