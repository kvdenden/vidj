import React from "react";
import { connect } from "react-redux";
import { Message } from "semantic-ui-react";

import { clearNotificationMessage } from "../actions";

const Notification = ({ notification, clearNotificationMessage }) => {
  if (!notification) {
    return null;
  }

  const { title, message, style } = notification;

  const messageStyle = style ? { [style]: true } : {};
  return (
    <Message
      {...messageStyle}
      style={{ marginTop: "1em", marginBottom: "1em" }}
      onDismiss={clearNotificationMessage}
    >
      <Message.Header>{title}</Message.Header>
      <p>{message}</p>
    </Message>
  );
};

const mapStateToProps = ({ notification }) => {
  return { notification };
};

export default connect(
  mapStateToProps,
  { clearNotificationMessage }
)(Notification);
