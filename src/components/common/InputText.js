import React from "react";
import TextField from "@material-ui/core/TextField";
import PropTypes from "prop-types";

const InputText = ({
  id,
  label,
  name,
  autoComplete,
  required,
  error,
  onChange,
  type,
  autoFocus,
  multiline,
  rows,
  value
}) => {
  let errStatus = error ? true : false;
  return (
    <>
      <TextField
        error={errStatus}
        variant="outlined"
        margin="normal"
        required={required}
        rows={rows}
        multiline={multiline}
        fullWidth
        id={id}
        label={label}
        name={name}
        type={type}
        autoComplete={autoComplete}
        autoFocus={autoFocus}
        onChange={onChange}
        value={value}
      />
      {error && (
        <span style={{ color: "red" }}>
          <h6>{error}</h6>
        </span>
      )}
    </>
  );
};

InputText.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
  autoComplete: PropTypes.string,
  required: PropTypes.bool,
  type: PropTypes.string.isRequired,
  autoFocus: PropTypes.bool,
  rows: PropTypes.number,
  multiline: PropTypes.bool
};

export default InputText;
