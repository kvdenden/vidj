import React from "react";
import { Segment, Divider } from "semantic-ui-react";
import JoinChannelForm from "../JoinChannelForm";
import CreateChannelForm from "../CreateChannelForm";

const SelectChannelPage = () => {
  return (
    <Segment textAlign="center">
      <JoinChannelForm />
      <Divider horizontal section>
        Or
      </Divider>
      <CreateChannelForm />
    </Segment>
  );
};

export default SelectChannelPage;
