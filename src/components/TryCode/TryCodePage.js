import React, { useState, useEffect, useCallback } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import SingleSelect from "../common/SingleSelect";

import "./TryCodePage.scss";
import Chip from "@material-ui/core/Chip";

import ProblemData from "./ProblemData";
import Editor from "../Editor/JSEditor";
import PublishIcon from "@material-ui/icons/Publish";
import { DEFAULT_PROB_DATA, DEFAULT_INPUT } from "./Constant";
// API //
import { tryCode } from "../../api/problemsApi";
import { run as submissionRun, checkStatus } from "../../api/submissionApi";
import { toast } from "react-toastify";
import { debounceFn, validString } from "../../util/util";
import Avatar from "@material-ui/core/Avatar";
import DoneAllIcon from "@material-ui/icons/DoneAll";
const delay = 4000;
function TryCodePage({ slug, DEFAULT_PROB_DATA, DEFAULT_INPUT }) {
  const [problem, setProblem] = useState(DEFAULT_PROB_DATA);
  const [defaultInput, setDefaultInput] = useState(DEFAULT_INPUT);
  const [checkRes, setCheckRes] = useState(false);
  const [submissionId, setSubmissionId] = useState(null);
  const [result, setResult] = useState({});

  const getResult = function () {
    if (checkRes) {
      setCheckRes(false);
      checkStatus(submissionId)
        .then((res) => {
          if (res.error) {
            toast.error("something went wrong");
          } else if (res.status == 1) {
            toast.success("Code executed");
            setResult(() => {
              return { ...res };
            });
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
        setCheckRes(false);
        alert(e);
      });
  };

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
      <div className="codeSetupPage">
        <div className="questionDetailsScreen">
          <ProblemData questionData={problem} />
        </div>
        <div className="codeEditorScreen">
          <div className="fileNameDiv">
            <SingleSelect
              labelName="Language"
              selectedValue={String(problem.selectedLanguage || "")}
              inputItems={problem.language}
              onChange={onChange}
            />
          </div>

          <div className="code-template" key={"code_body"}>
            <div className="code-label"> Code Body</div>
            <div className="code-editor">
              <Editor
                codeData={problem.selectedCode}
                onCodeChange={(data) => {
                  codeChange(data);
                }}
              />
            </div>
          </div>
          <div style={{ display: "flex", backgroundColor: "#fafafa" }}>
            <div>
              <div> Test Case : </div>
              <textarea
                style={{
                  height: "100px",
                  width: "300px",
                  border: "1px solid #ddd",
                }}
                name="defaultInput"
                value={defaultInput}
                rows="5"
                onChange={onChange}
              ></textarea>
            </div>
            <div style={{ marginTop: "10%", marginLeft: "10%" }}>
              <span style={{ padding: "10px" }}>
                <Chip
                  avatar={
                    <Avatar>
                      <DoneAllIcon />
                    </Avatar>
                  }
                  onClick={run}
                  label={"Run Code"}
                  color="primary"
                />
              </span>
              <span style={{ padding: "10px" }}>
                <Chip
                  avatar={
                    <Avatar>
                      <PublishIcon />
                    </Avatar>
                  }
                  onClick={run}
                  label={"Submit Code"}
                  color="primary"
                />
              </span>
            </div>
          </div>
          <div>
            <div className="consoleOutput">
              <div style={{ width: "75%" }}>
                <div className="code-label"> Console</div>
                <div className="console">
                  {result.codeError && (
                    <div
                      dangerouslySetInnerHTML={{
                        __html: result.codeError.replace(/\n/g, "</br>"),
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
              <div style={{ width: "25%" }}>
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
        </div>
      </div>
    </div>
  );
}

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
