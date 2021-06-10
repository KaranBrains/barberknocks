import * as api from "../api";
import { GET_MY_BOOKINGS, ALL_BOOKINGS,GET_BOOKING_BY_ID } from "../constants/index";
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

export const AllBookingsDetails = () => async (dispatch) => {
    try {
      const { data } = await api.allBookings();
      dispatch({ type: ALL_BOOKINGS, data });
    } catch (e) {
      console.log(e.response);
      swal({
        text: e.response?.data.msg,
        icon: "error",
    });
  }
  };

  export const GetBookingById = (id) => async (dispatch) => {
    try {
      const { data } = await api.getBookingsById(id);
      dispatch({ type: GET_BOOKING_BY_ID, data });
    } catch (e) {
      console.log(e.response);
      swal({
        text: e.response?.data.msg,
        icon: "error",
    });
  }
  }
  
