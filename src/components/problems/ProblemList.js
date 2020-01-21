import React from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography
} from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  table: {},
  tableHead: {
    fontWeight: "bold"
  }
});

const ProblemList = ({ problems }) => {
  const classes = useStyles();
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table}>
        <TableHead className={classes.tableHead}>
          <TableRow>
            <TableCell>
              <Typography className={classes.tableHead}>#</Typography>
            </TableCell>
            <TableCell>
              <Typography className={classes.tableHead}>
                Interview Questions
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {problems.map(problem => (
            <TableRow key={problem.id}>
              <TableCell scope="row">
                <Typography>{problem.id}</Typography>
              </TableCell>
              <TableCell scope="row">
                <NavLink to={"/problem/" + problem.id}>
                  <Typography>{problem.title}</Typography>
                </NavLink>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

ProblemList.propTypes = {
  problems: PropTypes.array.isRequired
};

export default ProblemList;
