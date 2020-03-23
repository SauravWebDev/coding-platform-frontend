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
        <p>{problem.description}</p>
      </div>
      <div>
        <span>
          <NavLink to="./">
            <Button>Solve</Button>
          </NavLink>
        </span>
        <span className="margin-left-10px ">
          <NavLink to={"/problem/setupCode/" + problem.slug}>
            <Button>code setup</Button>
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
  problem: PropTypes.object.isRequired
};
