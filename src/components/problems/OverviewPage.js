import React from "react";
import PropTypes from "prop-types";

export default function OverviewPage({ problem, filters, selectedDifficulty, testCases }) {
  let langs = [];
  for (let i in problem.language) {
    langs.push(problem.language[i]);
  }

  return (
    <div>
      <h4>Question Details</h4>
      <div>Problem Id: {problem.id}</div>
      <div> Problem Title : {problem.title}</div>
      <div>Difficulty : {filters.difficulty[selectedDifficulty]}</div>
      Description:
      <div dangerouslySetInnerHTML={{ __html: problem.description }} />
      <div>No of test Cases : {testCases.length}</div>
      <div>Languages : {langs.join(", ")}</div>
      <div dangerouslySetInnerHTML={{ __html: problem.example }} />
      <div dangerouslySetInnerHTML={{ __html: problem.note }} />
    </div>
  );
}

OverviewPage.propTypes = {
  problem: PropTypes.object.isRequired,
  filters: PropTypes.object.isRequired,
  testCases:PropTypes.array.isRequired,
  selectedDifficulty: PropTypes.string.isRequired,
};
