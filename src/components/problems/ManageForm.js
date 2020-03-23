import React, { useState, useEffect } from "react";
import Form from "./Form";
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
import * as filtersAction from "../../redux/actions/filtersAction";

const DIFFICULTY = "Difficulty";
const LANGUAGE = "language";
const NOTE = "Note";

const ManageForm = ({ isLoggedIn, slug, ...props }) => {
  const [selectedTag, setSelectedTag] = useState([]);
  const [selectedLang, setSelectedLang] = useState([]);
  const [selectedDifficulty, setSelectedDifficulty] = useState("");
  const [problem, setProblem] = useState({
    id: null,
    title: "",
    description: "",
    examples: [{ input: "", output: "", explanation: "" }],
    note: []
  });

  const [apiError, setApiError] = useState("");
  const [formError, setFormError] = useState({});

  useEffect(() => {
    if (validString(slug)) {
      getProblemByIdOrTitle(slug)
        .then(data => {
          if (data.error) {
            setApiError(data.error);
          } else {
            let tag = Object.keys(data.tag).map(key =>
              String(data.tag[key].id)
            );
            let lang = Object.keys(data.language).map(key =>
              String(data.language[key].id)
            );
            setSelectedLang(lang);
            setSelectedTag(tag);
            setSelectedDifficulty(String(data.difficulty));
            setProblem({
              id: data.id,
              title: data.title,
              examples: data.example,
              description: data.description,
              note: data.note
            });
          }
        })
        .catch(e => {
          alert(e);
        });
    }

    if (
      Object.keys(props.difficulty).length === 0 &&
      Object.keys(props.tag).length === 0
    ) {
      props.loadFilters().catch(() => alert("error"));
    }
  }, [slug]);

  const handleChange = event => {
    const { name, value } = event.target;

    if (name === DIFFICULTY) {
      setSelectedDifficulty(event.target.value);
      return;
    }
    if (name === LANGUAGE) {
      setSelectedLang(event.target.value);
      return;
    }
    if (name === "Tags") {
      setSelectedTag(event.target.value);
      return;
    }
    if (name.split("_")[0] === "note") {
      let exAttr = name.split("_");
      setProblem(prevProblem => {
        let note = [...prevProblem.note];
        note[exAttr[1]] = value;
        return { ...prevProblem, note: note };
      });
      return;
    }
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

  const removeLine = obj => {
    for (let prop in obj) {
      if (typeof obj[prop] === "string") {
        obj[prop] = obj[prop].split("\n").join("");
      } else if (obj[prop] && typeof obj[prop] === "object") {
        removeLine(obj[prop]);
      }
    }
  };
  const handleSave = () => {
    event.preventDefault();
    if (!formIsValid()) return;

    removeLine(problem);
    let processLang = selectedLang.map(lang => Number(lang));
    let processTag = selectedTag.map(tag => Number(tag));
    let reqBody = {
      title: problem.title,
      description: problem.description,
      example: problem.examples,
      note: problem.note,
      language: processLang,
      tag: processTag,
      difficulty: Number(selectedDifficulty)
    };
    if (problem.id) reqBody.id = problem.id;

    createORUpdateProblem(reqBody)
      .then(res => {
        if (res.error) {
          toast.error(res.error);
        } else {
          toast.success(res.msg);
        }
      })
      .catch(e => {
        alert(e);
      });
  };

  const addExample = () => {
    setProblem(prev => {
      let examples = [
        ...prev.examples,
        { input: "", output: "", explanation: "" }
      ];
      return { ...prev, examples: examples };
    });
  };
  const addNote = () => {
    setProblem(prev => {
      let note = [...prev.note, ""];
      return { ...prev, note };
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
  const deleteNote = index => {
    if (problem.note.length === 0) return;
    setProblem(prev => {
      let note = [...prev.note];
      note.splice(index, 1);
      return { ...prev, note: note };
    });
  };
  if (!isLoggedIn) {
    return <Redirect to="/" />;
  } else if (validString(apiError)) {
    toast.error(apiError);
    return <></>;
  } else {
    return (
      <Form
        onSave={handleSave}
        onChange={handleChange}
        errors={formError}
        isCreate={!validString(slug)}
        title={problem.title}
        description={problem.description}
        examples={problem.examples}
        addExample={addExample}
        deleteExample={deleteExample}
        selectedTag={selectedTag}
        tag={props.tag}
        difficulty={props.difficulty}
        difficultyLebel={DIFFICULTY}
        selectedDifficulty={selectedDifficulty}
        langLebel={LANGUAGE}
        selectedLang={selectedLang}
        lang={props.lang}
        notes={problem.note}
        noteLebel={NOTE}
        addNote={addNote}
        deleteNote={deleteNote}
      />
    );
  }
};

ManageForm.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired
};

function mapStateToProps(state, ownProps) {
  let slug = ownProps.match.params.slug && ownProps.match.params.slug.trim();

  let tag = state.filters.tag;

  let processedTag = {};
  if (tag.length != 0)
    for (let i in tag) {
      processedTag[tag[i].id] = tag[i].value;
    }
  let lang = state.filters.language;

  let processedLang = {};
  if (lang.length != 0)
    for (let i in lang) {
      processedLang[lang[i].id] = lang[i].value;
    }

  let difficulty = state.filters.difficulty;
  let processedDifficulty = {};
  if (difficulty.length != 0)
    for (let i in difficulty) {
      processedDifficulty[difficulty[i].id] = difficulty[i].value;
    }
  return {
    isLoggedIn: state.userData.isAuthenticated,
    slug,
    tag: processedTag,
    difficulty: processedDifficulty,
    lang: processedLang
  };
}
const mapDispatchToProps = {
  loadFilters: filtersAction.getFilters
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageForm);
