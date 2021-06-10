import * as api from "../api";
import { GET_MY_BOOKINGS } from "../constants/index";
import swal from "sweetalert";
import jwt from "jwt-decode";

export const MyBookings = () => async (dispatch) => {
    try {
      const user = jwt(localStorage.getItem("token"));
      const { data } = await api.myBookings(user.id);
      dispatch({ type: GET_MY_BOOKINGS, data });
    } catch (e) {
      console.log(e);
      swal({
        text: e.response?.data.msg,
        icon: "error",
      });
  }
  };