import React, { useState } from "react";
import { Form, Header } from "semantic-ui-react";
import history from "../history";
import { create } from "../api/vidj";

const CreateChannelForm = () => {
  const [title, setTitle] = useState("");

  const handleChange = (_e, { value }) => setTitle(value);

  const handleSubmit = async () => {
    const newChannel = await create({ title: title.trim() });
    history.push(`/${newChannel.id}`);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Header>Create new Channel</Header>
      <Form.Input
        required
        inline
        maxLength="64"
        placeholder="Channel title"
        name="title"
        value={title}
        onChange={handleChange}
        action={{
          color: "green",
          icon: "plus",
          content: "Create"
        }}
      />
    </Form>
  );
};

export default CreateChannelForm;
