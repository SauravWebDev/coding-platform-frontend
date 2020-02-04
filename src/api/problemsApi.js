import { handleResponse, handleError } from "./apiUtils";
import { problem as apiUrl } from "./apiUrls";

const getAll = apiUrl + `/getAllProblems/`;
const getByIdOrTitle = apiUrl + "/problem/";
const createORUpdate = apiUrl + "/problem/createORUpdate";

export function getAllProblems() {
  // eslint-disable-next-line no-undef
  return fetch(getAll)
    .then(handleResponse)
    .catch(handleError);
}

export function getProblemByIdOrTitle(id) {
  return fetch(getByIdOrTitle + "" + id)
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
