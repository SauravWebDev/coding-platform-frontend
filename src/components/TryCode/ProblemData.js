import React, { useState } from "react";
import { NavLink } from "react-router-dom";

import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import "./ProblemData.scss";

import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import MenuIcon from "@material-ui/icons/Menu";
import { makeStyles } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";

// drawer for similar problems
import clsx from "clsx";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
//

//other parts
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const useStyles = makeStyles({
  list: {
    maxWidth: "650px",
    width: 600,
    background: "#1F1E1E",
    color: "#A8A7A7",
    cursor: "pointer",
    height: '1000%',
  },
  fullList: {
    width: "auto",
  },
});

export default function ProblemData({
  questionData,
  problems,
  selectedQuestionIndex,
  changeProblem,
  difficulty,
}) {
  const classes = useStyles();
  //drawer and list starts
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const [showSimilar, setShowSimilar] = useState(false);
  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };
  const changeShowSimilar = () => {
    setShowSimilar(!showSimilar);
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list)}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <div className="modalHeader">
        <h4 className="drawerButton">All Problems</h4>
      </div>
      <List className="modalList">
        {problems.map((data) => (
          <div
            key={data.id}
          // style={{
          //   backgroundColor: data.id == questionData.id ? "grey" : undefined,
          // }}
          >
            <NavLink to={"/problem/" + data.slug}>
              <ListItem button className="listDetails">
                <ListItemText primary={data.title} className="listItems" />
                <Chip
                  style={{
                    backgroundColor: color[data.difficulty],
                    color: "white",
                  }}
                  label={difficulty[data.difficulty]}
                  variant="outlined"
                />
              </ListItem>
            </NavLink>
          </div>
        ))}
      </List>
    </div>
  );
  //drawer a  nd list ends
  let color = {
    1: "#5cb85c",
    2: "#f0ad4e",
    3: "#db2644",
  };
  return (
    <div className="problemData">
      <h4>Question Details</h4>
      <div className="navButton borderStyle">
        <Chip
          style={{
            backgroundColor: color[questionData.difficulty],
            color: "white",
          }}
          label={difficulty[questionData.difficulty]}
        />
        <Button

          size="small"
          color="primary"
          disabled={selectedQuestionIndex == 0 ? true : false}
          onClick={() => changeProblem("prev")}
        >
          <NavigateBeforeIcon />
        </Button>
        <Button

          size="small"
          color="primary"
          disabled={selectedQuestionIndex == problems.length - 1 ? true : false}
          onClick={() => changeProblem("next")}
        >
          <NavigateNextIcon />
        </Button>

        <div>
          {["Problems"].map((anchor) => (
            <React.Fragment key={"left"}>
              <Button onClick={toggleDrawer("left", true)}>
                {anchor} <MenuIcon fontSize="small" />
              </Button>
              <SwipeableDrawer
                anchor={"left"}
                open={state["left"]}
                onClose={toggleDrawer("left", false)}
                onOpen={toggleDrawer("left", true)}
              >
                {list("left")}
              </SwipeableDrawer>
            </React.Fragment>
          ))}
        </div>

        {/* <Button
        className="topButtons"
          size="small"
          color="primary"
        >
          Problems
        
        </Button> */}
      </div>
      <div className="Question">
        {questionData.id}. {questionData.title}
      </div>
      <div dangerouslySetInnerHTML={{ __html: questionData.description }} />
      <div
        className="exampleStyle elementMargin"
        dangerouslySetInnerHTML={{ __html: questionData.example }}
      />
      <div
        className="exampleStyle borderStyle"
        dangerouslySetInnerHTML={{ __html: questionData.note }}
      />
      <div
        className="borderStyle"
        style={{
          display: "none",
          alignItems: "center",
          justifyContent: "space-between",
          cursor: "pointer",
        }}
        onClick={changeShowSimilar}
      >
        <Button size="small">Similar problems</Button>
        <span>
          {showSimilar ? (
            <ExpandLessIcon fontSize="small" />
          ) : (
              <ExpandMoreIcon fontSize="small" />
            )}
        </span>
      </div>
      <div
        className="exampleStyle"
        style={{ display: !showSimilar ? "none" : undefined }}
      >
        <div className="similarQuesStyle">
          <span>Question1</span>
          <span>Easy</span>
        </div>
        <div className="similarQuesStyle">
          <span>Question2</span>
          <span>Medium</span>
        </div>
        <div className="similarQuesStyle">
          <span>Question3</span>
          <span>Hard</span>
        </div>
      </div>
      <div className="navButton">
        <Button
          size="small"
          color="primary"
          variant="contained"
          disabled={selectedQuestionIndex == 0 ? true : false}
          onClick={() => changeProblem("prev")}
        >
          <NavigateBeforeIcon fontSize="small" />
          Prev
        </Button>
        <Button
          size="small"
          color="primary"
          variant="contained"
          disabled={selectedQuestionIndex == problems.length - 1 ? true : false}
          onClick={() => changeProblem("next")}
        >
          Next
          <NavigateNextIcon fontSize="small" />
        </Button>
      </div>
    </div>
  );
}

ProblemData.propTypes = {
  questionData: PropTypes.object.isRequired,
  selectedQuestionIndex: PropTypes.number,
  changeProblem: PropTypes.func.isRequired,
  difficulty: PropTypes.object.isRequired,
  problems: PropTypes.array.isRequired,
};
