import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import "./ProblemData.scss";

import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles } from '@material-ui/core/styles';

// drawer for similar problems
import clsx from 'clsx';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
//

//other parts
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

const useStyles = makeStyles({
  list: {
    maxWidth: '650px',
    width: 600,

    background: '#1F1E1E',
    color: '#A8A7A7',
    cursor: 'pointer'
  },
  fullList: {
    width: 'auto',
  },
});

export default function ProblemData({ questionData }) {
  const classes = useStyles();
  //drawer and list starts
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false
  });

  const toggleDrawer = (anchor, open) => event => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = anchor => (
    <div
      className={clsx(classes.list)}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <Button className="drawerButton">All Problems</Button>
      <List>
        {[
          "Question1",
          "Question2",
          "Question3",
          "Question4",
          "Question5",
          "Question6",
          "Question7",
          "Question8",
          "Question9",
          "Question10",
          "Question11",
          "Question12",
          "Question13",
          "Question14",
          "Question15",
          "Question16",
        ].map((text, index) => (
          <ListItem button key={text}>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>

    </div>
  );
  //drawer and list ends

  return (
    <div>
      <h4>Question Details</h4>
      <div className="navButton borderStyle">
        <Button  >
          Easy
        </Button>
        <Button
          className="topButtons"
          size="small"
          color="primary"
        >
          <NavigateBeforeIcon />
        </Button>
        <Button
          className="topButtons"
          size="small"
          color="primary"
        >
          <NavigateNextIcon />
        </Button>

        <div>
          {["Problems"].map(anchor => (
            <React.Fragment key={"left"}>
              <Button onClick={toggleDrawer("left", true)}>{anchor} <MenuIcon fontSize="small" /></Button>
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
      <div className="exampleStyle elementMargin" dangerouslySetInnerHTML={{ __html: questionData.example }} />
      <div className="exampleStyle borderStyle" dangerouslySetInnerHTML={{ __html: questionData.note }} />

      
      <div className="borderStyle">
        <Button
          size="small"
        >
          Similar problems
          <ArrowDropDownIcon fontSize="small" />
        </Button>
      </div>

      <div className="exampleStyle">
        <div className="similarQuesStyle"><span>Question1</span><span>Easy</span></div>
        <div className="similarQuesStyle"><span>Question2</span><span>Medium</span></div>
        <div className="similarQuesStyle"><span>Question3</span><span>Hard</span></div>
      </div>

      <div className="navButton">
        <Button size="small" color="primary" variant="contained">
          <NavigateBeforeIcon fontSize="small" />
          Prev
        </Button>
        <Button size="small" color="primary" variant="contained">
          Next
          <NavigateNextIcon fontSize="small" />
        </Button>
      </div>
    </div>
  );
}

ProblemData.propTypes = {
  questionData: PropTypes.object.isRequired,
};
