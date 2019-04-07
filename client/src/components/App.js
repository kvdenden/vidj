import React, { useEffect } from "react";
import { Router, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import "./App.css";

import history from "../history";
import { fetchAuthToken, socketAuth } from "../actions";
import Notification from "./Notification";
import ShowChannelPage from "./pages/ShowChannelPage";
import SelectChannelPage from "./pages/SelectChannelPage";
import { Dimmer, Loader } from "semantic-ui-react";
import PageNotFound from "./pages/PageNotFound";

const App = ({ authToken, fetchAuthToken, socket, socketAuth }) => {
  useEffect(() => {
    if (!authToken) {
      fetchAuthToken();
    }
  }, []);

  useEffect(() => {
    if (socket.connected && authToken) {
      socketAuth(authToken);
    }
  }, [socket.connected, authToken]);

  if (!authToken) {
    return (
      <Dimmer active>
        <Loader content="Loading" />
      </Dimmer>
    );
  }

  return (
    <div className="ui container" style={{ marginTop: "1em" }}>
      <Notification />
      <Router history={history}>
        <Switch>
          <Route path="/" exact component={SelectChannelPage} />
          <Route path="/:channelId" exact component={ShowChannelPage} />
          <Route component={PageNotFound} />
        </Switch>
      </Router>
    </div>
  );
};

const mapStateToProps = ({ auth, socket }) => {
  return {
    authToken: auth.token,
    socket
  };
};

export default connect(
  mapStateToProps,
  { fetchAuthToken, socketAuth }
)(App);
