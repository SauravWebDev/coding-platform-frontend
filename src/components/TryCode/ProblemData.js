import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import "./ProblemData.scss";

import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import MenuIcon from '@material-ui/icons/Menu';

export default function ProblemData({ questionData }) {
  return (
    <div>
      <h4>Question Details</h4>
      <div>
        <span>Easy</span>
        <Button
          size="small"
          color="primary"
        >
          <NavigateBeforeIcon />
        </Button>
        <Button
          size="small"
          color="primary"
        >
          <NavigateNextIcon />
        </Button>

        <Button
          size="small"
          color="primary"
        >
          Problems
        <MenuIcon fontSize="small" />
        </Button>
      </div>
      <div className="Question">
        {questionData.id}. {questionData.title}
      </div>
      <div dangerouslySetInnerHTML={{ __html: questionData.description }} />
      <div dangerouslySetInnerHTML={{ __html: questionData.example }} />
      <div dangerouslySetInnerHTML={{ __html: questionData.note }} />
      <div className="navButton">
        <Button
          size="small"
          color="primary"
          variant="contained"
        >
          <NavigateBeforeIcon fontSize="small" />
        Prev
               </Button>
        <Button
          size="small"
          color="primary"
          variant="contained"
        >
          Next
        <NavigateNextIcon fontSize="small" />
        </Button>
      </div>
      <div className="similarButton">
        <Button
          size="small"
          color="primary"
          variant="contained"
        >
          Similar problems
               </Button>
      </div>
    </div>
  );
}

ProblemData.propTypes = {
  questionData: PropTypes.object.isRequired,
};
