import React, { useEffect } from "react";
import { Router, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import "./App.css";

import history from "../history";
import { fetchAuthToken } from "../actions";
import ShowChannelPage from "./pages/ShowChannelPage";
import SelectChannelPage from "./pages/SelectChannelPage";

const App = ({ fetchAuthToken }) => {
  useEffect(() => {
    fetchAuthToken();
  }, []);

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

export default connect(
  null,
  { fetchAuthToken }
)(App);
