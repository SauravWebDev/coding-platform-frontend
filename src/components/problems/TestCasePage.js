import React from "react";
import PropTypes from "prop-types";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import "./TestCasePage.scss";
// Material UI Componenets
import {
  Divider,
  CssBaseline,
  Grid,
  Typography,
  makeStyles,
  Container,
} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Button from "../common/Button";
import TextInput from "../common/InputText";
import SingleSelect from "../common/SingleSelect";

const TEST_CASE_TYPE = {
  1: "Default Case",
  2: "Corner Case",
  3: "Normal",
  4: "Time Complexity",
};
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
  table: {
    minWidth: 650,
  },
}));
export default function TestCasePage({
  testCases,
  onSave,
  changeSelectedTC,
  updateTestCase,
  deleteTestCase,
  selectedTestCase,
}) {
  const classes = useStyles();

  const deleteTC = (data) => {
    confirmAlert({
      title: ``,
      message: `Delete Test Case : ${data.id} `,
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            deleteTestCase(data.id);
          },
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
    });
  };
  return (
    <>
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
            <Divider variant="middle" />
            <div>
              {selectedTestCase.id
                ? `update test case : ${selectedTestCase.id}`
                : `create test case`}
            </div>
            <Grid container spacing={3} style={{ padding: "5px" }}>
              <Grid item xs={6}>
                <TextInput
                  id={"testCase-input"}
                  label="Input"
                  name={"testCase-input"}
                  type="text"
                  required={true}
                  onChange={changeSelectedTC}
                  autoFocus={true}
                  multiline={true}
                  rows={3}
                  value={selectedTestCase.input}
                />
              </Grid>
              <Grid item xs={6}>
                <TextInput
                  type="text"
                  id={"testCase-output"}
                  label="Output"
                  name={"testCase-output"}
                  required={true}
                  onChange={changeSelectedTC}
                  multiline={true}
                  rows={3}
                  value={selectedTestCase.output}
                />
              </Grid>
              <Grid item xs={6}>
                <SingleSelect
                  labelName="Type"
                  selectedValue={selectedTestCase.type}
                  inputItems={TEST_CASE_TYPE}
                  onChange={changeSelectedTC}
                />
              </Grid>
              <Grid item xs={6}>
                <Button onClick={onSave}>Save</Button>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
      <div>
        <TableContainer component={Paper}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell align="left">Id</TableCell>
                <TableCell align="left">Type</TableCell>
                <TableCell align="left">Input</TableCell>
                <TableCell align="left">Ouput</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {testCases.map((testCase) => (
                <TableRow key={testCase.id}>
                  <TableCell component="th" scope="row">
                    {testCase.id}
                  </TableCell>
                  <TableCell align="left">
                    {TEST_CASE_TYPE[testCase.type]}
                  </TableCell>
                  <TableCell align="left">
                    {testCase.input.split("\n").map((item, i) => {
                      return <p key={i}>{item}</p>;
                    })}
                  </TableCell>
                  <TableCell align="left">
                    {testCase.output.split("\n").map((item, i) => {
                      return <p key={i}>{item}</p>;
                    })}
                  </TableCell>
                  <TableCell align="left">
                    <span style={{ padding: "5px", margin: "5px" }}>
                      <Button onClick={() => updateTestCase(testCase)}>
                        Update
                      </Button>
                    </span>
                    <span style={{ padding: "5px", margin: "5px" }}>
                      <Button
                        onClick={function () {
                          deleteTC(testCase);
                        }}
                      >
                        Delete
                      </Button>
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
}

TestCasePage.propTypes = {
  changeSelectedTC: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  testCases: PropTypes.array,
  updateTestCase: PropTypes.func.isRequired,
  deleteTestCase: PropTypes.func.isRequired,
  selectedTestCase: PropTypes.object.isRequired,
};
