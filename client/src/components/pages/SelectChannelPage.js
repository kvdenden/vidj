import React, { useEffect } from "react";
import { Segment, Divider, Header } from "semantic-ui-react";
import JoinChannelForm from "../JoinChannelForm";
import CreateChannelForm from "../CreateChannelForm";
import MyChannels from "../MyChannels";

const SelectChannelPage = () => {
  useEffect(() => {
    document.title = "VIDJ - Select your Channel";
  }, []);

  return (
    <div>
      <Header as="h1" style={{ textAlign: "center" }}>
        <Header.Content>
          VIDJ
          <Header.Subheader>
            Real-time collaborative video playlist
          </Header.Subheader>
        </Header.Content>
      </Header>
      <MyChannels />
      <Segment style={{ textAlign: "center" }}>
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
