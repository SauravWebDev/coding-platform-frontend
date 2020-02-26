import React from "react";
import { Button as MuiButton } from "@material-ui/core";
import PropTypes from "prop-types";

export default function Button({ ...props }) {
  return (
    <MuiButton
      type={props.type}
      variant="outlined"
      color="primary"
      className={props.className}
      onClick={props.onClick}
    >
      {props.children}
    </MuiButton>
  );
}

Button.propTypes = {
  type: PropTypes.string
};
