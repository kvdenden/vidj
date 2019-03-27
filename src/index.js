import React from "react";
import ReactDOM from "react-dom";
import queryString from "query-string";
import { Provider } from "react-redux";

import store from "./store";
import { setChannelMaster } from "./actions";

import "./index.css";
import App from "./components/App";
import * as serviceWorker from "./serviceWorker";

const isMaster = queryString.parse(document.location.search).master === "true";
store.dispatch(setChannelMaster(isMaster));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
