import React from "react";
import PropTypes from "prop-types";

const ProblemExample = ({ exampleData }) => (
  <div className="example">
    <span className="heading">Example:</span>
    <div className="example-data">
      {exampleData.map((example, index) => {
        return (
          <div key={index}>
            <div className="input">
              <span className="heading">Input:</span>
              <span className="input-data data">{example.input}</span>
            </div>
            <div className="output">
              <span className="heading">Output:</span>
              <span className="output-data data">{example.output}</span>
            </div>
            <div className="Explanation">
              <span className="heading">Explanation:</span>
              <span className="explaination-data data">
                {example.explaination}
              </span>
            </div>
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
