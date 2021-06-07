import * as api from "../api";
import { ALL_USERS, USER_BY_ID } from "../constants/index";
import swal from "sweetalert";

export const AllUser = () => async (dispatch) => {
    try {
      const { data } = await api.allUser();
      dispatch({ type: ALL_USERS, data });
    } catch (e) {
      console.log(e.response);
      swal({
        text: e.response?.data.msg,
        icon: "error",
    });
  }
  };
  
  export const UserById = (id) => async (dispatch) => {
    try {
      const { data } = await api.getUserById(id);
      dispatch({ type: USER_BY_ID, data });
    } catch (e) {
      console.log(e);
      swal({
        text: e.response?.data.msg,
        icon: "error",
    });
  }
  }
  