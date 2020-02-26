import React from "react";
import PropTypes from "prop-types";
import Problem from "./Problem";
import "./ProblemList.scss";

const List = ({ problems }) => {
  return (
    <div className="problemList">
      {Object.keys(problems).map(index => (
        <Problem key={problems[index].id} problem={problems[index]} />
      ))}
    </div>
  );
};

List.propTypes = {
  problems: PropTypes.object.isRequired
};

export default List;
