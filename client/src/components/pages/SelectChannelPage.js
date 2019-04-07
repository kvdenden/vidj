import React, { useEffect } from "react";
import { Segment, Divider, Header } from "semantic-ui-react";
import JoinChannelForm from "../JoinChannelForm";
import CreateChannelForm from "../CreateChannelForm";

const SelectChannelPage = () => {
  useEffect(() => {
    document.title = "VIDJ - Select your Channel";
  }, []);

  return (
    <div style={{ textAlign: "center" }}>
      <Header as="h1">
        <Header.Content>
          VIDJ
          <Header.Subheader>
            Real-time collaborative video playlist
          </Header.Subheader>
        </Header.Content>
      </Header>
      <Segment>
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
