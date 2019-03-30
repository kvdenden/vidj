import React, { useEffect } from "react";
import { Router, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import "./App.css";

import history from "../history";
import { fetchAuthToken, socketAuth } from "../actions";
import ShowChannelPage from "./pages/ShowChannelPage";
import SelectChannelPage from "./pages/SelectChannelPage";
import { Dimmer, Loader } from "semantic-ui-react";

const App = ({ authToken, fetchAuthToken, socket, socketAuth }) => {
  useEffect(() => {
    if (!authToken) {
      fetchAuthToken();
    }
  }, []);

  useEffect(() => {
    console.log("socket effect", socket, authToken);
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
    <div className="ui container">
      <Router history={history}>
        <Switch>
          <Route path="/" exact component={SelectChannelPage} />
          <Route path="/channels/:channelId" component={ShowChannelPage} />
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
