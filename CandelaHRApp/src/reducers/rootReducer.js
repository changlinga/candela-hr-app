import { combineReducers } from "redux";
import userReducer from "./userReducer";
import publicKeyReducer from "./publicKeyReducer";

const rootReducer = combineReducers({
  user: userReducer,
  publicKey: publicKeyReducer
});

export default rootReducer;
