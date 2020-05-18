import React from "react";
import PropTypes from "prop-types";

import {
  FormControl,
  Select,
  Checkbox,
  InputLabel,
  MenuItem,
  ListItemText,
  Input,
} from "@material-ui/core";

export default function MultiSelect({
  labelName,
  selectedItem,
  inputItems,
  onChange,
}) {
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };
  return (
    <>
      <FormControl style={{ width: "100%" }}>
        <InputLabel id="demo-mutiple-checkbox-label">{labelName}</InputLabel>
        <Select
          labelId="tag"
          id="tag"
          name={labelName}
          multiple
          value={selectedItem}
          onChange={onChange}
          input={<Input />}
          renderValue={(selected) => {
            let val = selected.map((item) => inputItems[item]);
            return val.join(", ");
          }}
          MenuProps={MenuProps}
        >
          {Object.keys(inputItems).map((id) => {
            return (
              <MenuItem key={id} value={id}>
                <Checkbox checked={selectedItem.indexOf(id) > -1} />
                <ListItemText primary={inputItems[id]} />
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </>
  );
}

MultiSelect.propTypes = {
  labelName: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  selectedItem: PropTypes.array.isRequired,
  inputItems: PropTypes.object.isRequired,
};
