import React, { useEffect } from "react";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import "./App.css";

import history from "../history";
import { fetchAuthToken } from "../actions";
import ShowChannelPage from "./pages/ShowChannelPage";

const App = ({ fetchAuthToken }) => {
  useEffect(() => {
    fetchAuthToken();
  }, []);

  return (
    <div className="ui container">
      <Router history={history}>
        <Switch>
          <Route
            path="/"
            exact
            render={() => <Redirect to="/channels/OUD0pdXvH" />}
          />
          <Route path="/channels/:channelId" component={ShowChannelPage} />
        </Switch>
      </Router>
    </div>
  );
};

export default connect(
  null,
  { fetchAuthToken }
)(App);
