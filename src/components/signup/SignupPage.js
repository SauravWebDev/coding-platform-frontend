import React from "react";
import { NavLink } from "react-router-dom";

import { loginLink } from "../../Config/RouterLinkConfig";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import PersonAddOutlinedIcon from '@material-ui/icons/PersonAddOutlined';
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import TextInput from "../common/InputText";
import CircularProgress from "@material-ui/core/CircularProgress";
import PropTypes from "prop-types";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(1),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp({
  onChange,
  onSave,
  errors,
  disablSignupButton,
}) {
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
      <Avatar className={classes.avatar}>
                    <PersonAddOutlinedIcon />
                  </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} onSubmit={onSave} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextInput
                autoComplete="fname"
                name="firstName"
                required={true}
                id="signout-firstName"
                label="First Name"
                type="text"
                error={errors.firstName}
                onChange={onChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextInput
                required={true}
                fullWidth
                id="signout-lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                type="text"
                error={errors.lastName}
                onChange={onChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextInput
                id="signup-email"
                label="Email Address"
                name="email"
                autoComplete="email"
                type="email"
                required={true}
                error={errors.email}
                onChange={onChange}
              />
              <TextInput
                id="signup-password"
                label="Password"
                name="password"
                type="password"
                autoComplete="current-password"
                required={true}
                error={errors.password}
                onChange={onChange}
              />
            </Grid>
          </Grid>
          {errors.signupError && (
            <span style={{ color: "red" }}>
              <h6>{errors.signupError}</h6>
            </span>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={disablSignupButton}
          >
            Sign Up
            {disablSignupButton && (
              <CircularProgress style={{ padding: "10px" }} color="white" />
            )}
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <NavLink to={loginLink}>Already have an account? Login</NavLink>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}

SignUp.propTypes = {
  onChange: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  disablSignupButton: PropTypes.bool.isRequired,
};
