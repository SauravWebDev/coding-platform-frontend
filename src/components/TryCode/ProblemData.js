import React from "react";
import PropTypes from "prop-types";

export default function ProblemData({ questionData }) {
  return (
    <div>
      <h4>Question Details</h4>
      <div className="Question">
        {questionData.id}. {questionData.title}
      </div>
      <div dangerouslySetInnerHTML={{ __html: questionData.description }} />
      <div dangerouslySetInnerHTML={{ __html: questionData.example }} />
      <div dangerouslySetInnerHTML={{ __html: questionData.note }} />
    </div>
  );
}

ProblemData.propTypes = {
  questionData: PropTypes.object.isRequired,
};
