import React from "react";
import PropTypes from "prop-types";
import ProblemExample from "./ProblemExample";

export default function ProblemData({ questionData }) {
  return (
    <div>
      <h4>Question Details</h4>
      <div className="Question">
        {questionData.id}. {questionData.title}
      </div>
      <div>{questionData.description}</div>
      <ProblemExample exampleData={questionData.examples} />
    </div>
  );
}

ProblemData.propTypes = {
  questionData: PropTypes.object.isRequired
};
