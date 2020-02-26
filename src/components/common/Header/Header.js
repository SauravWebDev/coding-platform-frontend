import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

import "./Header.scss";
function Header({ isLoggedIn }) {
  return (
    <header>
      <div className="header">
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
            <AccountCircleIcon className="header-element" />
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
    </header>
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
