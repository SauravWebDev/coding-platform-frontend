import React from "react";
import { NavLink } from "react-router-dom";

export default function Problem({ problem }) {
  return (
    <div>
      <div style={{ float: "left" }}>
        <span className="probTitle">
          <h4>{problem.title}</h4>
        </span>
        <p>{problem.description}</p>
      </div>
      <div style={{ float: "right" }}>
        <div style={{ position: "relative", top: "10px" }}>
          <NavLink to="./"> Solve </NavLink>
        </div>
        <div style={{ position: "relative", top: "20px" }}>
          <NavLink to={"/problem/setupCode/" + problem.title}>
            code setup
          </NavLink>
        </div>
        <div style={{ position: "relative", top: "30px" }}>
          <NavLink to={"/problem/createUpdate/" + problem.title}>
            update
          </NavLink>
        </div>
      </div>
    </div>
  );
}
