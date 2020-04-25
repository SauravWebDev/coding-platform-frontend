import { handleResponse, handleError } from "./apiUtils";
import { problem as apiUrl } from "./apiUrls";

const getAll = apiUrl + `/getAllProblems/`;
const getByIdOrTitle = apiUrl + "/problem/";
const createORUpdate = apiUrl + "/problem/createORUpdate";
const sourceCode = apiUrl + "/problem/sourceCode/";
const saveFileDataUrl = apiUrl + "/problem/problemSourceCode/save/";
const tryCodeUrl = apiUrl + "/problem/try/";
export function getAllProblems() {
  return fetch(getAll).then(handleResponse).catch(handleError);
}

export function getProblemByIdOrTitle(id) {
  return fetch(getByIdOrTitle + "" + id)
    .then(handleResponse)
    .catch(handleError);
}
export function getSourceCode(id) {
  return fetch(`${sourceCode}${id}`).then(handleResponse).catch(handleError);
}
export function tryCode(id) {
  return fetch(`${tryCodeUrl}${id}`).then(handleResponse).catch(handleError);
}

export function createORUpdateProblem(data) {
  return fetch(createORUpdate, {
    method: "post",
    mode: "cors",
    redirect: "follow",
    referrerPolicy: "no-referrer",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then(handleResponse)
    .catch(handleError);
}

export function saveFileData(data) {
  return fetch(saveFileDataUrl, {
    method: "post",
    mode: "cors",
    redirect: "follow",
    referrerPolicy: "no-referrer",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then(handleResponse)
    .catch(handleError);
}
