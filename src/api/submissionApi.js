import { submission as apiUrl } from "./apiUrls";
import { getCookieByName } from "../util/util";
const runUrl = apiUrl + "/submission/run";
const submitUrl = apiUrl + "/submission/submit";
const checkStatusUrl = apiUrl + "/submission/checkStatus";
const accessToken = "ac-token";
import { handleResponse, handleError } from "./apiUtils";

export function run(data) {
  return fetch(runUrl, {
    method: "post",
    mode: "cors",
    redirect: "follow",
    referrerPolicy: "no-referrer",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${getCookieByName(accessToken)}`,
    },
    body: JSON.stringify(data),
  })
    .then(handleResponse)
    .catch(handleError);
}
export function submit(data) {
  return fetch(submitUrl, {
    method: "post",
    mode: "cors",
    redirect: "follow",
    referrerPolicy: "no-referrer",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${getCookieByName(accessToken)}`,
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
