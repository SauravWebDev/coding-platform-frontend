import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import ProblemData from "./ProblemData";
import "./codePage.css";
import Editor from "./Editor";

// Material UI Componenets
import {
  CssBaseline,
  Grid,
  Typography,
  Container,
  AppBar,
  Tabs,
  Tab,
  Box
} from "@material-ui/core";

import { validString } from "../../util/util";
import Button from "../common/Button";
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

  const headers = ["User File", "Wrapper File", "Input Output file"];

  const [codeData, setCodeData] = useState({
    "User File": "// logic here",
    "Wrapper File": "// wrapper here",
    "Input Output file": "// test cases here "
  });

  let [activeTab, setActiveTab] = useState(headers[0]);

  const codeChangeLogicFile = (header, value) => {
    setCodeData(prev => ({ ...prev, [header]: value }));
  };

  const run = () => {
    alert();
  };

  const submit = () => {};

  const showEditor = (evt, header) => {
    setActiveTab(header);
  };

  return (
    <div className="setup_code_main-div">
      <div className="setup_code_main-div_q_details">
        <h4>Question Details</h4>
        <ProblemData questionData={problem} />
      </div>
      <div className="setup_code_main-div-tab">
        <div className="setup_code_main-div-tab-header">
          {headers.map(header => (
            <Button
              key={"div_tab_button_" + header}
              className={
                activeTab == header
                  ? "backgroundGrey setup_code_main-div-tab-button"
                  : "setup_code_main-div-tab-button"
              }
              onClick={event => showEditor(event, header)}
            >
              {header}
            </Button>
          ))}
          <span style={{ float: "right" }}>
            <Button className="setup_code_main-div-tab-button">Run</Button>
            <Button className="setup_code_main-div-tab-button">Submit</Button>
          </span>
        </div>
        {headers.map(header => (
          <div
            key={"div_tab_editor_" + header}
            className={activeTab == header ? "" : "displayNone"}
          >
            <Editor
              codeData={codeData[header]}
              onCodeChange={data => {
                codeChangeLogicFile(header, data);
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function mapStateToProps(state, ownProps) {
  return {
    slug: ownProps.match.params.slug && ownProps.match.params.slug.trim()
  };
}

export default connect(mapStateToProps)(codePage);
