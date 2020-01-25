import React from "react";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";

import Avatar from "@material-ui/core/Avatar";
import { Button, Divider } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import TextInput from "../common/InputText";

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

export default function CreateUpdateProblemPage({
  onChange,
  onSave,
  errors,
  operation,
  examples = []
}) {
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="md">
      <CssBaseline />

      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          {operation === "create" ? "Create New Problem" : "update Problem"}
        </Typography>
        <form className={classes.form} onSubmit={onSave}>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <TextInput
                id="createUpdate-title"
                label="Title"
                name="title"
                type="text"
                required={true}
                error={errors.title}
                onChange={onChange}
                autoFocus={true}
                multiline={true}
                rows={4}
              />
            </Grid>
            <Grid item xs={6}>
              <TextInput
                id="createUpdate-description"
                label="Description"
                name="description"
                type="password"
                required={true}
                error={errors.description}
                onChange={onChange}
                multiline={true}
                rows={6}
              />
            </Grid>
            <Grid item xs={12}>
              <Divider variant="middle" />
              <Typography component="h1" variant="caption">
                Provide Examples
              </Typography>
            </Grid>
            {examples.map(example => (
              <>
                <Grid item xs={3}>
                  <TextInput
                    id="createUpdate-exampleInput-1"
                    label="Input"
                    name="exampleInput-1"
                    type="text"
                    required={true}
                    onChange={onChange}
                    autoFocus={true}
                    multiline={true}
                    rows={4}
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextInput
                    id="createUpdate-output"
                    label="Output"
                    name="output"
                    required={true}
                    error={errors.description}
                    onChange={onChange}
                    multiline={true}
                    rows={4}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextInput
                    id="createUpdate-explaination"
                    label="Explaination"
                    name="explaination"
                    required={true}
                    error={errors.description}
                    onChange={onChange}
                    multiline={true}
                    rows={4}
                  />
                </Grid>
              </>
            ))}
          </Grid>

          {errors.signInError && (
            <span style={{ color: "red" }}>
              <h6>{errors.signInError}</h6>
            </span>
          )}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Create
          </Button>
        </form>
      </div>
    </Container>
  );
}

CreateUpdateProblemPage.propTypes = {
  onChange: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};
