import * as types from "../constants/actionTypes";

const initialState = {
  user: null,
  loading: false,
  error: null
};

function userReducer(state = initialState, action) {
  switch (action.type) {
    case types.LOGIN_REQUEST:
      return Object.assign({}, state, {
        loading: true,
        error: null
      });

    case types.LOGIN_SUCCESS:
      return Object.assign({}, state, {
        user: action.user,
        loading: false,
        error: null
      });

    case types.LOGIN_FAILURE:
      return Object.assign({}, state, {
        loading: false,
        error: action.error
      });

    default:
      return state;
  }
}

export default userReducer;
