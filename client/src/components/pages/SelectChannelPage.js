import React from "react";
import { Segment, Divider, Header, Icon } from "semantic-ui-react";
import JoinChannelForm from "../JoinChannelForm";
import CreateChannelForm from "../CreateChannelForm";

const SelectChannelPage = () => {
  return (
    <div>
      <Header as="h1">
        <Header.Content>
          VIDJ
          <Header.Subheader>
            Real-time collaborative video playlist
          </Header.Subheader>
        </Header.Content>
      </Header>
      <Segment textAlign="center">
        <JoinChannelForm />
        <Divider horizontal section>
          Or
        </Divider>
        <CreateChannelForm />
      </Segment>
    </div>
  );
};

export default SelectChannelPage;
