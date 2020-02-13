import { combineReducers } from "redux";
import userReducer from "./userReducer";
import publicKeyReducer from "./publicKeyReducer";
import employeesReducer from "./employeesReducer";

const rootReducer = combineReducers({
  user: userReducer,
  publicKey: publicKeyReducer,
  employees: employeesReducer
});

export default rootReducer;
