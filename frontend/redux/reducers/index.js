import { combineReducers } from "redux";
import main from "./auth";
import slot from "./slot";
import contact from "./contact";
import stylist from "./stylist";
import user from "./user";
import rides from "./rides";
import ride from "./ride";
import service from "./service";

const rootReducer = combineReducers({
  main,
  slot,
  stylist,
  user,
  contact,
  rides,
  ride,
  service
});

export default rootReducer;
