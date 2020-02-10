import React, { useEffect } from "react";
import { connect } from "react-redux";
import * as problemsAction from "../../redux/actions/problemsAction";
import PropTypes from "prop-types";
import ProblemList from "./ProblemsList";
import Button from "../common/Button";

const createProblem = history => {
  history.push("/problem/createUpdate/");
  return;
};
const ProblemsPage = ({ loadProblems, problemsData, history }) => {
  useEffect(() => {
    let length = Object.keys(problemsData).length;
    if (length === 0) {
      loadProblems().catch(() => alert("error"));
    }
  }, []);

  return (
    <div>
      <Button onClick={() => createProblem(history)}>Create Question</Button>

      <ProblemList problems={problemsData} />
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
