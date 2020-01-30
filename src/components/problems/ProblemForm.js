import React from "react";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";

// Material UI Componenets
import {
  Button,
  Divider,
  CssBaseline,
  Grid,
  Typography,
  makeStyles,
  Container,
  Tooltip
} from "@material-ui/core";

// MAterial UI icons
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";

import TextInput from "../common/InputText";

import { validString } from "../../util/util";

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

export default function ProblemForm({
  onChange,
  onSave,
  errors,
  isCreate,
  title,
  examples,
  description,
  addExample,
  deleteExample
}) {
  const classes = useStyles();
  return (
    <Container component="main" maxWidth="md">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          {isCreate ? "Create New Problem" : "update Problem"}
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
                error={validString(errors.title)}
                onChange={onChange}
                autoFocus={true}
                multiline={true}
                rows={4}
                value={title}
              />
            </Grid>
            <Grid item xs={6}>
              <TextInput
                id="createUpdate-description"
                label="Description"
                name="description"
                type="text"
                required={true}
                error={validString(errors.description)}
                onChange={onChange}
                multiline={true}
                rows={6}
                value={description}
              />
            </Grid>
            <Grid item xs={12}>
              <Divider variant="middle" />
              <Typography
                style={{ display: "inline-block" }}
                component="h1"
                variant="caption"
              >
                Provide Examples
              </Typography>
              <Tooltip title="click to Add more Examples">
                <AddIcon style={{ float: "right" }} onClick={addExample} />
              </Tooltip>
            </Grid>
            {examples.map((example, index) => (
              <Grid container key={index}>
                <Grid item xs={3}>
                  <TextInput
                    id="createUpdate-exampleInput-1"
                    label="Input"
                    name={"example_input_" + index}
                    type="text"
                    required={true}
                    onChange={onChange}
                    multiline={true}
                    rows={4}
                    value={example.input}
                  />
                  <Tooltip
                    title="click to Delete above Example"
                    onClick={() => deleteExample(index)}
                  >
                    <DeleteIcon />
                  </Tooltip>
                </Grid>
                <Grid item xs={3}>
                  <TextInput
                    type="text"
                    id="createUpdate-output"
                    label="Output"
                    name={"example_output_" + index}
                    required={true}
                    error={errors.output}
                    onChange={onChange}
                    multiline={true}
                    rows={4}
                    value={example.output}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextInput
                    id="createUpdate-explaination"
                    label="Explaination"
                    name={"example_explaination_" + index}
                    type="text"
                    required={true}
                    error={errors.explaination}
                    onChange={onChange}
                    multiline={true}
                    rows={4}
                    value={example.explaination}
                  />
                </Grid>
              </Grid>
            ))}
          </Grid>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {isCreate ? <>Create</> : <>update</>}
          </Button>
        </form>
      </div>
    </Container>
  );
}

ProblemForm.propTypes = {
  onChange: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  isCreate: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  examples: PropTypes.array.isRequired
};
