import {
  SIGN_IN,
  CLIENT_SIGN_UP,
  DRIVER_SIGN_UP,
  LOGOUT,
  VERIFY_EMAIL,
  VERIFY_PHONE,
  VERIFY_ID,
  ADD_VEHICLE,
  EMAIL_OTP,
  PHONE_OTP,
  VERIFY_FORGOT,
  CHANGE_PASSWORD,
  ADD_ADDRESS,
  GET_USER_BY_EMAIL,
  GET_LOGGED_IN_USER,
} from "../constants";
import swal from "sweetalert";

export default (state = { authData: null }, action) => {
  switch (action.type) {
    case SIGN_IN:
      action.data.token && localStorage.setItem("token", action?.data.token);
      console.log(action?.data);
      return { ...state, authData: action?.data };
    case CLIENT_SIGN_UP:
      console.log(action?.data);
      return { ...state, authData: action?.data };
    case DRIVER_SIGN_UP:
      console.log(action?.data);
      return { ...state, authData: action?.data };
    case VERIFY_EMAIL:
      console.log(action?.data);
      return { ...state, authData: action?.data };
    case VERIFY_PHONE:
      console.log(action?.data);
      return { ...state, authData: action?.data };
    case ADD_ADDRESS:
      console.log(action?.data);
      return { ...state, authData: action?.data };
    case VERIFY_ID:
      console.log(action?.data);
      return { ...state, authData: action?.data };
    case ADD_VEHICLE:
      console.log(action?.data);
      return { ...state, authData: action?.data };
    case EMAIL_OTP:
      console.log(action?.data);
      return { ...state, authData: action?.data };
    case LOGOUT:
      localStorage.clear();
      window.location.href="/";
      swal({
        text: `You are logged out`,
        icon: "success",
      });
      return { ...state, authData: null };
    case PHONE_OTP:
      console.log(action?.data);
      return { ...state, authData: action?.data };
    case VERIFY_FORGOT:
      console.log(action?.data);
      action.data.token &&
        localStorage.setItem("forgotToken", action?.data.token);
      return { ...state, authData: action?.data };
    case CHANGE_PASSWORD:
      localStorage.clear();
      return { ...state, authData: null };
    case GET_USER_BY_EMAIL:
      console.log(action?.data);
      return { ...state, authData: action?.data };
    case GET_LOGGED_IN_USER:
      console.log(action?.data);
      action.data.token &&
        localStorage.setItem("forgotToken", action?.data.token);
      return { ...state, authData: action?.data };
    default:
      return state;
  }
};
