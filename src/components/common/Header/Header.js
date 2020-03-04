import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import Logo from "../../../images.png";

import "./Header.scss";
function Header({ isLoggedIn }) {
  return (
    <header>
      <div className="header">
        <div>
          <NavLink to="/">
            <img className="logo" src={Logo} alt="website logo" />
          </NavLink>
        </div>
        <div className="rightbar">
          {!isLoggedIn ? (
            <>
              <div>
                <NavLink to="/signup">Signup</NavLink>
              </div>
              <div>
                <NavLink to="/login">Login</NavLink>
              </div>
            </>
          ) : (
            <div className="accoutDiv">
              <AccountCircleIcon className="header-element" />
              <div className="dropdown-content">
                <NavLink to="/#">Profile</NavLink>
                <NavLink to="/#">Change Password</NavLink>
                <NavLink to="/#">Logout</NavLink>
              </div>
            </div>
          )}
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
