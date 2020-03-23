import React, { useEffect } from "react";
import { connect } from "react-redux";
import * as problemsAction from "../../redux/actions/problemsAction";
import * as filtersAction from "../../redux/actions/filtersAction";

import PropTypes from "prop-types";
import ProblemList from "./ProblemsList";
import Filters from "./Filters";

import Button from "../common/Button";
import "./ProblemsPage.scss";

const createProblem = history => {
  history.push("/problem/createUpdate/");
  return;
};

const ProblemsPage = ({ loadProblems, problemsData, history, ...props }) => {
  useEffect(() => {
    let length = Object.keys(problemsData).length;
    if (length === 0) {
      loadProblems().catch(() => alert("error"));
    }
    let filters = props.filters;
    if (filters.difficulty.length === 0 && filters.tag.length === 0) {
      props.loadFilters().catch(() => alert("error"));
    }
  }, []);

  return (
    <div className="problemPage">
      <div className="width-5percent"></div>
      <div className="width-70percent">
        <Button onClick={() => createProblem(history)}>Create Question</Button>
        <ProblemList problems={problemsData} />
      </div>
      <div className="width-25percent filter">
        <Filters filters={props.filters} />
      </div>
    </div>
  );
};

ProblemsPage.propTypes = {
  loadProblems: PropTypes.func.isRequired,
  problemsData: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  loadFilters: PropTypes.func.isRequired,
  filters: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    problemsData: state.problems,
    history: ownProps.history,
    filters: state.filters
  };
}

const mapDispatchToProps = {
  loadProblems: problemsAction.getAllProblems,
  loadFilters: filtersAction.getFilters
};

export default connect(mapStateToProps, mapDispatchToProps)(ProblemsPage);
