import * as types from "../constants/actionTypes";

const initialState = {
  publicKey: null,
  loading: false,
  error: null
};

function publicKeyReducer(state = initialState, action) {
  switch (action.type) {
    case types.PUBLIC_KEY_GET_REQUEST:
      return Object.assign({}, state, {
        loading: true,
        error: null
      });

    case types.PUBLIC_KEY_GET_SUCCESS:
      return Object.assign({}, state, {
        publicKey: action.publicKey,
        loading: false,
        error: null
      });

    case types.PUBLIC_KEY_GET_FAILURE:
      return Object.assign({}, state, {
        loading: false,
        error: action.error
      });

    default:
      return state;
  }
}

export default publicKeyReducer;
