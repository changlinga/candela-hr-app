import * as types from "../constants/actionTypes";
import { API_BASE_URL } from "../constants/general";
import CustomError from "../utility/CustomError";

export function loginRequest() {
  return {
    type: types.LOGIN_REQUEST
  };
}

export function loginSuccess(user) {
  return {
    type: types.LOGIN_SUCCESS,
    user
  };
}

export function loginFailure(error) {
  return {
    type: types.LOGIN_FAILURE,
    error
  };
}

/**
 * User login.
 * @param staffId
 * @param password
 */
export function loginAction(staffId, password) {
  return dispatch => {
    dispatch(loginRequest());

    let urlString = `${API_BASE_URL}/users/login`;

    return fetch(urlString, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        staffId,
        password
      })
    })
      .then(response => {
        if (response.ok) {
          console.log("Response Success");
          return response.json().then(json => {
            dispatch(loginSuccess(json["user"]));
          });
        } else {
          console.log("Response Error");
          response.json().then(json => {
            let customError = new CustomError(
              response.status,
              json.errorMessage,
              "Login Unsuccessful"
            );
            dispatch(loginFailure(customError));
          });
        }
      })
      .catch(error => {
        console.log("Error:", error);
        let customError = new CustomError(
          500,
          "Unable to login",
          "Login Unsuccessful"
        );
        dispatch(loginFailure(customError));
      });
  };
}
