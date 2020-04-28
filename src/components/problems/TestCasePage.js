import React from "react";
import PropTypes from "prop-types";

// Material UI Componenets
import {
  Divider,
  CssBaseline,
  Grid,
  Typography,
  makeStyles,
  Container,
  Tooltip,
} from "@material-ui/core";

import Button from "../common/Button";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";

import TextInput from "../common/InputText";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(2),
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
export default function TestCasePage({
  testCases,
  onSave,
  addTestCase,
  deleteTestCase,
  onChangeTestCase,
}) {
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="md">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography
          style={{ display: "inline-block" }}
          component="h1"
          variant="caption"
        >
          Provide testCases
        </Typography>
        <form className={classes.form} onSubmit={onSave}>
          <Grid item xs={12} style={{ minHeight: "200px" }}>
            <Divider variant="middle" />
            <Tooltip title="click to Add more testCases">
              <AddIcon style={{ float: "right" }} onClick={addTestCase} />
            </Tooltip>
            {testCases.map((example, index) => (
              <Grid
                container
                key={index}
                style={{ padding: "5px", margin: "5px" }}
              >
                <Grid item xs={6} style={{ padding: "5px" }}>
                  <TextInput
                    id={"testCase-input-" + index}
                    label="Input"
                    name={"testCase-input-" + index}
                    type="text"
                    required={true}
                    onChange={onChangeTestCase}
                    autoFocus={true}
                    multiline={true}
                    rows={4}
                    value={example.input}
                  />
                  <Tooltip
                    title="click to Delete above Example"
                    onClick={() => deleteTestCase(index)}
                  >
                    <DeleteIcon />
                  </Tooltip>
                </Grid>
                <Grid item xs={6} style={{ padding: "5px" }}>
                  <TextInput
                    type="text"
                    id={"testCase-output-" + index}
                    label="Output"
                    name={"testCase-output-" + index}
                    required={true}
                    onChange={onChangeTestCase}
                    multiline={true}
                    rows={3}
                    value={example.output}
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
            Update Test Case
          </Button>
        </form>
      </div>
    </Container>
  );
}

TestCasePage.propTypes = {
  onChangeTestCase: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  testCases: PropTypes.array,
  addTestCase: PropTypes.func.isRequired,
  deleteTestCase: PropTypes.func.isRequired,
};
