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

const useStyles = makeStyles(theme => ({
  table: {
    spacing: 2,
    padding: theme.spacing(2)
  },
  tableHead: {
    fontWeight: "bold"
  }
}));

const ProblemList = ({ problems }) => {
  const classes = useStyles();
  return (
    <TableContainer>
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
            <TableCell>
              <Typography className={classes.tableHead}>Actions</Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.keys(problems).map(index => (
            <TableRow key={problems[index].id}>
              <TableCell scope="row">
                <Typography>{problems[index].id}</Typography>
              </TableCell>
              <TableCell scope="row">
                <NavLink to={"/problem/" + problems[index].id}>
                  <Typography>{problems[index].title}</Typography>
                </NavLink>
              </TableCell>
              <TableCell scope="row">
                <NavLink to={"/problem/createUpdate/" + problems[index].id}>
                  <Typography>Update</Typography>
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
  problems: PropTypes.object.isRequired
};

export default ProblemList;
