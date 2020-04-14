import React from "react";
import PropTypes from "prop-types";
import "./ProblemExample.scss";

const ProblemExample = ({ exampleData }) => (
  <div className="example">
    <span className="heading">Example:</span>
    <div className="example-data">
      {exampleData.map((example, index) => {
        return (
          <div key={index}>
            <div>Input:</div>
            <div>{example.input}</div>
            <br />
            <div>Output:</div>
            <div>{example.output}</div>
            <br />
            <div>Explanation:</div>
            <div>{example.explanation}</div>
            <br />
          </div>
        );
      })}
    </div>
  </div>
);

ProblemExample.propTypes = {
  exampleData: PropTypes.array.isRequired
};

export default ProblemExample;
