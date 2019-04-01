import React from "react";
import Channel from "../Channel";

const ShowChannelPage = ({ match }) => {
  const { channelId } = match.params;
  return <Channel channelId={channelId} />;
};

export default ShowChannelPage;
