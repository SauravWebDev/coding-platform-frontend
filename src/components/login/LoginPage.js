import React from "react";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import LockOpenOutlinedIcon from '@material-ui/icons/LockOpenOutlined';
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import TextInput from "../common/InputText";
import { signupLink } from "../../Config/RouterLinkConfig";
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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function LogIn({ onChange, onSave, errors, disable }) {
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOpenOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <form className={classes.form} onSubmit={onSave}>
          <TextInput
            id="signin-email"
            label="Email Address"
            name="email"
            autoComplete="email"
            type="text"
            required={true}
            error={errors.email}
            onChange={onChange}
            autoFocus={true}
          />
          <TextInput
            id="signin-password"
            label="Password"
            name="password"
            type="password"
            autoComplete="current-password"
            required={true}
            autoFocus={false}
            error={errors.password}
            onChange={onChange}
          />

          {errors.signInError && (
            <span style={{ color: "red" }}>
              <h6>{errors.signInError}</h6>
            </span>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={disable}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <NavLink to="/">Forgot password?</NavLink>
            </Grid>
            <Grid item>
              <NavLink to={signupLink}>
                {"Don't have an account? Sign Up"}
              </NavLink>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}

LogIn.propTypes = {
  onChange: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  disable: PropTypes.bool.isRequired,
};
