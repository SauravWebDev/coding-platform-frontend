import React, { useState } from "react";
import LogIn from "./LoginPage";
import { login } from "../../redux/actions/loginAction";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";

import MuiAlert from "@material-ui/lab/Alert";

const ManageLoginPage = ({ isLoggedIn, loginAction, signupSuccess }) => {
  let [errors, setErrors] = useState({});
  let [emailID, setEmailID] = useState("");
  let [password, setPassword] = useState("");
  let [disable, setDisable] = useState(false);

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
  const handleChange = event => {
    const { name, value } = event.target;
    if (errors.signInError) delete errors.signInError;
    if (name == "email") {
      setEmailID(value.trim());
      if (!value) {
        setErrors({ ...errors, email: "Email is Required" });
      } else if (errors.email) {
        delete errors.email;
      }
    } else if (name === "password") {
      setPassword(value.trim());
      if (!value) {
        setErrors({ ...errors, password: "Password is Required" });
      } else if (errors.password) {
        delete errors.password;
      }
    }
  };
  const formIsValid = () => {
    if (!emailID) {
      setErrors({ email: "Email is Required" });
      return false;
    }
    if (!password) {
      setErrors({ password: "Password is Required" });
      return false;
    }
    return true;
  };
  const handleSave = () => {
    event.preventDefault();
    if (!formIsValid()) return;
    setDisable(true);
    loginAction(emailID, password).catch(errMsg => {
      setDisable(false);
      setErrors({ ...errors, signInError: errMsg });
    });
  };

  return (
    <>
      {signupSuccess && (
        <Alert severity="success">
          You have been successfully registered , please sign In!
        </Alert>
      )}
      {isLoggedIn && <Redirect to="/" />}
      <LogIn
        onSave={handleSave}
        onChange={handleChange}
        errors={errors}
        disable={disable}
      />
    </>
  );
};

ManageLoginPage.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  loginAction: PropTypes.func.isRequired,
  signupSuccess: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
  return {
    isLoggedIn: state.userData.isAuthenticated,
    signupSuccess: state.signupSuccess
  };
}

const mapDispatchToProps = {
  loginAction: login
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageLoginPage);
