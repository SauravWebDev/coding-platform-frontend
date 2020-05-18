import React from "react";
import { Controlled as CodeMirror } from "react-codemirror2";
import PropTypes from "prop-types";

import config from "./JSConfig.js";

import "codemirror/mode/clike/clike";
import "codemirror/mode/python/python";
import "codemirror/mode/javascript/javascript";

import "codemirror/keymap/sublime";
import "codemirror/addon/edit/closetag";
import "codemirror/addon/edit/closebrackets";
import "codemirror/addon/edit/matchtags";
import "codemirror/addon/fold/foldcode";
import "codemirror/addon/fold/foldgutter";

import "codemirror/lib/codemirror.css";
import "codemirror/theme/eclipse.css";
import "codemirror/theme/twilight.css";
import "codemirror/theme/base16-light.css";

import "codemirror/theme/neat.css";
import "codemirror/addon/fold/foldgutter.css";

const mapLangToMode = {
  js: "text/javascript",
  java: "text/x-java",
  c: "text/x-csrc",
  "c ++": "text/x-c++src",
  "c#": "text/x-csharp",
  python: "text/x-python",
};
const themes = {
  eclipse: "eclipse",
  light: "base16-light",
  dark: "twilight",
  neat: "neat",
};
export default function Editor({ codeData, onCodeChange, ...props }) {
  config.mode = mapLangToMode[props.language] || mapLangToMode.js;
  config.theme = (props.theme && themes[props.theme]) || themes.eclipse;
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
  onCodeChange: PropTypes.func.isRequired,
  language: PropTypes.string.isRequired,
  theme: PropTypes.string,
};
