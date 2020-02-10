import React from "react";
import PropTypes from "prop-types";
import Problem from "./Problem";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  table: {
    spacing: 2,
    padding: theme.spacing(2)
  },
  tableHead: {
    fontWeight: "bold"
  }
}));

const List = ({ problems }) => {
  return (
    <div className="problemList">
      {Object.keys(problems).map(index => (
        <Problem key={problems[index].id} problem={problems[index]} />
      ))}
    </div>
  );
};

List.propTypes = {
  problems: PropTypes.object.isRequired
};

export default List;
