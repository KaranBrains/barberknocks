import * as api from "../api";
import { ALL_BOOKINGS,GET_BOOKING_BY_ID } from "../constants/index";
import swal from "sweetalert";

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
  