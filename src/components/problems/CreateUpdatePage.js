import React, { useState, useEffect } from "react";
import cloneDeep from "lodash/cloneDeep";

import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { validString } from "../../util/util";
import Form from "./Form.js";
import CodeSetupPage from "./CodeSetupPage";
import "./CreateUpdatePage.scss";
import MetaData from "./MetaData";
import {
  getSourceCode,
  createORUpdateProblem,
  saveFileData,
  saveTestCases,
  deleteTestCase as deleteTestCaseApi,
  saveMetaData as saveMetaDataApi,
} from "../../api/problemsApi";
import { getFilters } from "../../api/filtersApi";
import TestCasePage from "./TestCasePage";
import {
  DEFAULT_PROB_DATA,
  FILTERS,
  TEST_CASES,
  VARIABLE_TYPE,
  DEFAULT_META_DATA,
  TEST_CASE_TYPE,
  SELECTED_TEST_CASE,
  STATUS,
} from "./Constant";
import OverviewPage from "./OverviewPage";

const CreateUpdatePage = ({ isLoggedIn, ...props }) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [slug, setSlug] = useState(props.slug);
  const [selectedTagArray, setSelectedTagArray] = useState([]);
  const [selectedLangArray, setSelectedLangArray] = useState([]);
  const [selectedDifficulty, setSelectedDifficulty] = useState("");
  const [metaData, setMetaData] = useState(props.DEFAULT_META_DATA);
  const [problem, setProblem] = useState(props.DEFAULT_PROB_DATA);
  const [filters, setFilters] = useState(props.FILTERS);
  const [apiError, setApiError] = useState("");
  const [formError, setFormError] = useState({});
  const [testCases, setTestCases] = useState(props.TEST_CASES);

  const [selectedTestCase, setSelectedTestCase] = useState(
    props.SELECTED_TEST_CASE
  );

  useEffect(() => {
    if (validString(slug)) {
      getSourceCode(slug)
        .then((data) => {
          if (data.error) {
            setApiError(data.error);
          } else {
            let tag = Object.keys(data.tag).map((key) => data.tag[key].id);
            let lang = Object.keys(data.language).map(
              (key) => data.language[key].id
            );
            setSelectedLangArray(lang);
            setSelectedTagArray(tag);
            setSelectedDifficulty(data.difficulty);

            let sourceCode = {};
            data.sourceCode.forEach((item) => {
              sourceCode[item.lang_id] = item;
            });

            let codeTemplate = {};
            data.code_template.forEach((item) => {
              codeTemplate[item.lang_id] = item;
            });

            /**
             * why we are initializing lang is because we need key:pair as id:value
             * for problem source code page
             */
            lang = {};
            // create source code for selected language
            for (let i in data.language) {
              lang[data.language[i].id] = data.language[i].value;
              sourceCode[data.language[i].id] =
                sourceCode[data.language[i].id] ||
                codeTemplate[data.language[i].id];
            }
            /**
             * There can be a case when api have enmpty language array in that case default
             * selected language will be empty string
             */
            let selectedLanguage =
              (data.language &&
                data.language.length > 0 &&
                data.language[0].id) ||
              "";

            let selectedCode = "";

            if (selectedLanguage != "") {
              selectedCode =
                (sourceCode && sourceCode[selectedLanguage]) ||
                codeTemplate[selectedLanguage];
            }
            setTestCases((prev) => {
              let test_cases = data.test_case;
              prev = test_cases.map((item) => {
                return {
                  id: item.id,
                  type: item.type,
                  input: JSON.stringify(item.input),
                  output:
                    data.meta_data.output_meta_data.type == 4
                      ? JSON.stringify(item.output)
                      : String(item.output),
                  output_type: item.output_type,
                };
              });
              return [...prev];
            });
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
              status: data.status,
            });
            if (
              data.meta_data &&
              data.meta_data.input_meta_data &&
              data.meta_data.output_meta_data
            ) {
              setMetaData((prev) => {
                prev.outputType = data.meta_data.output_meta_data.type;
                prev.noOfInputs = data.meta_data.input_meta_data.no_of_inputs;
                prev.inputs = data.meta_data.input_meta_data.inputs.map(
                  (input) => {
                    return { type: input.type, name: input.name };
                  }
                );
                return { ...prev };
              });
            }
          }
        })
        .catch((e) => {
          console.log(e);
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
    if (name === "Status") {
      setProblem((prevProblem) => ({ ...prevProblem, ["status"]: value }));
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

  const saveBasicProblemData = () => {
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
      status: problem.status,
    };
    if (problem.id) reqBody.id = problem.id;
    createORUpdateProblem(reqBody)
      .then((res) => {
        if (res.error) {
          toast.error(res.error);
        } else {
          toast.success(res.msg);
          if (!problem.id) {
            // As we are creting new problem , we dont have code template data, calling get problem by slug will have required data
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
    event.preventDefault();
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
  const metaDataChange = (event) => {
    const { name, value } = event.target;
    if (name === "no-of-inputs") {
      setMetaData((prev) => {
        prev.noOfInputs = value;
        if (prev.inputs.length < parseInt(value)) {
          for (let i = 0; i < parseInt(value) - prev.inputs.length; i++)
            prev.inputs.push({
              type: "",
              name: "",
            });
        }
        return { ...prev };
      });
      return;
    }
    if (name === "output-type") {
      setMetaData((prev) => {
        prev.outputType = value;
        return { ...prev };
      });
      return;
    }
    let namePart = name.split("-");
    setMetaData((prev) => {
      prev.inputs[namePart[2]][namePart[1]] = value;
      return { ...prev };
    });
  };
  const saveMetaData = () => {
    event.preventDefault();
    let inputs = [];

    if (metaData.outputType == "") {
      toast.error("Invalid output type");
      return;
    }
    for (let i in metaData.inputs) {
      let input = metaData.inputs[i];
      if (i < metaData.noOfInputs) {
        if (input.name.trim() != "" && input.type != "") {
          inputs.push({
            name: input.name,
            type: parseInt(input.type),
          });
        } else {
          toast.error("Invalid inputs");
          return;
        }
      }
    }
    let reqBody = {
      problem_id: problem.id,
      no_of_inputs: parseInt(metaData.noOfInputs),
      output_type: parseInt(metaData.outputType),
      inputs: inputs,
    };
    saveMetaDataApi(reqBody)
      .then((res) => {
        if (res.error) {
          toast.error(res.error);
        } else {
          toast.success("Meta Data updated sucessfully");
        }
      })
      .catch((e) => {
        console.log(e);
        toast.error("Something went wrong");
      });
  };
  const getTabData = () => {
    if (selectedTab == 0) {
      return (
        <Form
          problem={problem}
          statusOb={props.STATUS}
          filters={filters}
          onSave={saveBasicProblemData}
          onChange={handleChange}
          errors={formError}
          selectedTagArray={selectedTagArray.map((val) => String(val))}
          selectedDifficulty={String(selectedDifficulty)}
          selectedLangArray={selectedLangArray.map((val) => String(val))}
          updateHtml={updateHtml}
        />
      );
    }
    if (selectedTab == 1) {
      return (
        <div className="createUpdate-codesetup-tab">
          <div style={{ width: "50%" }}>
            <MetaData
              metaData={metaData}
              variableMap={props.VARIABLE_TYPE}
              onChange={metaDataChange}
              onSave={saveMetaData}
            />
          </div>
          <div style={{ width: "100%" }}>
            <CodeSetupPage
              problem={problem}
              onChangeCodeSetupLang={onChangeCodeSetupLang}
              saveSourceCode={saveSourceCode}
              codeChange={codeChange}
            />
          </div>
        </div>
      );
    }
    if (selectedTab == 2) {
      return (
        <TestCasePage
          testCases={testCases}
          changeSelectedTC={changeSelectedTC}
          updateTestCase={updateTestCase}
          selectedTestCase={selectedTestCase}
          deleteTestCase={deleteTestCase}
          onSave={onSaveTestCase}
        />
      );
    }
    if (selectedTab == 3) {
      return (
        <OverviewPage
          problem={problem}
          filters={filters}
          testCases={testCases}
          selectedDifficulty={selectedDifficulty}
        />
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
  // Test Cases Function

  const onSaveTestCase = () => {
    event.preventDefault();
    let reqBody = {
      problem_id: problem.id,
    };
    let outputType = metaData.outputType;
    if (outputType == 1) {
      reqBody.output = parseInt(selectedTestCase.output);
    } else if (outputType == 2) {
      reqBody.output = selectedTestCase.output;
    } else if (outputType == 3) {
      if (selectedTestCase.output == "true") {
        reqBody.output = true;
      } else if (selectedTestCase.output == "false") {
        reqBody.output = false;
      } else {
        toast.error("Output is invalid");
        return;
      }
    } else if (outputType == 4) {
      try {
        reqBody.output = JSON.parse(selectedTestCase.output);
      } catch (e) {
        return;
      }
    }

    if (selectedTestCase) reqBody.id = selectedTestCase.id;
    reqBody.input = JSON.parse(selectedTestCase.input);
    reqBody.type = Number(selectedTestCase.type);
    reqBody.name = props.TEST_CASE_TYPE[reqBody.type];

    saveTestCases(reqBody)
      .then((data) => {
        reqBody.input = JSON.stringify(reqBody.input);
        if (metaData.outputType == 4) {
          reqBody.output = JSON.stringify(reqBody.output);
        } else {
          reqBody.output = String(reqBody.output);
        }
        if (data.error) {
          alert(data.error);
        } else {
          if (reqBody.id) {
            var index = testCases.findIndex((x) => x.id === reqBody.id);

            setTestCases([
              ...testCases.slice(0, index),
              { ...reqBody },
              ...testCases.slice(index + 1),
            ]);
            toast.success("Test Cases updated successfully");
            // update
          } else {
            // create
            let newTC = { ...reqBody };
            newTC.id = data.insertId;
            setTestCases((prev) => {
              prev.push(newTC);
              return [...prev];
            });
            toast.success("Test Cases created successfully");
          }

          setSelectedTestCase({
            id: null,
            type: "",
            input: "",
            output: "",
            name: "",
          });
        }
      })
      .catch((e) => {
        alert(e);
      });
  };

  const changeSelectedTC = function (event) {
    const { name, value } = event.target;
    if (name == "testCase-input") {
      setSelectedTestCase((prev) => {
        return { ...prev, ["input"]: value };
      });
      return;
    }
    if (name == "testCase-output") {
      setSelectedTestCase((prev) => {
        return { ...prev, ["output"]: value };
      });
      return;
    }
    if (name == "type") {
      setSelectedTestCase((prev) => {
        return { ...prev, ["type"]: value };
      });
      return;
    }
  };

  const updateTestCase = function (testCase) {
    setSelectedTestCase((prev) => {
      prev = testCase;
      prev.type = testCase.type;
      return { ...prev };
    });
  };

  const deleteTestCase = (index) => {
    deleteTestCaseApi({ id: index, problem_id: problem.id })
      .then((data) => {
        if (data.error) {
          toast.error(data.error);
        } else {
          let id = testCases.findIndex((x) => x.id === index);

          setTestCases([...testCases.slice(0, id), ...testCases.slice(id + 1)]);
          toast.success(`Test Case Deleted successfully with id : ${index}`);
        }
      })
      .catch(() => {
        toast.error("Error in deleting Test Case");
      });
    //
  };

  ///////////////End Test Case ////////
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
  DEFAULT_PROB_DATA: PropTypes.object.isRequired,
  slug: PropTypes.string.isRequired,
  FILTERS: PropTypes.object.isRequired,
  TEST_CASES: PropTypes.array.isRequired,
  DEFAULT_META_DATA: PropTypes.object.isRequired,
  VARIABLE_TYPE: PropTypes.object.isRequired,
  TEST_CASE_TYPE: PropTypes.object.isRequired,
  SELECTED_TEST_CASE: PropTypes.object.isRequired,
  STATUS: PropTypes.object.isRequired,
};

function mapStateToProps(state, ownProps) {
  let slug = ownProps.match.params.slug && ownProps.match.params.slug.trim();
  return cloneDeep({
    isLoggedIn: state.userData.isAuthenticated,
    slug: slug || "",
    DEFAULT_PROB_DATA: DEFAULT_PROB_DATA,
    FILTERS,
    TEST_CASES,
    VARIABLE_TYPE,
    DEFAULT_META_DATA,
    TEST_CASE_TYPE,
    SELECTED_TEST_CASE,
    STATUS,
  });
}

const mapDispatchToProps = {
  loadFilters: getFilters,
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateUpdatePage);
