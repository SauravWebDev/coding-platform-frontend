import React, { useState, useEffect, useCallback } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import SingleSelect from "../common/SingleSelect";

import "./TryCodePage.scss";
import Button from "@material-ui/core/Button";

import ProblemData from "./ProblemData";
import Editor from "../Editor/JSEditor";
import { DEFAULT_PROB_DATA, DEFAULT_INPUT } from "./Constant";
// API //
import { tryCode } from "../../api/problemsApi";
import { run as submissionRun, submit as submissionSubmit, checkStatus } from "../../api/submissionApi";
import { toast } from "react-toastify";
import { debounceFn, validString } from "../../util/util";

//tabs
import SwipeableViews from "react-swipeable-views";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

import ResizePanel from "react-resize-panel";

const delay = 4000;
function TryCodePage({ slug, DEFAULT_PROB_DATA, DEFAULT_INPUT }) {
  const [problem, setProblem] = useState(DEFAULT_PROB_DATA);
  const [defaultInput, setDefaultInput] = useState(DEFAULT_INPUT);
  const [checkRes, setCheckRes] = useState(false);
  const [submissionId, setSubmissionId] = useState(null);
  const [result, setResult] = useState({});
  const [apiInprogress, setApiInprogress] = useState(false);

  //tabs
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };
  //tabs end

  //font dropdwon
const font=[12,13,14,15,16]

//theme dropdwon
const themes=['textmate','eclipse','blackboard','solarized dark']
  const getResult = function () {
    if (checkRes) {
      setCheckRes(false);
      checkStatus(submissionId)
        .then((res) => {
          if (res.error) {
            toast.error("something went wrong");
            setApiInprogress(false);
          } else if (res.status == 1) {
            toast.success("Code executed");
            setResult(() => {
              return { ...res };
            });
            setApiInprogress(false);
          } else {
            setCheckRes(true);
          }
        })
        .catch((e) => {
          console.log(e);
          toast.error("something went wrong");
        });
    }
  };

  const debounceOnChange = useCallback(debounceFn(getResult, delay), [
    checkRes,
  ]);

  useEffect(() => {
    if (validString(slug)) {
      tryCode(slug)
        .then((data) => {
          if (data.error) {
            alert(data.error);
          } else {
            let sourceCode = {};
            data.sourceCode.forEach((item) => {
              sourceCode[item.lang_id] = item.code;
            });
            let lang = {};

            for (let i in data.language) {
              lang[data.language[i].id] = data.language[i].value;
            }
            let selectedLanguage = data.language[0].id;
            let selectedCode = sourceCode[selectedLanguage];
            setDefaultInput(data.default_input);
            let problemData = {
              id: data.id,
              title: data.title,
              description: data.description,
              example: data.example,
              note: data.note,
              tag: data.tag,
              language: lang,
              selectedLanguage,
              sourceCode,
              selectedCode,
            };
            setProblem(problemData);
          }
        })
        .catch((e) => {
          alert(e);
        });
    }
  }, [slug]);

  if (submissionId && checkRes) {
    debounceOnChange();
  }
  const codeChange = (value) => {
    setProblem((prev) => {
      prev.selectedCode = value;
      return { ...prev };
    });
  };

  const run = () => {
    setApiInprogress(true);
    let body = {};
    body.lang_id = problem.selectedLanguage;
    body.code = problem.selectedCode;
    body.language = problem.language[problem.selectedLanguage];
    body.default_input = defaultInput.split("\n");
    body.problem_id = problem.id;

    submissionRun(body)
      .then((data) => {
        if (data.error) {
          toast.error(data.error);
        } else {
          toast.success("Execution in progress");
          setSubmissionId(data.submissionId);
          setCheckRes(true);
        }
      })
      .catch((e) => {
        toast.error("Something went wrong");
        console.log(e);
        setCheckRes(false);
        setApiInprogress(false);
      });
  };
  const submit = () => {
    setApiInprogress(true);
    let body = {};
    body.lang_id = problem.selectedLanguage;
    body.code = problem.selectedCode;
    body.language = problem.language[problem.selectedLanguage];
    body.default_input = defaultInput.split("\n");
    body.problem_id = problem.id;

    submissionSubmit(body)
      .then((data) => {
        if (data.error) {
          toast.error(data.error);
        } else {
          toast.success("Execution in progress");
          setSubmissionId(data.submissionId);
          setCheckRes(true);
        }
      })
      .catch((e) => {
        toast.error("Something went wrong");
        console.log(e);
        setCheckRes(false);
        setApiInprogress(false);
      });
  }
  const onChange = (event) => {
    const { name, value } = event.target;
    if (name == "defaultInput") {
      setDefaultInput(value);
      return;
    }
    setProblem((prev) => {
      prev.sourceCode[prev.selectedLanguage] = prev.selectedCode;
      prev.selectedLanguage = value;
      prev.selectedCode = prev.sourceCode[value];
      return { ...prev };
    });
  };

  return (
    <div>
      <div className="try-code-page">
        <ResizePanel direction="e" style={{ flexGrow: '1' }} >
          <div className="questionDetailsScreen scrollStyle">
            <ProblemData questionData={problem} />
          </div>
        </ResizePanel>
        <div className="codeEditorScreen">
          <div className="selectionPanel">
            <div className="selectionDropdowns">
            <SingleSelect          
              labelName="Language"
              selectedValue={String(problem.selectedLanguage || "")}
              inputItems={problem.language}
              onChange={onChange}
            />
            </div>
            <div className="selectionDropdowns">
            <SingleSelect
              labelName="Font Size"
              selectedValue={String(problem.selectedLanguage || "")}
              inputItems={font}
              onChange={onChange}
            />
            </div>
            <div className="selectionDropdowns">
            <SingleSelect           
              labelName="Theme"
              selectedValue={String(problem.selectedLanguage || "")}
              inputItems={themes}
              onChange={onChange}
            />
            </div>
          </div>

          <div className="code-template" key={"code_body"}>
            <div className="code-label"> Code Body</div>
            <div className="code-editor">
              <Editor
                language={
                  (problem &&
                    problem.language &&
                    problem.language[problem.selectedLanguage]) ||
                  ""
                }
                codeData={problem.selectedCode}
                onCodeChange={(data) => {
                  codeChange(data);
                }}
              />
            </div>
          </div>

          <div className="actionButton">
            <span className="runAlign">
              <Button
                size="small"
                variant="contained"
                color="primary"
                onClick={run}
                disabled={apiInprogress}
              >
                Run
             </Button>
            </span>
            <Button
              size="small"
              variant="contained"
              color="primary"
              onClick={submit}
              disabled={apiInprogress}
            >
              Submit
            </Button>
          </div>
          <br />
          <div style={{ display: "flex", backgroundColor: "#fafafa" }}>
            <div className={classes.root}>
              <AppBar position="static" color="default">
                <Tabs
                  value={value}
                  onChange={handleChange}
                  indicatorColor="primary"
                  textColor="primary"
                  variant="fullWidth"
                  aria-label="full width tabs example"
                >
                  <Tab label="Test Cases" {...a11yProps(0)} />
                  <Tab label="Code Run Result" {...a11yProps(1)} />
                </Tabs>
              </AppBar>
              <SwipeableViews
                axis={theme.direction === "rtl" ? "x-reverse" : "x"}
                index={value}
                onChangeIndex={handleChangeIndex}
              >
                <TabPanel value={value} index={0} dir={theme.direction}>
                  <div>
                    <div> Test Case : </div>
                    <textarea
                      style={{
                        height: "100px",
                        width: "100%",
                        border: "1px solid #ddd",
                      }}
                      name="defaultInput"
                      value={defaultInput}
                      rows="5"
                      onChange={onChange}
                    ></textarea>
                  </div>
                </TabPanel>
                <TabPanel value={value} index={1} dir={theme.direction}>
                  <div>
                    <div className="consoleOutput">
                      <div style={{ width: "50%" }}>
                        <div className="code-label"> Code Status</div>
                        <div className="resultConsole"></div>
                      </div>

                      <div style={{ width: "50%" }}>
                        <div className="code-label"> Expected Output</div>
                        <div className="resultConsole"></div>
                      </div>
                    </div>

                    <div className="consoleOutput">
                      <div style={{ width: "50%" }}>
                        <div className="code-label"> Console</div>
                        <div className="console">
                          {result.codeError && (
                            <div
                              dangerouslySetInnerHTML={{
                                __html: result.codeError.replace(
                                  /\n/g,
                                  "</br>"
                                ),
                              }}
                            />
                          )}
                          {result.stdout && (
                            <div
                              dangerouslySetInnerHTML={{
                                __html: result.stdout.replace(/\n/g, "</br>"),
                              }}
                            />
                          )}
                        </div>
                      </div>
                      <div style={{ width: "50%" }}>
                        <div className="code-label"> Your Output</div>
                        <div className="console">
                          {result.output && (
                            <div
                              dangerouslySetInnerHTML={{
                                __html: result.output.replace(/\n/g, "</br>"),
                              }}
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </TabPanel>
              </SwipeableViews>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

//tabs
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography component={"div"}>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: "100%",
  },
}));

//tabs end

function mapStateToProps(state, ownProps) {
  return {
    slug:
      (ownProps.match.params.slug && ownProps.match.params.slug.trim()) || "",
    DEFAULT_PROB_DATA,
    DEFAULT_INPUT,
  };
}

TryCodePage.propTypes = {
  slug: PropTypes.string.isRequired,
  DEFAULT_PROB_DATA: PropTypes.object.isRequired,
  DEFAULT_INPUT: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(TryCodePage);
