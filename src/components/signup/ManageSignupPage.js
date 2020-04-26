import React, { useState } from "react";
import SignUp from "./SignupPage";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { signup } from "../../redux/actions/loginAction";

const ManageSignupPage = ({ isLoggedIn, signupSuccess, signupAction }) => {
  let [errors, setErrors] = useState({});
  let [emailID, setEmailID] = useState("");
  let [password, setPassword] = useState("");
  let [firstName, setFirstName] = useState("");
  let [lastName, setLastName] = useState("");
  let [disablSignupButton, setDisablSignupButton] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (errors.signupError) delete errors.signupError;
    if (name === "email") {
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
    } else if (name === "firstName") {
      setFirstName(value.trim());
      if (!value) {
        setErrors({ ...errors, firstName: "First Name is Required" });
      } else if (errors.firstName) {
        delete errors.firstName;
      }
    } else if (name === "lastName") {
      setLastName(value.trim());
      if (!value) {
        setErrors({ ...errors, lastName: "Last Name is Required" });
      } else if (errors.lastName) {
        delete errors.lastName;
      }
    }
  };
  const formIsValid = () => {
    if (!emailID) {
      setErrors({ ...errors, email: "Email is Required" });
      return false;
    }
    if (!password) {
      setErrors({ ...errors, password: "Password is Required" });
      return false;
    }
    if (!lastName) {
      setErrors({ ...errors, lastName: "Last Name is Required" });
      return false;
    }
    if (!firstName) {
      setErrors({ ...errors, firstName: "First Name is Required" });
      return false;
    }
    return true;
  };

  const handleSave = () => {
    event.preventDefault();
    if (!formIsValid()) return;
    setDisablSignupButton(true);
    signupAction(firstName, lastName, emailID, password).catch((err) => {
      setErrors({ ...errors, signupError: err });
      setDisablSignupButton(false);
    });
  };

  return (
    <>
      {isLoggedIn && <Redirect to="/" />}
      {signupSuccess && <Redirect to="/login" />}
      <SignUp
        onSave={handleSave}
        onChange={handleChange}
        errors={errors}
        disablSignupButton={disablSignupButton}
      />
    </>
  );
};

ManageSignupPage.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  signupSuccess: PropTypes.bool.isRequired,
  signupAction: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    isLoggedIn: state.userData && state.userData.isAuthenticated,
    signupSuccess: state.signupSuccess,
  };
}

const mapDispatchToProps = {
  signupAction: signup,
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSignupPage);
