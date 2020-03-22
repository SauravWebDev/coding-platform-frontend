import React from "react";
import GridContainer from "../common/Grid/GridContainer.js";
import GridItem from "../common/Grid/GridItem.js";
import Parallax from "../common/Parallax/Parallax.js";
import SectionTabs from "../common/Sections/SectionTabs.js";
import { makeStyles } from "@material-ui/core/styles";
import styles from "../../assets/jss/HomeStyle.js";
import classNames from "classnames";
const useStyles = makeStyles(styles);

export default function HomePage (props){
  const classes = useStyles();
  return (
  <div >

      <Parallax image={require('./../../assets/img/bg4.jpg')}>
        <div className={classes.container}>
          <GridContainer>
            <GridItem>
              <div className={classes.brand}>
                <h1 className={classes.title}>A New Way to Learn</h1>
                <h3 className={classes.subtitle}>
                HackerLead is the best platform to help you enhance your skills, expand your knowledge and prepare for technical interviews.
                </h3>
              </div>
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>
      <div className={classNames(classes.main, classes.mainRaised)}>
      <SectionTabs />
      </div>
  </div>
);
      }


