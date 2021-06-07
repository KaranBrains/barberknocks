import * as api from "../api";
import { ALL_RIDES,GET_RIDE_BY_ID } from "../constants/index";
import swal from "sweetalert";

export const AllRidesDetails = () => async (dispatch) => {
    try {
      const { data } = await api.allRides();
      dispatch({ type: ALL_RIDES, data });
    } catch (e) {
      console.log(e.response);
      swal({
        text: e.response?.data.msg,
        icon: "error",
    });
  }
  };

  export const GetRideById = (id) => async (dispatch) => {
    try {
      const { data } = await api.getRidesById(id);
      dispatch({ type: GET_RIDE_BY_ID, data });
    } catch (e) {
      console.log(e.response);
      swal({
        text: e.response?.data.msg,
        icon: "error",
    });
  }
  }
  