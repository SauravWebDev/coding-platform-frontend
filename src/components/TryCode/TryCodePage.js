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
import { getAllProblems } from "../../redux/actions/problemsAction";

import * as filtersAction from "../../redux/actions/filtersAction";

import {
  run as submissionRun,
  submit as submissionSubmit,
  checkStatus,
} from "../../api/submissionApi";
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
//theme dropdwon
const editorThemes = {
  eclipse: "eclipse",
  light: "light",
  dark: "yonce",
  neat: "neat",
};
//font dropdwon
const font = {
  12: "12",
  13: "13",
  14: "14",
  15: "15",
  16: "16",
};
function TryCodePage({ slug, DEFAULT_PROB_DATA, DEFAULT_INPUT, ...props }) {
  const [problem, setProblem] = useState(DEFAULT_PROB_DATA);
  const [defaultInput, setDefaultInput] = useState(DEFAULT_INPUT);
  const [checkRes, setCheckRes] = useState(false);
  const [submissionId, setSubmissionId] = useState(null);
  const [result, setResult] = useState({});
  const [apiInprogress, setApiInprogress] = useState(false);
  const [consoleIndex, setConsoleIndex] = useState(0);
  const [selectedTheme, setSelectedTheme] = useState(
    localStorage.getItem("THEME") || editorThemes.eclipse
  );
  const [fontSize, setFontSize] = useState(
    font[localStorage.getItem("FONT_SIZE") || 14]
  );

  const handleChange = (event, newValue) => {
    setConsoleIndex(newValue);
  };

  const handleChangeIndex = (index) => {
    setConsoleIndex(index);
  };
  let selectedQuestionIndex = null;
  props.problems.forEach((prob, index) => {
    if (prob.id == problem.id) {
      selectedQuestionIndex = index;
      return;
    }
  });
  const changeProblem = (dir) => {
    if (dir == "prev") {
      props.history.push(
        "/problem/" + props.problems[selectedQuestionIndex - 1].slug
      );
    }
    if (dir == "next") {
      props.history.push(
        "/problem/" + props.problems[selectedQuestionIndex + 1].slug
      );
    }
  };
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
    let length = props.problems.length;
    if (length === 0) {
      props.loadProblems().catch(() => toast.error("something went wrong"));
    }
    let filters = props.filters;
    if (
      Object.keys(filters.difficulty).length === 0 &&
      Object.keys(filters.tag).length === 0
    ) {
      props.loadFilters().catch(() => toast.error("something went wrong"));
    }
  }, []);

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
            let preferrredLang = localStorage.getItem("LANGUAGE");
            let selectedLanguage = lang[preferrredLang]
              ? preferrredLang
              : data.language[0].id;

            let selectedCode = sourceCode[selectedLanguage];
            try {
              let userPrevCode = localStorage.getItem(data.slug);
              userPrevCode = JSON.parse(userPrevCode);
              if (userPrevCode && userPrevCode[selectedLanguage]) {
                selectedCode = userPrevCode[selectedLanguage];
              }
            } catch (err) {
              localStorage.setItem(data.slug, "{}");
            }
            setDefaultInput(data.default_input);
            let problemData = {
              id: data.id,
              slug: data.slug,
              title: data.title,
              description: data.description,
              example: data.example,
              note: data.note,
              difficulty: data.difficulty,
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
    updateLocalStrage("code", value);
  };
  function updateLocalStrage(key, value) {
    if (key == "code") {
      let localStorageValue = localStorage.getItem(problem.slug) || "{}";
      try {
        localStorageValue = JSON.parse(localStorageValue);
      } catch (e) {
        localStorageValue = {};
      }
      localStorageValue[problem.selectedLanguage] = value;
      localStorage.setItem(problem.slug, JSON.stringify(localStorageValue));
      return;
    }
    if (key == "FONT_SIZE") {
      localStorage.setItem("FONT_SIZE", value);
      return;
    }
    if (key == "THEME") {
      localStorage.setItem("THEME", value);
      return;
    }
    if (key == "LANGUAGE") {
      localStorage.setItem("LANGUAGE", value);
      return;
    }
  }

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
  };
  const onChange = (event) => {
    const { name, value } = event.target;
    if (name == "defaultInput") {
      setDefaultInput(value);
      return;
    }
    if (name == "theme") {
      setSelectedTheme(value);
      updateLocalStrage("THEME", value);
      return;
    }
    if (name == "fontSize") {
      setFontSize(value);
      updateLocalStrage("FONT_SIZE", value);
      return;
    }
    if (name == "lang") {
      setProblem((prev) => {
        prev.sourceCode[prev.selectedLanguage] = prev.selectedCode;
        prev.selectedLanguage = value;

        prev.selectedCode = prev.sourceCode[value];
        let userPrevCode = localStorage.getItem(problem.slug);
        try {
          userPrevCode = JSON.parse(userPrevCode);
          if (userPrevCode[prev.selectedLanguage])
            prev.selectedCode = userPrevCode[prev.selectedLanguage];
        } catch (e) {
          localStorage.setItem(problem.slug, "{}");
        }
        return { ...prev };
      });
      updateLocalStrage("LANGUAGE", value);
    }
  };

  const classes = useStyles();
  const theme = useTheme();
  return (
    <div>
      <div className="try-code-page">
        <ResizePanel direction="e" style={{ flexGrow: "1" }}>
          <div className="questionDetailsScreen scrollStyle">
            <ProblemData
              questionData={problem}
              problems={props.problems}
              selectedQuestionIndex={selectedQuestionIndex}
              changeProblem={changeProblem}
              difficulty={props.filters.difficulty}
            />
          </div>
        </ResizePanel>
        <div className="codeEditorScreen">
          <div className="selectionPanel">
            <div className="selectionDropdowns">
              <SingleSelect
                labelName="Language"
                name="lang"
                selectedValue={String(problem.selectedLanguage || "")}
                inputItems={problem.language}
                onChange={onChange}
              />
            </div>
            <div className="selectionDropdowns">
              <SingleSelect
                labelName="Font Size"
                name="fontSize"
                selectedValue={fontSize}
                inputItems={font}
                onChange={onChange}
              />
            </div>
            <div className="selectionDropdowns">
              <SingleSelect
                labelName="Theme"
                name="theme"
                inputItems={editorThemes}
                selectedValue={selectedTheme}
                onChange={onChange}
              />
            </div>
          </div>

          <div className="code-template" key={"code_body"}>
            <div className="code-editor" style={{ fontSize: fontSize + "px" }}>
              <Editor
                language={
                  (problem &&
                    problem.language &&
                    problem.language[problem.selectedLanguage]) ||
                  ""
                }
                theme={selectedTheme}
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
                  value={consoleIndex}
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
                index={consoleIndex}
                onChangeIndex={handleChangeIndex}
              >
                <TabPanel value={consoleIndex} index={0} dir={theme.direction}>
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
                <TabPanel value={consoleIndex} index={1} dir={theme.direction}>
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

function mapStateToProps(state, ownProps) {
  return {
    slug:
      (ownProps.match.params.slug && ownProps.match.params.slug.trim()) || "",
    DEFAULT_PROB_DATA,
    DEFAULT_INPUT,
    problems: state.problems,
    filters: state.filters,
    history: ownProps.history,
  };
}
const mapDispatchToProps = {
  loadProblems: getAllProblems,
  loadFilters: filtersAction.getFilters,
};

TryCodePage.propTypes = {
  slug: PropTypes.string.isRequired,
  DEFAULT_PROB_DATA: PropTypes.object.isRequired,
  DEFAULT_INPUT: PropTypes.string.isRequired,
  loadProblems: PropTypes.func.isRequired,
  loadFilters: PropTypes.func.isRequired,
  problems: PropTypes.array.isRequired,
  filters: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(TryCodePage);
