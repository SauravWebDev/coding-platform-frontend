import React from "react";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import Button from "../common/Button";
import "./Problem.scss";
export default function Problem({ problem }) {
  return (
    <div className="problem">
      <div>
        <h4>{problem.title}</h4>
      </div>
      <div>
        <span>
          <NavLink to={"/problem/" + problem.slug}>
            <Button>Solve</Button>
          </NavLink>
        </span>

        <span className="margin-left-10px">
          <NavLink to={"/problem/createUpdate/" + problem.slug}>
            <Button>update</Button>
          </NavLink>
        </span>
      </div>
    </div>
  );
}

Problem.propTypes = {
  problem: PropTypes.object.isRequired,
};
