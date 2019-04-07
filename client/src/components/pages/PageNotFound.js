import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import { setNotificationMessage } from "../../actions";

const PageNotFound = ({ setNotificationMessage }) => {
  useEffect(() => {
    setNotificationMessage(
      "The page you tried to access does not exist.",
      "Page not found",
      "error"
    );
  }, []);

  return <Redirect to="/" />;
};

export default connect(
  null,
  { setNotificationMessage }
)(PageNotFound);
