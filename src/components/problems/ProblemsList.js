import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import "./ProblemList.scss";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import { NavLink } from "react-router-dom";
import Chip from "@material-ui/core/Chip";
import TablePagination from "@material-ui/core/TablePagination";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const List = ({ problems, filters }) => {
  const classes = useStyles();
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [page, setPage] = React.useState(0);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const start = rowsPerPage * page;
  const end = start + rowsPerPage;
  return (
    <div className="problemList">
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell align="left">Title</TableCell>
              <TableCell align="left">Difficulty</TableCell>
              <TableCell align="left">Action</TableCell>
              <TableCell align="left">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.keys(problems)
              .slice(start, end)
              .map((index) => (
                <TableRow key={problems[index].id}>
                  <TableCell component="th" scope="row">
                    {problems[index].id}
                  </TableCell>
                  <TableCell align="left">{problems[index].title}</TableCell>
                  <TableCell align="left">
                    <Chip
                      label={filters.difficulty[problems[index].difficulty]}
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell align="left" style={{ padding: "5px" }}>
                    <NavLink to={"/problem/" + problems[index].slug}>
                      Solve
                    </NavLink>
                    |
                    <NavLink
                      to={"/problem/createUpdate/" + problems[index].slug}
                    >
                      Update
                    </NavLink>
                  </TableCell>
                  <TableCell
                    align="left"
                    style={{
                      color: problems[index].status == 0 ? "Red" : undefined,
                    }}
                  >
                    {problems[index].status == 0 ? "InActive" : "Active"}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={Object.keys(problems).length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </div>
  );
};

List.propTypes = {
  problems: PropTypes.object.isRequired,
  filters: PropTypes.object.isRequired,
};
function mapStateToProps(state) {
  return {
    problems: state.problems,
    filters: state.filters,
  };
}

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(List);
