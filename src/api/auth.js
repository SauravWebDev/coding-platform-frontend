import { handleResponse, handleError } from "./apiUtils";

import { auth as apiUrl } from "./apiUrls";

export function logIn(emailId, password) {
  return fetch(apiUrl + "/loginWithPassword", {
    method: "post",
    mode: "cors",
    credentials: "include",
    redirect: "follow",
    referrerPolicy: "no-referrer",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      emailID: emailId,
      password: password,
    }),
  })
    .then(handleResponse)
    .catch(handleError);
}

export function signup(firstName, lastName, emailID, password) {
  return fetch(apiUrl + "/createUser", {
    method: "post",
    mode: "cors",
    redirect: "follow",
    referrerPolicy: "no-referrer",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      firstName,
      lastName,
      emailID,
      password,
    }),
  })
    .then(handleResponse)
    .catch(handleError);
}
