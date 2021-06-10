import { combineReducers } from "redux";
import main from "./auth";
import slot from "./slot";
import contact from "./contact";
import stylist from "./stylist";
import user from "./user";
import rides from "./rides";
import ride from "./ride";
import bookings from "./bookings";
import service from "./service";
import bookings from "./bookings";

const rootReducer = combineReducers({
  main,
  slot,
  stylist,
  user,
  contact,
  rides,
  ride,
  service,
  bookings,
  bookings,
  service,
});

export default rootReducer;
