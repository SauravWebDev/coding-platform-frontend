import React, { useState } from "react";
import { connect } from "react-redux";

import { Resize, ResizeVertical, ResizeHorizon } from "react-resize-layout";
import ProblemData from "./ProblemData";
import "./codePage.css";
import TestCase from "./TestCase";

import Editor from "./Editor";

function codePage() {
  const [codeData, setCodeData] = useState(`function(nums) {
 };
 `);

  const [data] = useState({
    questionData: {
      id: 378,
      title: "Kth Smallest Element in a Sorted Matrix",
      desc: `Given a n x n matrix where each of the rows and columns are sorted in ascending order, find the kth smallest element in the matrix.

      Note that it is the kth smallest element in the sorted order, not the kth distinct element.`,
      example: [
        {
          input: `
            matrix = 
            [
              [ 1,  5,  9],
              [10, 11, 13],
              [12, 13, 15]
            ],
            k = 8`,
          output: 13
        }
      ],
      note: [`You may assume k is always valid, 1 ≤ k ≤ n2.`]
    }
  });
  const onCodeChange = value => {
    setCodeData(value);
  };
  const run = () => {};

  const submit = () => {};
  return (
    <div>
      <div>
        <div className="float-right btn-space">
          <button className="button button4" onClick={run}>
            Run
          </button>
          <button className="button button5" onClick={submit}>
            Submit
          </button>
        </div>
      </div>
      <div className="row drags">
        <Resize handleWidth="3px" handleColor="#ffffff ">
          <ResizeHorizon width="350px" minWidth="350px">
            <div className="left">
              <ProblemData questionData={data.questionData} />
            </div>
          </ResizeHorizon>
          <ResizeHorizon minWidth="50%">
            <Resize handleWidth="3px" handleColor="#ffffff ">
              <ResizeVertical height="350px">
                <div className="codemaindiv">
                  <Editor codeData={codeData} onCodeChange={onCodeChange} />
                </div>
              </ResizeVertical>
              <ResizeVertical minHeight="50px">
                <TestCase />
              </ResizeVertical>
            </Resize>
          </ResizeHorizon>
        </Resize>
      </div>
    </div>
  );
}

function mapStateToProps() {
  // const id = ownProps.match.params.slug;
  return {
    selectedQuestion: null
  };
}

export default connect(mapStateToProps)(codePage);
