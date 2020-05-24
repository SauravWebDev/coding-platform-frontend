import React from "react";
import { render } from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./components/App";
import configureStore from "./redux/configureStore";
import { Provider as ReduxProvider } from "react-redux";
import { setCurrentUser } from "./redux/actions/loginAction";
import Cookies from "js-cookie";

import "./assets/scss/material-kit-react.scss";

const store = configureStore();

if (Cookies.get("ac-token")) {
  store.dispatch(setCurrentUser(Cookies.get("ac-token")));
}

render(
  <ReduxProvider store={store}>
    <Router>
      <App />
    </Router>
  </ReduxProvider>,
  document.getElementById("app")
);
