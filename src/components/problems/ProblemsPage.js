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
    const { actions, problemsData, error } = this.props;
    if (error) return;
    let length = Object.keys(problemsData).length;
    if (length === 0) {
      actions.loadProblems();
    }
  }
  render() {
    if (this.props.loading) {
      return <>Loading ...</>;
    } else if (this.props.error) {
      return <>Error in Loading please refresh </>;
    } else {
      return (
        <>
          <Grid container>
            <Grid item xs={4}>
              <ProblemList problems={this.props.problemsData} />
            </Grid>
            <Grid item xs={4}></Grid>
            <Grid item xs={4}></Grid>
          </Grid>
        </>
      );
    }
  }
}

ProblemsPage.propTypes = {
  actions: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.object,
  problemsData: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    loading: state.loading,
    error: state.error,
    problemsData: state.problems
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
