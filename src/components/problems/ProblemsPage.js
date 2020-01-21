import React from "react";
import { connect } from "react-redux";
import * as problemsAction from "../../redux/actions/problemsAction";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import ProblemList from "./ProblemList";
import Spinner from "../common/Spinner";
import { Grid } from "@material-ui/core";
class ProblemsPage extends React.Component {
  componentDidMount() {
    const { problems, actions } = this.props;
    if (problems.length === 0) {
      actions.loadProblems().catch(error => {
        alert("Loading courses failed" + error);
      });
    }
  }
  render() {
    return (
      <>
        {this.props.loading ? (
          <Spinner />
        ) : (
          <>
            <Grid container>
              <Grid item xs="6">
                <ProblemList problems={this.props.problems} />
              </Grid>
              <Grid item xs="4"></Grid>
              <Grid item xs="4"></Grid>
            </Grid>
          </>
        )}
      </>
    );
  }
}

ProblemsPage.propTypes = {
  problems: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
  return {
    problems: state.problems.map(problem => {
      return {
        ...problem
      };
    }),
    loading: state.apiCallsInProgress > 0
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      loadProblems: bindActionCreators(problemsAction.getAllProblems, dispatch)
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProblemsPage);
