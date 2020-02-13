import * as types from "../constants/actionTypes";

const initialState = {
  employees: [],
  loading: false,
  error: null
};

function employeesReducer(state = initialState, action) {
  switch (action.type) {
    case types.EMPLOYEES_LIST_REQUEST:
    case types.EMPLOYEE_ADD_REQUEST:
      return Object.assign({}, state, {
        loading: true,
        error: null
      });

    case types.EMPLOYEES_LIST_SUCCESS:
      return Object.assign({}, state, {
        employees: action.employees,
        loading: false,
        error: null
      });

    case types.EMPLOYEE_ADD_SUCCESS:
      return Object.assign({}, state, {
        employees: [...state.employees, action.employee],
        loading: false,
        error: null
      });

    case types.EMPLOYEES_LIST_FAILURE:
    case types.EMPLOYEE_ADD_FAILURE:
      return Object.assign({}, state, {
        loading: false,
        error: action.error
      });

    default:
      return state;
  }
}

export default employeesReducer;
