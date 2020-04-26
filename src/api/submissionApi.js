import { submission as apiUrl } from "./apiUrls";

const createORUpdate = apiUrl + "/submission/run";
const checkStatusUrl = apiUrl + "/submission/checkStatus";

import { handleResponse, handleError } from "./apiUtils";

export function run(data) {
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

export function checkStatus(id) {
  return fetch(checkStatusUrl + "?submissionId=" + id)
    .then(handleResponse)
    .catch(handleError);
}
