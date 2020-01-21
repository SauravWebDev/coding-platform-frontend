import React, { useState } from "react";
import { Controlled as CodeMirror } from "react-codemirror2";
import PropTypes from "prop-types";

require("codemirror/lib/codemirror.css");
require("codemirror/theme/material.css");
require("codemirror/theme/neat.css");
require("codemirror/mode/xml/xml.js");
require("codemirror/mode/javascript/javascript.js");

function Editor({ value, mode, theme }) {
  const [Codevalue, setValue] = useState(value);
  return (
    <CodeMirror
      value={Codevalue}
      options={{
        mode: mode,
        theme: theme,
        lineNumbers: true
      }}
      onBeforeChange={(editor, data, value) => {
        setValue({ Codevalue: value });
      }}
      onChange={(editor, data, value) => {
        //this.setState({ codeValue: value });
      }}
    />
  );
}
Editor.propTypes = {
  value: PropTypes.string.isRequired,
  mode: PropTypes.string.isRequired,
  theme: PropTypes.string.isRequired
};
export default Editor;
