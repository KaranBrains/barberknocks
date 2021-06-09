import * as api from "../api";
import { 
  ADMIN_SERVICE_ADD,
  ADMIN_ALL_SERVICES, 
  ADMIN_REMOVE_SERVICE, 
} from "../constants/index";
import swal from "sweetalert";

export const addService = (formData, router) => async (dispatch) => {
    try {
      const { data } = await api.addService(formData);
      dispatch({ type: ADMIN_SERVICE_ADD, data });
      swal({
        text: "Service Added",
        icon: "success",
      });
      router.push("/admin/service");
    } catch (e) {
      console.log(e.response);
      swal({
        text: e.response?.data.msg,
        icon: "error",
      });
    }
};

export const allService = () => async (dispatch) => {
  try {
    const { data } = await api.allService();
    dispatch({ type: ADMIN_ALL_SERVICES, data });
  } catch (e) {
    console.log(e.response);
    swal({
      text: e.response?.data.msg,
      icon: "error",
  });
}
};

export const removeService = (id) => async (dispatch) => {
  try {
    const { data } = await api.removeService(id);
    dispatch({ type: ADMIN_REMOVE_SERVICE, data });
    swal({
      text: "Service Removed",
      icon: "success",
    });
  } catch (e) {
    console.log(e.response);
    swal({
      text: e.response?.data.msg,
      icon: "error",
  });
}
};

