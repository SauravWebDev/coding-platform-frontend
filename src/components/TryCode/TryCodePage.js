import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import SingleSelect from "../common/SingleSelect";

import "./TryCodePage.scss";

import Button from "../common/Button";
import ProblemData from "./ProblemData";
import Editor from "../Editor/JSEditor";

import { validString } from "../../util/util";
import { DEFAULT_PROB_DATA, DEFAULT_INPUT } from "./Constant";
// API //
import { tryCode } from "../../api/problemsApi";
import { run as submissionRun } from "../../api/submissionApi";

function TryCodePage({ slug, DEFAULT_PROB_DATA, DEFAULT_INPUT }) {
  const [problem, setProblem] = useState(DEFAULT_PROB_DATA);
  const [defaultInput, setDefaultInput] = useState(DEFAULT_INPUT);

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
    body.default_input = defaultInput;
    body.problem_id = problem.id;
    submissionRun(body)
      .then((data) => {
        if (data.error) {
          alert(data.error);
        } else {
          alert(data);
        }
      })
      .catch((e) => {
        alert(e);
      });
  };

  const onChange = (event) => {
    const { value } = event.target;
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
              selectedValue={String(problem.selectedLanguage)}
              inputItems={problem.language}
              onChange={onChange}
            />
            <span style={{ float: "right" }}>
              <Button className="codeButtons" onClick={run}>
                Run
              </Button>
            </span>
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
  DEFAULT_INPUT: PropTypes.array.isRequired,
};

export default connect(mapStateToProps)(TryCodePage);
