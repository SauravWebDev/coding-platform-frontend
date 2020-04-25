import React from "react";
import PropTypes from "prop-types";

import MultiSelect from "../common/MultiSelect";
import "./Filters.scss";
export default function Filters({
  filters,
  selectedTag,
  selectedDifficulty,
  handleChange,
}) {
  return (
    <div className="filters">
      <div>
        <MultiSelect
          labelName={"Difficulty"}
          selectedItem={selectedDifficulty}
          inputItems={filters.difficulty}
          onChange={handleChange}
        />
      </div>
      <div>
        <MultiSelect
          labelName={"Tags"}
          selectedItem={selectedTag}
          inputItems={filters.tag}
          onChange={handleChange}
        />
      </div>
    </div>
  );
}

Filters.propTypes = {
  filters: PropTypes.object,
  selectedTag: PropTypes.array,
  selectedDifficulty: PropTypes.array,
  handleChange: PropTypes.func,
};
