import { handleResponse, handleError } from "./apiUtils";
const getAllProblemsUrl = "http://localhost:8080/getAllProblems/";

const getProblemByIdOrTitleUrl = "http://localhost:8080/problem/";

export function getAllProblems() {
  return fetch(getAllProblemsUrl)
    .then(handleResponse)
    .catch(handleError);
}

export function getProblemByIdOrTitle(id) {
  return fetch(getProblemByIdOrTitleUrl + "" + id)
    .then(handleResponse)
    .catch(handleError);
}
