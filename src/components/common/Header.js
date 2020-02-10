import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

function Header({ isLoggedIn }) {
  return (
    <div className="flex-container header">
      {!isLoggedIn ? (
        <>
          <div>
            <NavLink to="/signup" activeStyle={{ color: "green" }}>
              Signup
            </NavLink>
          </div>
          <div>
            <NavLink to="/login" activeStyle={{ color: "green" }}>
              Login
            </NavLink>
          </div>
        </>
      ) : (
        <div>
          <AccountCircleIcon className="header-element" onClick="control" />
          {/*
          <div></div>

          <div id="myDropdown" className="dropdown-content">
            <a href="#home">Profile</a>
            <a href="#about">Sign out</a>
          </div>
          */}
        </div>
      )}
      <div>
        <NavLink to="/problems" activeStyle={{ color: "green" }}>
          Questions
        </NavLink>
      </div>
      <div>
        <NavLink to="/" exact activeStyle={{ color: "green" }}>
          Home
        </NavLink>
      </div>
    </div>
  );
}

Header.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
  return {
    isLoggedIn: state.userData.isAuthenticated
  };
}
export default connect(mapStateToProps)(Header);
