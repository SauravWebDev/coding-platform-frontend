import React from "react";
import PropTypes from "prop-types";

import { FormControl, Select, InputLabel, MenuItem } from "@material-ui/core";

export default function SingleSelect({
  labelName,
  selectedValue,
  inputItems,
  onChange
}) {
  return (
    <>
      <FormControl style={{ width: "100%" }}>
        <InputLabel id={labelName}>{labelName}</InputLabel>
        <Select
          labelId={labelName}
          name={labelName}
          id={labelName}
          value={selectedValue}
          onChange={onChange}
        >
          {Object.keys(inputItems).map(item => (
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
  inputItems: PropTypes.object.isRequired
};
