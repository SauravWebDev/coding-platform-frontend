import React from "react";
import PropTypes from "prop-types";

import { FormControl, Select, InputLabel, MenuItem } from "@material-ui/core";

export default function SingleSelect({
  labelName,
  name,
  selectedValue,
  inputItems,
  autoFocus,
  onChange,
}) {
  return (
    <>
      <FormControl style={{ width: "100%" }}>
        <InputLabel id={labelName}>{labelName}</InputLabel>
        <Select
          labelId={labelName}
          name={name}
          id={labelName}
          value={selectedValue}
          autoFocus={autoFocus}
          onChange={onChange}
        >
          {Object.keys(inputItems).map((item) => (
            <MenuItem key={item} value={item}>
              {inputItems[item]}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
}

SingleSelect.propTypes = {
  labelName: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  selectedValue: PropTypes.string,
  inputItems: PropTypes.object.isRequired,
  autoFocus: PropTypes.bool,
  name: PropTypes.string,
};
