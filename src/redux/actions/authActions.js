import { refreshTokens } from "../../api/auth";
import { SET_TOKEN_EXPIRY } from "./actionTypes";

function setTokenExpiryTrue() {
  let isExpired = true;
  return { type: SET_TOKEN_EXPIRY, isExpired };
}
function setTokenExpiryFalse() {
  let isExpired = false;
  return { type: SET_TOKEN_EXPIRY, isExpired };
}

export function refreshToken() {
  setTokenExpiryTrue();
  return function (dispatch) {
    return refreshTokens()
      .then((res) => {
        if (res.error) {
          let err = new Error();
          err.msg = "Error in refresh token";
          throw err;
        } else {
          dispatch(setTokenExpiryFalse());
        }
      })
      .catch((e) => {
        console.log(e);
        let err = new Error();
        err.msg = "Error in refresh token";
        throw err;
      });
  };
}
