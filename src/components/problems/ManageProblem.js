import React, { useState, useEffect } from "react";
import ProblemForm from "./ProblemForm";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";

import { toast } from "react-toastify";

import { validString } from "../../util/util";

// API //
import {
  getProblemByIdOrTitle,
  createORUpdateProblem
} from "../../api/problemsApi";

const ManageProblem = ({ isLoggedIn, slug }) => {
  let [problem, setProblem] = useState({
    id: null,
    title: "",
    description: "",
    examples: [{ input: "", output: "", explaination: "" }]
  });

  let [apiError, setApiError] = useState("");
  let [formError, setFormError] = useState({});

  useEffect(() => {
    if (validString(slug)) {
      getProblemByIdOrTitle(slug)
        .then(data => {
          if (data.error) {
            setApiError(data.error);
          } else {
            setProblem({
              id: data.id,
              title: data.title,
              examples: data.example,
              description: data.description
            });
          }
        })
        .catch(e => {
          alert(e);
        });
    }
  }, [slug]);

  const handleChange = event => {
    const { name, value } = event.target;
    if (name.split("_")[0] === "example") {
      setProblem(prevProblem => {
        let exAttr = name.split("_");
        let examples = [...prevProblem.examples];
        examples[exAttr[2]][exAttr[1]] = value;
        return { ...prevProblem, examples: examples };
      });
    } else setProblem(prevProblem => ({ ...prevProblem, [name]: value }));
  };

  const formIsValid = () => {
    if (!validString(problem.title)) {
      setFormError({ ...formError, title: "Title is Required" });
      return false;
    }
    if (!validString(problem.title)) {
      setFormError({ ...formError, description: "Title is Required" });
      return false;
    }
    return true;
  };
  const handleSave = () => {
    event.preventDefault();
    if (!formIsValid()) return;
    let reqBody = {
      title: problem.title,
      description: problem.description,
      example: problem.examples
    };
    if (problem.id) reqBody.id = problem.id;

    createORUpdateProblem(reqBody)
      .then(res => {
        if (res.error) {
          alert(res.error);
        } else {
          alert(res.msg);
        }
      })
      .catch(e => {
        alert(e);
      });
    console.log("data ", problem);
  };

  const addExample = () => {
    setProblem(prev => {
      let examples = [
        ...prev.examples,
        { input: "", output: "", explaination: "" }
      ];
      return { ...prev, examples: examples };
    });
  };

  const deleteExample = index => {
    if (problem.examples.length <= 1) return;
    setProblem(prev => {
      let examples = [...prev.examples];
      examples.splice(index, 1);
      return { ...prev, examples: examples };
    });
  };

  if (!isLoggedIn) {
    return <Redirect to="/" />;
  } else if (validString(apiError)) {
    toast.error(apiError);
    return <></>;
  } else {
    return (
      <ProblemForm
        onSave={handleSave}
        onChange={handleChange}
        errors={formError}
        isCreate={!validString(slug)}
        title={problem.title}
        description={problem.description}
        examples={problem.examples}
        addExample={addExample}
        deleteExample={deleteExample}
      />
    );
  }
};

ManageProblem.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired
};

function mapStateToProps(state, ownProps) {
  let slug = ownProps.match.params.slug && ownProps.match.params.slug.trim();

  return {
    isLoggedIn: state.userData.isAuthenticated,
    slug
  };
}

export default connect(mapStateToProps)(ManageProblem);
