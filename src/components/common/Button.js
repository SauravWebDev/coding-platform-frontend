import React from "react";
import { Button as MuiButton } from "@material-ui/core";
export default function Button(props) {
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
