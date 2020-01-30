import { handleResponse, handleError } from "./apiUtils";
const getAllProblemsUrl = "http://localhost:8080/getAllProblems/";

const getProblemByIdOrTitleUrl = "http://localhost:8080/problem/";

const createORUpdate = "http://localhost:8080/problem/createORUpdate";

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

export function createORUpdateProblem(data) {
  return fetch(createORUpdate, {
    method: "post",
    mode: "cors",
    redirect: "follow",
    referrerPolicy: "no-referrer",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
    .then(handleResponse)
    .catch(handleError);
}
