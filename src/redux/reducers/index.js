import todos from "./todoReducer";
import mode from "./modeReducer";

import { combineReducers } from "redux";

const allReducers = combineReducers({
  todos,
  mode,
});

export default allReducers;