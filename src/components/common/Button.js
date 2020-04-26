import React from "react";
import { Button as MuiButton } from "@material-ui/core";
import PropTypes from "prop-types";

export default function Button({ ...props }) {
  return (
    <MuiButton
      type={props.type}
      variant="contained"
      color="primary"
      disabled={props.disabled}
      className={props.className}
      onClick={props.onClick}
    >
      {props.children}
    </MuiButton>
  );
}

Button.propTypes = {
  type: PropTypes.string,
};
