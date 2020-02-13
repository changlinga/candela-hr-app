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

export function employeeAddRequest() {
  return {
    type: types.EMPLOYEE_ADD_REQUEST
  };
}

export function employeeAddSuccess(employee) {
  return {
    type: types.EMPLOYEE_ADD_SUCCESS,
    employee
  };
}

export function employeeAddFailure(error) {
  return {
    type: types.EMPLOYEE_ADD_FAILURE,
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
          return response.json().then(json => {
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

/**
 * Add an employee.
 */
export function employeeAddAction(params) {
  return (dispatch, getState) => {
    dispatch(employeeAddRequest());

    let urlString = `${API_BASE_URL}/users`;

    return fetch(urlString, {
      method: "POST",
      headers: {
        Accesstoken: getState().user.user.accesstoken,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(params)
    })
      .then(response => {
        if (response.ok) {
          console.log("Response Success");
          return response.json().then(json => {
            dispatch(employeeAddSuccess(json["user"]));
          });
        } else {
          console.log("Response Error");
          return response.json().then(json => {
            let customError = new CustomError(
              json.status_code,
              json.status_message,
              "Add Employee Unsuccessful"
            );
            dispatch(employeeAddFailure(customError));
          });
        }
      })
      .catch(error => {
        console.log("Error:", error);
        let customError = new CustomError(
          500,
          "Unable to add employee",
          "Add Employee Unsuccessful"
        );
        dispatch(employeeAddFailure(customError));
      });
  };
}
