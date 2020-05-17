import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import PropTypes from "prop-types";

export default function ConfirmBox({ ...props }) {
  return (
    <div>
      <Dialog
        open={props.open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{props.title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {props.content}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.clickCancel} color="primary">
            {props.calcelLabel}
          </Button>
          <Button onClick={props.clickOk} color="primary" autoFocus>
            {props.okLabel}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

ConfirmBox.propTypes = {
  open: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  calcelLabel: PropTypes.string.isRequired,
  okLabel: PropTypes.string.isRequired,
  clickOk: PropTypes.func.isRequired,
  clickCancel: PropTypes.func.isRequired,
};
