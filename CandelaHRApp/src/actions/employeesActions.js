import * as types from "../constants/actionTypes";
import { API_BASE_URL } from "../constants/general";
import CustomError from "../utility/CustomError";

export function employeesListRequest() {
  return {
    type: types.EMPLOYEES_LIST_REQUEST
  };
}

export function employeesListSuccess(employees) {
  return {
    type: types.EMPLOYEES_LIST_SUCCESS,
    employees
  };
}

export function employeesListFailure(error) {
  return {
    type: types.EMPLOYEES_LIST_FAILURE,
    error
  };
}

/**
 * List the employees.
 */
export function employeesListAction() {
  return (dispatch, getState) => {
    dispatch(employeesListRequest());

    let urlString = `${API_BASE_URL}/users`;

    return fetch(urlString, {
      method: "GET",
      headers: {
        Accesstoken: getState().user.user.accesstoken
      }
    })
      .then(response => {
        if (response.ok) {
          console.log("Response Success");
          return response.json().then(json => {
            dispatch(employeesListSuccess(json["users"]));
          });
        } else {
          console.log("Response Error");
          response.json().then(json => {
            let customError = new CustomError(
              json.status_code,
              json.status_message,
              "Retrieve Employees Unsuccessful"
            );
            dispatch(employeesListFailure(customError));
          });
        }
      })
      .catch(error => {
        console.log("Error:", error);
        let customError = new CustomError(
          500,
          "Unable to retrieve employees",
          "Retrieve Employees Unsuccessful"
        );
        dispatch(employeesListFailure(customError));
      });
  };
}
