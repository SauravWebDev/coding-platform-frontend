import { handleResponse, handleError } from "./apiUtils";
const baseUrl = "http://localhost:8080/";

export function logIn(emailId, password) {
  return fetch(baseUrl + "loginWithPassword", {
    method: "post",
    mode: "cors",
    redirect: "follow",
    referrerPolicy: "no-referrer",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      emailID: emailId,
      password: password
    })
  })
    .then(handleResponse)
    .catch(handleError);
}

export function signup(firstName, lastName, emailID, password) {
  return fetch(baseUrl + "createUser", {
    method: "post",
    mode: "cors",
    redirect: "follow",
    referrerPolicy: "no-referrer",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      firstName,
      lastName,
      emailID,
      password
    })
  })
    .then(handleResponse)
    .catch(handleError);
}
