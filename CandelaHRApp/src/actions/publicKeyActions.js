import * as types from "../constants/actionTypes";
import { API_BASE_URL } from "../constants/general";
import CustomError from "../utility/CustomError";

export function publicKeyGetRequest() {
  return {
    type: types.PUBLIC_KEY_GET_REQUEST
  };
}

export function publicKeyGetSuccess(publicKey) {
  return {
    type: types.PUBLIC_KEY_GET_SUCCESS,
    publicKey
  };
}

export function publicKeyGetFailure(error) {
  return {
    type: types.PUBLIC_KEY_GET_FAILURE,
    error
  };
}

/**
 * Retrieve public key.
 */
export function publicKeyGetAction() {
  return dispatch => {
    dispatch(publicKeyGetRequest());

    let urlString = `${API_BASE_URL}/publicKey`;

    return fetch(urlString, {
      method: "GET"
    })
      .then(response => {
        if (response.ok) {
          console.log("Response Success");
          return response.json().then(json => {
            dispatch(publicKeyGetSuccess(json["publicKey"]));
          });
        } else {
          console.log("Response Error");
          response.json().then(json => {
            let customError = new CustomError(
              response.status,
              json.errorMessage,
              "Retrieve Public Key Unsuccessful"
            );
            dispatch(publicKeyGetFailure(customError));
          });
        }
      })
      .catch(error => {
        console.log("Error:", error);
        let customError = new CustomError(
          500,
          "Unable to retrieve public key",
          "Retrieve Public Key Unsuccessful"
        );
        dispatch(publicKeyGetFailure(customError));
      });
  };
}
