import React from "react";
import PropTypes from "prop-types";
import ProblemExample from "./ProblemExample";

const ProblemData = ({ questionData }) => {
  console.log("data ", questionData);

  return (
    <div>
      <div className="Question heading">
        {questionData.id}. {questionData.title}
      </div>
      <div>{questionData.description}</div>
      <ProblemExample exampleData={questionData.examples} />
    </div>
  );
};

ProblemData.propTypes = {
  questionData: PropTypes.object.isRequired
};

export default ProblemData;
