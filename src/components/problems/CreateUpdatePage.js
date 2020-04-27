import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { validString } from "../../util/util";
import Form from "./Form.js";
import CodeSetupPage from "./CodeSetupPage";
import "./CreateUpdatePage.scss";
import {
  getSourceCode,
  createORUpdateProblem,
  saveFileData,
} from "../../api/problemsApi";
import { getFilters } from "../../api/filtersApi";

import { DEFAULT_PROB_DATA, FILTERS } from "./Constant";

const CreateUpdatePage = ({ isLoggedIn, ...props }) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [slug, setSlug] = useState(props.slug);
  const [selectedTagArray, setSelectedTagArray] = useState([]);
  const [selectedLangArray, setSelectedLangArray] = useState([]);
  const [selectedDifficulty, setSelectedDifficulty] = useState("");
  const [problem, setProblem] = useState(props.DEFAULT_PROB_DATA);
  const [filters, setFilters] = useState(props.FILTERS);
  const [apiError, setApiError] = useState("");
  const [formError, setFormError] = useState({});

  useEffect(() => {
    if (validString(slug)) {
      getSourceCode(slug)
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
            setSelectedLangArray(lang);
            setSelectedTagArray(tag);
            setSelectedDifficulty(String(data.difficulty));

            let sourceCode = {};
            data.sourceCode.forEach((item) => {
              sourceCode[item.lang_id] = item;
            });

            let codeTemplate = {};
            data.code_template.forEach((item) => {
              codeTemplate[item.lang_id] = item;
            });

            lang = {};
            for (let i in data.language) {
              lang[data.language[i].id] = data.language[i].value;
              sourceCode[data.language[i].id] =
                sourceCode[data.language[i].id] ||
                codeTemplate[data.language[i].id];
            }

            let selectedLanguage = data.language[0].id;
            let selectedCode = sourceCode[selectedLanguage];
            setProblem({
              id: data.id,
              slug: data.slug,
              title: data.title,
              example: data.example || "",
              description: data.description,
              note: data.note || "",
              language: lang,
              tag: tag,
              selectedLanguage,
              codeTemplate,
              sourceCode,
              selectedCode,
            });
          }
        })
        .catch((e) => {
          alert(e);
        });
    }

    if (
      Object.keys(filters.tag).length === 0 &&
      Object.keys(filters.difficulty).length === 0 &&
      Object.keys(filters.lang).length === 0
    ) {
      getFilters()
        .then(function (data) {
          setFilters((prev) => {
            data.tag.forEach(function (item) {
              prev.tag[item.id] = item.value;
            });
            data.language.forEach(function (item) {
              prev.lang[item.id] = item.value;
            });
            data.difficulty.forEach(function (item) {
              prev.difficulty[item.id] = item.value;
            });
            return { ...prev };
          });
        })
        .catch(function () {
          toast.error("Error in calling filters api");
        });
    }
  }, [slug]);

  const clickTab = (tab) => {
    if (tab != 0 && !problem.id) {
      toast.error("Please save problem statement");
      return;
    }
    setSelectedTab(tab);
  };

  const codeChange = (part, value) => {
    setProblem((prev) => {
      prev.selectedCode[part] = value;
      return { ...prev };
    });
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

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "Difficulty") {
      setSelectedDifficulty(event.target.value);
      return;
    }
    if (name === "Language") {
      setSelectedLangArray(event.target.value);
      return;
    }
    if (name === "Tags") {
      setSelectedTagArray(event.target.value);
      return;
    } else setProblem((prevProblem) => ({ ...prevProblem, [name]: value }));
  };

  const updateHtml = (name, value) => {
    setProblem((prevProblem) => ({ ...prevProblem, [name]: value }));
  };

  const handleSave = () => {
    event.preventDefault();
    if (!formIsValid()) return;

    let processLang = selectedLangArray.map((lang) => Number(lang));
    let processTag = selectedTagArray.map((tag) => Number(tag));
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
          if (!problem.id) {
            setSlug(res.slug);
          } else {
            let sourceCode = problem.sourceCode;
            let processedSourceCode = {};
            let lang = {};
            selectedLangArray.forEach((item) => {
              if (sourceCode[item]) {
                processedSourceCode[item] = sourceCode[item];
              } else {
                processedSourceCode[item] = problem.codeTemplate[item];
              }
              lang[item] = filters.lang[item];
            });
            setProblem((prev) => {
              prev.sourceCode = processedSourceCode;
              prev.language = lang;
              return { ...prev };
            });
            // update selected language and sourceCode
          }
        }
      })
      .catch((e) => {
        alert(e);
      });
  };

  const saveSourceCode = () => {
    let data = problem.sourceCode;
    let body = {
      id: problem.id,
      code: [],
    };
    for (let i in data) {
      body.code.push(data[i]);
    }
    saveFileData(body)
      .then((data) => {
        if (data.error) {
          alert(data.error);
        } else {
          toast.success("Problem source code updated successfully");
        }
      })
      .catch((e) => {
        alert(e);
      });
  };
  const getTabData = () => {
    if (selectedTab == 0) {
      return (
        <Form
          problem={problem}
          filters={filters}
          onSave={handleSave}
          onChange={handleChange}
          errors={formError}
          selectedTagArray={selectedTagArray}
          selectedDifficulty={selectedDifficulty}
          selectedLangArray={selectedLangArray}
          updateHtml={updateHtml}
        />
      );
    }
    if (selectedTab == 1) {
      return (
        <CodeSetupPage
          problem={problem}
          onChangeCodeSetupLang={onChangeCodeSetupLang}
          saveSourceCode={saveSourceCode}
          codeChange={codeChange}
        />
      );
    }
    if (selectedTab == 2) {
      return (
        <>
          <h1> Test Cases</h1>
        </>
      );
    }
    if (selectedTab == 3) {
      return (
        <>
          <h1> Overview</h1>
        </>
      );
    }
  };
  const onChangeCodeSetupLang = (event) => {
    const { value } = event.target;
    setProblem((prev) => {
      prev.sourceCode[prev.selectedCode.lang_id] = { ...prev.selectedCode };
      prev.selectedLanguage = value;
      prev.selectedCode = prev.sourceCode[value];
      return { ...prev };
    });
  };

  if (!isLoggedIn) {
    return <Redirect to="/" />;
  }
  if (validString(apiError)) {
    toast.error(apiError);
    return <></>;
  }
  return (
    <>
      <div>
        <div className="top-bar">
          <div className="wrapper-progressBar">
            <ul className="progressBar">
              <li
                onClick={() => clickTab(0)}
                className={selectedTab >= 0 ? "active pointer" : "pointer"}
              >
                Problem Statement
              </li>
              <li
                onClick={() => clickTab(1)}
                className={selectedTab >= 1 ? "active pointer" : "pointer"}
              >
                Code Setup
              </li>
              <li
                onClick={() => clickTab(2)}
                className={selectedTab >= 2 ? "active pointer" : "pointer"}
              >
                Test Cases
              </li>
              <li
                onClick={() => clickTab(3)}
                className={selectedTab >= 3 ? "active pointer" : "pointer"}
              >
                Overview
              </li>
            </ul>
          </div>
        </div>
        {getTabData()}
        <div></div>
      </div>
    </>
  );
};

CreateUpdatePage.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  loadFilters: PropTypes.func.isRequired,
};

function mapStateToProps(state, ownProps) {
  let slug = ownProps.match.params.slug && ownProps.match.params.slug.trim();
  return {
    isLoggedIn: state.userData.isAuthenticated,
    slug,
    DEFAULT_PROB_DATA,
    FILTERS,
  };
}
const mapDispatchToProps = {
  loadFilters: getFilters,
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateUpdatePage);
