import { AsyncStorage } from "react-native";

import * as types from "../constants/actionTypes";
import { API_BASE_URL, ASYNCSTORAGE_KEY_USER } from "../constants/general";
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
 * Authenticate user whether login or not.
 */
export function authenticateAction() {
  return dispatch => {
    return AsyncStorage.getItem(ASYNCSTORAGE_KEY_USER, (error, user) => {
      if (error) {
        console.log("Error retrieving user.", error);
      }
    }).then(user => {
      if (user !== null) {
        dispatch(loginSuccess(JSON.parse(user)));
        return true;
      }
      return false;
    });
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
            let user = json["user"];
            saveUser(user);
            dispatch(loginSuccess(user));
          });
        } else {
          console.log("Response Error");
          return response.json().then(json => {
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

/**
 * User logout.
 */
export function logoutAction() {
  AsyncStorage.removeItem(ASYNCSTORAGE_KEY_USER, error => {
    if (error) {
      console.log("Error removing user.", error);
    }
  });
}

function saveUser(user) {
  AsyncStorage.setItem(ASYNCSTORAGE_KEY_USER, JSON.stringify(user), error => {
    if (error) {
      console.log("Error saving user.", error);
    }
  });
}
