import React from "react";
import { Route, Switch } from "react-router-dom";
import HomePage from "./home/HomePage";
import Header from "./common/Header/Header";
import Footer from "./common/Footer";
import PageNotFound from "./PageNotFound";
import ProblemsPage from "./problems/ProblemsPage";
import ManageLoginPage from "./login/ManageLoginPage";
import ManageSignupPage from "./signup/ManageSignupPage";
import ManageProblem from "./problems/ManageForm";
import codePage from "./code/codePage";
import { ToastContainer } from "react-toastify";
import Test from "./test/TestPage";
import "../css/main.scss";

import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="">
      <Header />
      <div className="content">
        <Switch>
          <Route exact path="/" component={ProblemsPage} />
          <Route path="/login" component={ManageLoginPage} />
          <Route path="/signup" component={ManageSignupPage} />
          <Route path="/problems" component={ProblemsPage} />
          <Route path="/problem/createUpdate/:slug" component={ManageProblem} />
          <Route path="/problem/createUpdate" component={ManageProblem} />
          <Route path="/problem/setupCode/:slug" component={codePage} />
          <Route path="/test" component={Test} />
          <Route component={PageNotFound} />
        </Switch>
      </div>
      <Footer />
      <ToastContainer autoClose={3000} hideProgressBar />
    </div>
  );
}

export default App;
