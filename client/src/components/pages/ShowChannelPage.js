import React, { useEffect } from "react";
import { connect } from "react-redux";
import Channel from "../Channel";

const ShowChannelPage = ({ pageTitle, match }) => {
  useEffect(() => {
    document.title = pageTitle;
  }, [pageTitle]);

  const { channelId } = match.params;
  return <Channel channelId={channelId} />;
};

const mapStateToProps = ({ channel }) => {
  return {
    pageTitle: `VIDJ - ${channel.title || channel.id || "Loading..."}`
  };
};

export default connect(mapStateToProps)(ShowChannelPage);
