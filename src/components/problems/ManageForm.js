import React, { useState, useEffect } from "react";
import Form from "./Form";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import PropTypes, { func } from "prop-types";
import "./ManageForm.scss";
import { toast } from "react-toastify";
import { validString } from "../../util/util";
import { DEFAULT_PROB_DATA } from "./Constant";
// API //
import {
  getProblemByIdOrTitle,
  createORUpdateProblem,
} from "../../api/problemsApi";
import * as filtersAction from "../../redux/actions/filtersAction";

const DIFFICULTY = "Difficulty";
const LANGUAGE = "language";
const NOTE = "Note";

const ManageForm = ({ isLoggedIn, slug, ...props }) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedTag, setSelectedTag] = useState([]);
  const [selectedLang, setSelectedLang] = useState([]);
  const [selectedDifficulty, setSelectedDifficulty] = useState("");
  const [problem, setProblem] = useState({
    id: null,
    title: "",
    description: "",
    example: "",
    note: "",
  });

  const [apiError, setApiError] = useState("");
  const [formError, setFormError] = useState({});

  useEffect(() => {
    if (validString(slug)) {
      getProblemByIdOrTitle(slug)
        .then((data) => {
          if (data.error) {
            setApiError(data.error);
          } else {
            let tag = Object.keys(data.tag).map((key) =>
              String(data.tag[key].id)
            );
            let lang = Object.keys(data.language).map((key) =>
              String(data.language[key].id)
            );
            setSelectedLang(lang);
            setSelectedTag(tag);
            setSelectedDifficulty(String(data.difficulty));
            setProblem({
              id: data.id,
              slug: data.slug,
              title: data.title,
              example: data.example || "",
              description: data.description,
              note: data.note || "",
            });
          }
        })
        .catch((e) => {
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

  const handleChange = (event) => {
    const { name, value } = event.target;
    console.log("name ", name, "value ", value);
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
    } else setProblem((prevProblem) => ({ ...prevProblem, [name]: value }));
  };

  const formIsValid = () => {
    if (!validString(problem.title)) {
      setFormError({ ...formError, title: "Title is Required" });
      return false;
    }
    if (!validString(problem.description)) {
      setFormError({ ...formError, description: "Descriptiom is Required" });
      return false;
    }
    if (!validString(problem.example)) {
      setFormError({ ...formError, description: "Example is Required" });
      return false;
    }
    if (!validString(problem.note)) {
      setFormError({ ...formError, description: "Note is Required" });
      return false;
    }
    return true;
  };

  const updateHtml = (name, value) => {
    setProblem((prevProblem) => ({ ...prevProblem, [name]: value }));
  };
  const handleSave = () => {
    event.preventDefault();
    if (!formIsValid()) return;

    let processLang = selectedLang.map((lang) => Number(lang));
    let processTag = selectedTag.map((tag) => Number(tag));
    let reqBody = {
      title: problem.title.split("\n").join(""),
      description: problem.description,
      example: problem.example,
      note: problem.note,
      language: processLang,
      tag: processTag,
      difficulty: Number(selectedDifficulty),
    };
    if (problem.id) reqBody.id = problem.id;
    createORUpdateProblem(reqBody)
      .then((res) => {
        if (res.error) {
          toast.error(res.error);
        } else {
          toast.success(res.msg);
        }
      })
      .catch((e) => {
        alert(e);
      });
  };
  const clickTab = (tab) => {
    setSelectedTab(tab);
  };
  if (!isLoggedIn) {
    return <Redirect to="/" />;
  } else if (validString(apiError)) {
    toast.error(apiError);
    return <></>;
  } else {
    return (
      <>
        <div>
          <div className="top-bar">
            <div className="wrapper-progressBar">
              <ul className="progressBar">
                <li onClick={() => clickTab(0)} className="active">
                  Problem Statement
                </li>
                <li onClick={() => clickTab(1)} className="active">
                  Code Setup
                </li>
                <li onClick={() => clickTab(2)}>Test Cases</li>
                <li onClick={() => clickTab(3)}>Overview</li>
              </ul>
            </div>
          </div>
          <div className={"" + (selectedTab == 0 ? "show" : "hide")}>
            <Form
              onSave={handleSave}
              onChange={handleChange}
              errors={formError}
              isCreate={!validString(slug)}
              title={problem.title}
              description={problem.description}
              example={problem.example}
              selectedTag={selectedTag}
              tag={props.tag}
              difficulty={props.difficulty}
              difficultyLebel={DIFFICULTY}
              selectedDifficulty={selectedDifficulty}
              langLebel={LANGUAGE}
              selectedLang={selectedLang}
              lang={props.lang}
              note={problem.note}
              noteLebel={NOTE}
              updateHtml={updateHtml}
            />
          </div>
          <div className={"" + (selectedTab == 1 ? "show" : "hide")}>
            code setup
          </div>
          <div className={"" + (selectedTab == 2 ? "show" : "hide")}>
            code setup
          </div>
          <div></div>
        </div>
      </>
    );
  }
};

ManageForm.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
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
    lang: processedLang,
  };
}
const mapDispatchToProps = {
  loadFilters: filtersAction.getFilters,
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageForm);
