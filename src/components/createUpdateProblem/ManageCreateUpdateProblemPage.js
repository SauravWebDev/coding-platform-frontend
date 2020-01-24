import React, { useState, useEffect } from "react";
import CreateUpdateProblemPage from "./CreateUpdateProblemPage";
import { getProblemByIdOrTitle } from "../../redux/actions/singleProblemAction";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const ManageCreateUpdateProblemPage = ({
  isLoggedIn,
  getProblemByIdOrTitleAction,
  problemID,
  problemData
}) => {
  let [errors, setErrors] = useState({});
  let [title, setTitle] = useState("");
  let [description, setDescription] = useState("");
  let [example, setExample] = useState(false);

  useEffect(() => {
    if (problemID && Object.keys(problemData).length === 0) {
      getProblemByIdOrTitleAction(problemID).catch(e => {
        console.log("e ", e);
        alert(e);
      });
    }
  });

  const handleChange = event => {
    const { name, value } = event.target;
    if (name == "title") {
      setTitle(value.trim());
      if (!value) {
        setErrors({ ...errors, title: "Title is Required" });
      } else if (errors.title) {
        delete errors.title;
      } else if (name === "description") {
        setDescription(value.trim());
        if (!value) {
          setErrors({ ...errors, description: "description is Required" });
        } else if (errors.description) {
          delete errors.description;
        }
      }
    } else if (name === "example") {
      setExample(value.trim());
      if (!value) {
        setErrors({ ...errors, example: "Example is Required" });
      } else if (errors.example) {
        delete errors.example;
      }
    }
  };
  const formIsValid = () => {
    if (!title) {
      setErrors({ email: "Title is Required" });
      return false;
    }
    if (!description) {
      setErrors({ description: "Description is Required" });
      return false;
    }
    if (!example) {
      setErrors({ example: "Example is Required" });
      return false;
    }
    return true;
  };
  const handleSave = () => {
    event.preventDefault();
    if (!formIsValid()) return;
  };

  return (
    <>
      {!isLoggedIn && <Redirect to="/" />}
      {problemData && problemData.error ? (
        <Alert severity="error">Problem Not found!</Alert>
      ) : (
        <CreateUpdateProblemPage
          onSave={handleSave}
          onChange={handleChange}
          errors={errors}
          operation={problemID ? "update" : "create"}
        />
      )}
    </>
  );
};

ManageCreateUpdateProblemPage.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  getProblemByIdOrTitleAction: PropTypes.func.isRequired,
  problemID: PropTypes.string.isRequired,
  problemData: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
  let problemID = ownProps.match.params.slug;

  return {
    isLoggedIn: state.userData.isAuthenticated,
    problemID: problemID,
    problemData: state.createUpdateProblems[problemID] || {}
  };
}

const mapDispatchToProps = {
  getProblemByIdOrTitleAction: getProblemByIdOrTitle
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManageCreateUpdateProblemPage);
