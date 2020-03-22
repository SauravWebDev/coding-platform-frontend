import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// core components
import GridContainer from "../Grid/GridContainer.js";
import GridItem from "../Grid/GridItem.js";
import CustomTabs from "../CustomTabs/CustomTabs.js";

import styles from "../../../assets/jss/TabsStyle.js";

const useStyles = makeStyles(styles);

export default function SectionTabs() {
  const classes = useStyles();
  return (
    <div className={classes.section}>
      <div className={classes.container}>
        <div id="nav-tabs">
          <h3>Explore</h3>
          <GridContainer>
            <GridItem xs={12} sm={12} md={6}>
              <h3>
                <small>Explore is a well-organized tool that helps you get the most out of HackerLead by providing structure to guide your progress towards the next step in your programming career</small>
              </h3>
              <CustomTabs
                headerColor="primary"
                tabs={[
                  {
                    tabName: "Problems",
                   
                    tabContent: (
                      <p className={classes.textCenter}>
                       At our core, HackerLead is about developers. Our powerful development tools such as Playground help you test, debug and even write your own projects online.
                      </p>
                    )
                  },
                  {
                    tabName: "Contest",
                  
                    tabContent: (
                      <p className={classes.textCenter}>
                      Come and join one of the largest tech communities with hundreds of thousands of active users and participate in our contests to challenge yourself and earn rewards.
                      </p>
                    )
                  },
                  {
                    tabName: "Companies & Candidates",
                   
                    tabContent: (
                      <p className={classes.textCenter}>
                       Not only does LeetCode prepare candidates for technical interviews, we also help companies identify top technical talent. From sponsoring contests to providing online assessments and training, we offer numerous services to businesses.
                      </p>
                    )
                  }
                ]}
              />
            </GridItem>
           
          </GridContainer>
        </div>
      </div>
    </div>
  );
}
