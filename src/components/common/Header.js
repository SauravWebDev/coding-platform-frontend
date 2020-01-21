import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { AppBar, Toolbar, Typography, Grid } from "@material-ui/core";

import AccountCircleIcon from "@material-ui/icons/AccountCircle";

function Header({ isLoggedIn }) {
  return (
    <AppBar position="static">
      <Toolbar>
        <Grid container>
          <Grid item xs={1}>
            <NavLink to="/">
              <Typography
                style={{
                  display: "inline-block",
                  color: "white"
                }}
              >
                Home
              </Typography>
            </NavLink>
          </Grid>
          <Grid item xs={1}>
            <NavLink style={{ color: "white" }} to="/problems">
              <Typography
                style={{
                  display: "inline-block",
                  color: "white"
                }}
              >
                Questions
              </Typography>
            </NavLink>
          </Grid>

          <Grid item xs={10}>
            <div style={{ float: "right" }}>
              {!isLoggedIn ? (
                <>
                  <NavLink color="white" to="/login">
                    <Typography
                      style={{
                        display: "inline-block",
                        color: "white"
                      }}
                    >
                      Login
                    </Typography>
                  </NavLink>

                  <NavLink to="/signup">
                    <Typography
                      style={{
                        display: "inline-block",
                        color: "white",
                        marginLeft: "20px"
                      }}
                    >
                      Signup
                    </Typography>
                  </NavLink>
                </>
              ) : (
                <AccountCircleIcon />
              )}
            </div>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
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
