import React from "react";
import PropTypes from "prop-types";
import ProblemExample from "./ProblemExample";

const ProblemData = ({ questionData }) => {
  const example =
    questionData.example && questionData.example.length > 0
      ? questionData.example
      : null;

  return (
    <div>
      <div className="Question heading">
        {questionData.id}. {questionData.title}
      </div>
      <div>{questionData.desc}</div>
      {example && <ProblemExample exampleData={example} />}
    </div>
  );
};

ProblemData.propTypes = {
  questionData: PropTypes.object.isRequired
};

export default ProblemData;
