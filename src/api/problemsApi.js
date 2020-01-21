import { handleResponse, handleError } from "./apiUtils";
const baseUrl = "http://localhost:8080/getAllProblems/";

export function getAllProblems() {
  return fetch(baseUrl)
    .then(handleResponse)
    .catch(handleError);
}
