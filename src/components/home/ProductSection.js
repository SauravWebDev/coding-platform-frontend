import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

import Chat from "@material-ui/icons/Chat";

// core components
import GridContainer from "../common/Grid/GridContainer.js";
import GridItem from "../common/Grid/GridItem.js";
import InfoArea from "../InfoArea/InfoArea.js";

import styles from "../../assets/jss/productStyle.js";
const useStyles = makeStyles(styles);

export default function ProductSection() {
  const classes = useStyles();
  return (
    <div className={classes.section}>
      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={8}>
          <h2 className={classes.title}>Let{"'"}s talk product</h2>
          <h5 className={classes.description}>
          A full-screen editor hosted on our platform to help you easily solve our challenges and practice. Solve challenges in one of 10+ programming languages and validate your solutions easily on our platform.
          </h5>
        </GridItem>
      </GridContainer>
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={4}>
            <InfoArea
              title="Beginer"
              description="Start with our basic problems to make you familiar with the core concepts."
              icon={Chat}
              iconColor="success"
              vertical
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <InfoArea
              title="Intermediate"
              description="Selected set of problems for coding interview practice."
              icon={Chat}
              iconColor="success"
              vertical
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <InfoArea
              title="Expert"
              description="Be an expert."
              icon={Chat}
              iconColor="success"
              vertical
            />
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
}
