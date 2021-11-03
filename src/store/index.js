import { createStore, combineReducers } from "redux";
import { mainReducer } from "./mainReducer";
import { changeReducer } from "./changeReducer";

const rootReducer = combineReducers({
  main: mainReducer,
  change: changeReducer,
});

export const store = createStore(rootReducer);
