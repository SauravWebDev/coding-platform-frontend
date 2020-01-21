import React from "react";
import { render } from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./components/App";
import configureStore from "./redux/configureStore";
import { Provider as ReduxProvider } from "react-redux";
import { setCurrentUser } from "./redux/actions/loginAction";

const store = configureStore();

if (localStorage.token) {
  store.dispatch(setCurrentUser(localStorage.token));
}

render(
  <ReduxProvider store={store}>
    <Router>
      <App />
    </Router>
  </ReduxProvider>,
  document.getElementById("app")
);
