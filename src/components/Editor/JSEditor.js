import React from "react";
import { Controlled as CodeMirror } from "react-codemirror2";
import PropTypes from "prop-types";

import config from "./JSConfig.js";

import "codemirror/mode/javascript/javascript";
import "codemirror/keymap/sublime";
import "codemirror/addon/edit/closetag";
import "codemirror/addon/edit/closebrackets";
import "codemirror/addon/edit/matchtags";
import "codemirror/addon/fold/foldcode";

import "codemirror/lib/codemirror.css";
import "codemirror/theme/eclipse.css";
import "codemirror/theme/neat.css";
import "codemirror/addon/fold/foldgutter.css";

export default function Editor({ codeData, onCodeChange }) {
  return (
    <CodeMirror
      value={codeData}
      options={config}
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
