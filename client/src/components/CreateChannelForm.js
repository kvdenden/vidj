import React from "react";
import { Form } from "semantic-ui-react";
import history from "../history";
import { create } from "../api/vidj";

const CreateChannelForm = () => {
  const handleSubmit = async () => {
    const newChannel = await create();
    history.push(`/${newChannel.id}`);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Button
        color="green"
        icon="plus"
        content="Create new channel"
        labelPosition="left"
      />
    </Form>
  );
};

export default CreateChannelForm;
