import React from "react";
import { Route, Switch } from "react-router-dom";
import HomePage from "./home/HomePage";
import Header from "./common/Header";
import StickyFooter from "./common/Footer";
import PageNotFound from "./PageNotFound";
import ProblemsPage from "./problems/ProblemsPage";
import ManageLoginPage from "./login/ManageLoginPage";
import ManageSignupPage from "./signup/ManageSignupPage";
import ManageProblem from "./problems/ManageProblem";
import codePage from "./code/codePage";
import { ToastContainer } from "react-toastify";
import Test from "./test/TestPage";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="container-fluid">
      <Header />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/login" component={ManageLoginPage} />
        <Route path="/signup" component={ManageSignupPage} />
        <Route path="/problems" component={ProblemsPage} />
        <Route path="/problem/createUpdate/:slug" component={ManageProblem} />
        <Route path="/problem/createUpdate" component={ManageProblem} />
        <Route path="/problem/:slug" component={codePage} />
        <Route path="/test" component={Test} />
        <Route component={PageNotFound} />
      </Switch>
      <StickyFooter />
      <ToastContainer autoClose={3000} hideProgressBar />
    </div>
  );
}

export default App;
