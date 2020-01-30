import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as problemsAction from "../../redux/actions/problemsAction";
import PropTypes from "prop-types";
import ProblemList from "./ProblemList";
import Spinner from "../common/Spinner";
import style from "./style.css";
import { Grid, Button, Paper } from "@material-ui/core";

const useStyles = style;
const createProblem = history => {
  history.push("/problem/createUpdate/");
  return;
};
const ProblemsPage = ({ loadProblems, problemsData, history }) => {
  useEffect(() => {
    console.log("mounted");
    let length = Object.keys(problemsData).length;
    if (length === 0) {
      loadProblems().catch(() => alert("error"));
    }
  }, []);

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={10}>
          <Button
            variant="outlined"
            className={classes.add}
            color="primary"
            onClick={() => {
              createProblem(history);
            }}
          >
            Create Question
          </Button>
          <Paper className={classes.plist}>
            <ProblemList problems={problemsData} />
          </Paper>
        </Grid>

        <Grid item xs={2}></Grid>
      </Grid>
    </div>
  );
};

ProblemsPage.propTypes = {
  loadProblems: PropTypes.func.isRequired,
  problemsData: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    problemsData: state.problems,
    history: ownProps.history
  };
}

const mapDispatchToProps = {
  loadProblems: problemsAction.getAllProblems
};

export default connect(mapStateToProps, mapDispatchToProps)(ProblemsPage);
