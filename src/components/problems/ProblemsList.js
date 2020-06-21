import React from "react";
import PropTypes from "prop-types";

import "./ProblemList.scss";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import { NavLink } from "react-router-dom";

//listing
import Typography from "@material-ui/core/Typography";
import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import Grid from '@material-ui/core/Grid';

import Chip from "@material-ui/core/Chip";
const useStyles = makeStyles((theme) => ({
  title: {
    color: theme.palette.primary.light,
    padding:0
  },
  root: {
    flexGrow: 1,
    overflow: 'hidden',
    padding: theme.spacing(0, 3),
  },
  paper: {
    maxWidth: 400,
    margin: `${theme.spacing(1)}px auto`,
    padding: theme.spacing(2),
  },
}));

export default function List({ isAdmin, problems, filters }) {
  const classes = useStyles();
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [page, setPage] = React.useState(0);

  const start = rowsPerPage * page;
  const end = start + rowsPerPage;
  let color = {
    1: "#5cb85c",
    2: "#f0ad4e",
    3: "#db2644",
  };
  return (
    <>
      <div className="listAlign">

        <div className="listStyle">
          <Typography variant="h4" align='center' className="headingStyle1">
            Easy
      </Typography>
          {
            problems.slice(start, end).map((problem) => (
              <div key={problem.id} className={classes.root}>
                <Paper className={classes.paper} style={{ border: '2px solid', borderColor: color[problem.difficulty] }}>
               
                  <Grid container wrap="nowrap" spacing={2} >     
                     
                    <Grid item xs zeroMinWidth  >
                    <NavLink to={"/problem/" + problem.slug}>    
                      <Typography className="questionText" noWrap>{problem.title}</Typography>
                      </NavLink>    
                      <IconButton >
                        <StarBorderIcon className={classes.title} />
                      </IconButton>
                      Not Submitted
                    </Grid>  
                                 
                  </Grid>
                 
                </Paper>
              </div>

            ))
          }
        </div>

        <div className="listStyle">
          <Typography variant="h4" align='center' className="headingStyle2">
            Medium
      </Typography>
          {
            problems.slice(start, end).map((problem) => (
              <div key={problem.id} className={classes.root}>
                <Paper className={classes.paper} style={{ border: '2px solid', borderColor: color[problem.difficulty] }}>
                  <Grid container wrap="nowrap" spacing={2} >
                    <Grid item xs zeroMinWidth>
                    <NavLink to={"/problem/" + problem.slug}>    
                      <Typography className="questionText" noWrap>{problem.title}</Typography>
                      </NavLink>    
                      <IconButton >
                        <StarBorderIcon className={classes.title} />
                      </IconButton>
                      Not Submitted
                    </Grid>
                  </Grid>
                </Paper>
              </div>

            ))
          }
        </div>

        <div className="listStyle">
          <Typography variant="h4" align='center' className="headingStyle3">
            Hard
      </Typography>
          {
            problems.slice(start, end).map((problem) => (
              <div key={problem.id} className={classes.root}>
                <Paper className={classes.paper} style={{ border: '2px solid', borderColor: color[problem.difficulty] }}>
                  <Grid container wrap="nowrap" spacing={2} >
                    <Grid item xs zeroMinWidth>
                    <NavLink to={"/problem/" + problem.slug}>    
                      <Typography className="questionText" noWrap>{problem.title}</Typography>
                      </NavLink>    
                      <IconButton >
                        <StarBorderIcon className={classes.title} />
                      </IconButton>
                      Not Submitted
                    </Grid>
                  </Grid>
                </Paper>
              </div>

            ))
          }
        </div>

      </div>
    </>
  );
}

List.propTypes = {
  problems: PropTypes.array.isRequired,
  filters: PropTypes.object.isRequired,
  isAdmin: PropTypes.bool.isRequired,
};
