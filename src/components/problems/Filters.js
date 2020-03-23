import React from "react";
import PropTypes from "prop-types";

export default function Filters({ filters }) {
  return (
    <>
      <div className="filter-group">
        <h2>Difficulty</h2>
        {filters.difficulty.map(data => {
          return (
            <div key={data.id}>
              <input type="checkbox" />
              <label> {data.value}</label>
              <br />
            </div>
          );
        })}
      </div>
      <div className="filter-group">
        <h2>Tags</h2>
        {filters.tag.map(data => {
          return (
            <div key={data.id}>
              <input type="checkbox" />
              <label> {data.value}</label>
              <br />
            </div>
          );
        })}
      </div>
    </>
  );
}

Filters.propTypes = {
  filters: PropTypes.object
};
