import React from "react";
import { Controlled as CodeMirror } from "react-codemirror2";
import PropTypes from "prop-types";

import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import "codemirror/theme/neat.css";
import "codemirror/mode/javascript/javascript";
import "codemirror/keymap/sublime";
import "codemirror/addon/edit/closetag";
import "codemirror/addon/edit/closebrackets";
import "codemirror/addon/edit/matchtags";
import "codemirror/addon/fold/foldgutter.css";
import "codemirror/addon/fold/foldcode";

function Editor({ codeData, onCodeChange }) {
  return (
    <CodeMirror
      value={codeData}
      options={{
        mode: "javascript",
        theme: "material",
        lineNumbers: true,
        keyMap: "sublime",
        tyleActiveLine: true,
        matchBrackets: true,
        indentUnit: 4,
        lineWrapping: true,
        indentWithTabs: true,
        autofocus: true,
        autoCloseTags: true,
        autoCloseBrackets: true,
        matchTags: true,
        showTrailingSpace: true,
        foldGutter: true,
        gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"]
      }}
      onBeforeChange={(editor, data, value) => {
        onCodeChange(value);
      }}
      onChange={() => {}}
    />
  );
}
Editor.propTypes = {
  codeData: PropTypes.string.isRequired,
  onCodeChange: PropTypes.func.isRequired
};
export default Editor;
