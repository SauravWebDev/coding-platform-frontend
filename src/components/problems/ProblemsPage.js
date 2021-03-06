import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as problemsAction from "../../redux/actions/problemsAction";
import * as filtersAction from "../../redux/actions/filtersAction";

import PropTypes from "prop-types";
import ProblemList from "./ProblemsList";
import Filters from "./Filters";
import Chip from "@material-ui/core/Chip";
import { toast } from "react-toastify";

import "./ProblemsPage.scss";

const createProblem = (history) => {
  history.push("/problem/createUpdate/");
  return;
};

const ProblemsPage = ({ loadProblems, problemsData, history, ...props }) => {
  const [selectedTag, setSelectedTag] = useState([]);
  const [selectedDifficulty, setSelectedDifficulty] = useState([]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "Difficulty") {
      setSelectedDifficulty(value);
      return;
    }
    if (name === "Tags") {
      setSelectedTag(value);
      return;
    }
  };
  useEffect(() => {
    let length = problemsData.length;
    if (length === 0) {
      loadProblems().catch(() => toast.error("something went wrong"));
    }
    let filters = props.filters;
    if (
      Object.keys(filters.difficulty).length === 0 &&
      Object.keys(filters.tag).length === 0
    ) {
      props.loadFilters().catch(() => toast.error("something went wrong"));
    }
  }, []);

  return (
    <div>
      <div className="problemPage">
        <div>
          {props.isAdmin && (
            <Chip
              onClick={() => createProblem(history)}
              label={"Create New Problem"}
              variant="outlined"
            />
          )}
          <Filters
            filters={props.filters}
            selectedDifficulty={selectedDifficulty}
            handleChange={handleChange}
            selectedTag={selectedTag}
          />
          <ProblemList
            isAdmin={props.isAdmin}
            problems={problemsData}
            filters={props.filters}
          />
        </div>
      
      </div>
    </div>
  );
};

ProblemsPage.propTypes = {
  loadProblems: PropTypes.func.isRequired,
  problemsData: PropTypes.array.isRequired,
  history: PropTypes.object.isRequired,
  loadFilters: PropTypes.func.isRequired,
  filters: PropTypes.object.isRequired,
  isAdmin: PropTypes.bool.isRequired,
};

function mapStateToProps(state, ownProps) {
  return {
    problemsData: state.problems,
    history: ownProps.history,
    filters: state.filters,
    isAdmin:
      state.userData.isAuthenticated &&
      state.userData.data &&
      state.userData.data.role == 2
        ? true
        : false,
  };
}

const mapDispatchToProps = {
  loadProblems: problemsAction.getAllProblems,
  loadFilters: filtersAction.getFilters,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProblemsPage);
