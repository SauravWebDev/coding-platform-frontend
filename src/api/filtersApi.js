import { handleResponse, handleError } from "./apiUtils";
import { filter as apiUrl } from "./apiUrls";

const get = apiUrl + `/filter`;

export function getFilters() {
  return fetch(get)
    .then(handleResponse)
    .catch(handleError);
}
