import React, { useState, useEffect, useCallback } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import "./codePage.scss";

import Button from "../common/Button";
import ProblemData from "./ProblemData";
import Editor from "../Editor/JSEditor";

import { validString, debouceFn } from "../../util/util";

// API //
import {
  getProblemByIdOrTitle,
  getSourceCode,
  saveFileData
} from "../../api/problemsApi";

function codePage({ slug, emptyProblemData, fileNames, initialCodeValue }) {
  const [problem, setProblem] = useState(emptyProblemData);
  const [selectedLang, setSelectedLang] = useState(null);
  const saveToLocalStorage = (problem, fileName, codeValue) => {
    let keyName = `admin_${problem.id}_${fileName}`;
    localStorage.setItem(keyName, codeValue);
  };

  const debouceOnChange = useCallback(debouceFn(saveToLocalStorage, 1000), []);
  const [codeData, setCodeData] = useState(initialCodeValue);

  const [activeFile, setActiveFile] = useState(fileNames[0]);

  useEffect(() => {
    if (validString(slug)) {
      getProblemByIdOrTitle(slug)
        .then(data => {
          if (data.error) {
            alert(data.error);
          } else {
            let problemData = {
              id: data.id,
              title: data.title,
              examples: data.example,
              description: data.description
            };
            setProblem(problemData);
            /*  setCodeData({
              user_file: data.user_file,
              main_file: data.main_file,
              input_output_file: data.input_output_file
            }); */
          }
        })
        .catch(e => {
          alert(e);
        });
      getSourceCode(slug)
        .then(data => {
          if (data.error) {
            alert(data.error);
          } else {
            setCodeData({
              exposed_file: (data.length > 0 && data[0].exposed_file) || "",
              main_file: (data.length > 0 && data[0].main_file) || "",
              solution_file: (data.length > 0 && data[0].solution_file) || ""
            });
            setSelectedLang((data.length > 0 && data[0].lang_id) || 1);
          }
        })
        .catch(e => {
          alert(e);
        });
    }
  }, [slug]);

  const codeChangeLogicFile = (fileName, value) => {
    setCodeData(prev => ({ ...prev, [fileName]: value }));
    debouceOnChange(problem, fileName, value);
  };

  //const expensive = throttle();
  const save = () => {
    let body = {
      problem_id: problem.id,
      exposed_file: codeData.exposed_file,
      main_file: codeData.main_file,
      solution_file: codeData.solution_file,
      lang_id: selectedLang
    };
    saveFileData(body)
      .then(data => {
        if (data.error) {
          alert(data.error);
        } else {
          alert(data.msg);
        }
      })
      .catch(e => {
        alert(e);
      });
  };

  const submit = () => {};

  const showEditor = (evt, header) => {
    setActiveFile(header);
  };

  return (
    <div className="codeSetupPage">
      <div className="questionDetailsScreen">
        <ProblemData questionData={problem} />
      </div>
      <div className="codeEditorScreen">
        <div className="fileNameDiv">
          {fileNames.map(fileName => (
            <Button
              key={"div_tab_button_" + fileName}
              className={
                activeFile == fileName
                  ? "backgroundGrey codeButtons"
                  : "codeButtons"
              }
              onClick={event => showEditor(event, fileName)}
            >
              {fileName}
            </Button>
          ))}
          <span style={{ float: "right" }}>
            <Button className="codeButtons" onClick={save}>
              Save
            </Button>
            <Button className="codeButtons">Run</Button>
            <Button className="codeButtons" onClick={submit}>
              Submit
            </Button>
          </span>
        </div>
        {fileNames.map(fileName => {
          let classEditor = activeFile == fileName ? undefined : "displayNone";
          return (
            <div key={"div_tab_editor_" + fileName} className={classEditor}>
              <Editor
                codeData={codeData[fileName]}
                onCodeChange={data => {
                  codeChangeLogicFile(fileName, data);
                }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

const emptyProblemData = {
  id: null,
  title: "",
  description: "",
  examples: [{ input: "", output: "", explaination: "" }]
};

const fileNames = ["exposed_file", "main_file", "solution_file"];

const initialCodeValue = {
  [fileNames[0]]: "// logic here",
  [fileNames[1]]: "// wrapper here",
  [fileNames[2]]: "// test cases here "
};

function mapStateToProps(state, ownProps) {
  return {
    slug:
      (ownProps.match.params.slug && ownProps.match.params.slug.trim()) || "",
    emptyProblemData,
    fileNames,
    initialCodeValue
  };
}

codePage.propTypes = {
  slug: PropTypes.string.isRequired,
  emptyProblemData: PropTypes.object.isRequired,
  fileNames: PropTypes.array.isRequired,
  initialCodeValue: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(codePage);
