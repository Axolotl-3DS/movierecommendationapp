import { combineReducers } from "redux";

import userReducer from "./userReducer";
import favsReducer from "./favsReducer";

const reducers = combineReducers({
  user: userReducer,
  favs: favsReducer,
});

export default reducers;
