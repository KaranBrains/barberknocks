import { combineReducers } from "redux";
import main from "./auth";
import slot from "./slot";
import contact from "./contact";
import instructor from "./instructor";
import user from "./user";
import rides from "./rides";
import ride from "./ride";

const rootReducer = combineReducers({
  main,
  slot,
  instructor,
  user,
  contact,
  rides,
  ride
});

export default rootReducer;
