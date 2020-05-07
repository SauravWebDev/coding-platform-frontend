import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import SingleSelect from "../common/SingleSelect";
import Button from "../common/Button";
import "./CodeSetupPage.scss";

import Editor from "../Editor/JSEditor";

function CodeSetupPage({
  problem,
  onChangeCodeSetupLang,
  saveSourceCode,
  codeChange,
}) {
  return (
    <div>
      <div className="CodeSetupPage">
      <form onSubmit={saveSourceCode}>

        <div className="codeEditorScreen">
          <div className="fileNameDiv">
            <SingleSelect
              labelName="Language"
              autoFocus={true}
              selectedValue={String(problem.selectedLanguage)}
              inputItems={problem.language}
              onChange={onChangeCodeSetupLang}
            />
            <span style={{ float: "right" }}>
              <Button className="codeButtons"type="submit">
                Save
              </Button>
            </span>
          </div>
          <div className="code-template" key={"code_head"}>
            <div className="code-label"> Code Head</div>
            <div className="code-editor">
              <Editor
              language={problem.language[problem.selectedLanguage]}
                codeData={problem.selectedCode.code_head}
                onCodeChange={(data) => {
                  codeChange("code_head", data);
                }}
              />
            </div>
          </div>

          <div className="code-template" key={"code_body"}>
            <div className="code-label"> Code Body</div>
            <div className="code-editor">
              <Editor
              language={problem.language[problem.selectedLanguage]}
                codeData={problem.selectedCode.code_body}
                onCodeChange={(data) => {
                  codeChange("code_body", data);
                }}
              />
            </div>
          </div>
          <div className="code-template" key={"code_tail"}>
            <div className="code-label"> Code Tail</div>
            <div className="code-editor">
              <Editor
              language={problem.language[problem.selectedLanguage]}
                codeData={problem.selectedCode.code_tail}
                onCodeChange={(data) => {
                  codeChange("code_tail", data);
                }}
              />
            </div>
          </div>
        </div>
        </form> </div>
      
    </div>
  );
}

function mapStateToProps() {
  return {};
}

CodeSetupPage.propTypes = {
  problem: PropTypes.object.isRequired,
  onChangeCodeSetupLang: PropTypes.func.isRequired,
  saveSourceCode: PropTypes.func.isRequired,
  codeChange: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(CodeSetupPage);
