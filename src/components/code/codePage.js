import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { Resize, ResizeVertical, ResizeHorizon } from "react-resize-layout";
import ProblemData from "./ProblemData";
import "./codePage.css";
import TestCase from "./TestCase";
import Editor from "./Editor";

// Material UI Componenets
import {
  Button,
  Divider,
  CssBaseline,
  Grid,
  Typography,
  makeStyles,
  Container,
  Tooltip,
  AppBar,
  Tabs,
  Tab,
  Box
} from "@material-ui/core";

import { validString } from "../../util/util";

// API //
import { getProblemByIdOrTitle } from "../../api/problemsApi";

function TabPanel(props) {
  const { children, value, index } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

function codePage({ slug }) {
  let [problem, setProblem] = useState({
    id: null,
    title: "",
    description: "",
    examples: [{ input: "", output: "", explaination: "" }]
  });

  useEffect(() => {
    if (validString(slug)) {
      getProblemByIdOrTitle(slug)
        .then(data => {
          if (data.error) {
            // setApiError(data.error);
          } else {
            setProblem({
              id: data.id,
              title: data.title,
              examples: data.example,
              description: data.description
            });
          }
        })
        .catch(e => {
          alert(e);
        });
    }
  }, [slug]);

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [exposedData, setExposedData] = useState("");
  const [mainData, setMainData] = useState("");
  const [inputOutputData, setInputOutputData] = useState("");

  const codeChangeLogicFile = value => {
    setExposedData(value);
  };
  const codeChangeWrapper = value => {
    setMainData(value);
  };

  const codeChangeInputOutput = value => {
    setInputOutputData(value);
  };
  const run = () => {
    alert();
  };

  const submit = () => {
    let data = { exposedData, mainData, inputOutputData };
  };

  return (
    <Container component="main" maxWidth="lg">
      <CssBaseline />
      <Grid container spacing={3}>
        <Grid md={10}>
          <AppBar position="static">
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="simple tabs example"
            >
              <Tab label="Question Details" />
              <Tab label="Exposed File" />
              <Tab label="Main File" />
              <Tab label="input output" />
            </Tabs>
          </AppBar>
          <TabPanel value={value} index={0}>
            <ProblemData questionData={problem} />
          </TabPanel>

          <TabPanel value={value} index={1}>
            <Editor codeData={exposedData} onCodeChange={codeChangeLogicFile} />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <Editor codeData={mainData} onCodeChange={codeChangeWrapper} />
          </TabPanel>
          <TabPanel value={value} index={3}>
            <Editor
              style={{ width: "500px" }}
              codeData={inputOutputData}
              onCodeChange={codeChangeInputOutput}
            />
          </TabPanel>
        </Grid>
        <Grid md={2} style={{ "margin-top": "10%" }}>
          <Grid>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => {
                //createProblem(history);
              }}
            >
              Run
            </Button>
          </Grid>
          <Grid>
            <Button variant="outlined" color="primary" onClick={submit}>
              Submit
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );

  /*  return (

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
              <ProblemData questionData={problem} />
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
  ); */
}

function mapStateToProps(state, ownProps) {
  return {
    slug: ownProps.match.params.slug && ownProps.match.params.slug.trim()
  };
}

export default connect(mapStateToProps)(codePage);
