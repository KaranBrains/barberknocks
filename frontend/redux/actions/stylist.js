import * as api from "../api";
import { 
  ADMIN_STYLIST_ADD,
  ADMIN_ALL_STYLISTS, 
  ADMIN_REMOVE_STYLIST, 
  ADMIN_GET_STYLIST_BY_ID,  } from "../constants/index";
import swal from "sweetalert";

export const AddStylist = (formData, router) => async (dispatch) => {
    try {
      const { data } = await api.addStylist(formData);
      dispatch({ type: ADMIN_STYLIST_ADD, data });
      swal({
        text: "Stylist Added",
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

export const AllStylist = () => async (dispatch) => {
  try {
    const { data } = await api.allStylist();
    dispatch({ type: ADMIN_ALL_STYLISTS, data });
  } catch (e) {
    console.log(e.response);
    swal({
      text: e.response?.data.msg,
      icon: "error",
  });
}
};

export const RemoveStylist = (id) => async (dispatch) => {
  try {
    const { data } = await api.removeStylist(id);
    dispatch({ type: ADMIN_REMOVE_STYLIST, data });
    swal({
      text: "Stylist Removed",
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

export const GetStylistById = (id) => async (dispatch) => {
  try {
    const { data } = await api.getStylistById(id);
    console.log(data);
    dispatch({ type: ADMIN_GET_STYLIST_BY_ID, data });
  } catch (e) {
    console.log(e.response);
    swal({
      text: e.response?.data.msg,
      icon: "error",
  });
}
}

// export const UpdateInstructorById = (id,formData) => async (dispatch) => {
//   try {
//     const { data } = await api.updateInstructor(id,formData);
//     dispatch({ type: ADMIN_INSTRUCTOR_UPDATE, data });
//     swal({
//       text: "Instructor Updated",
//       icon: "success",
//     });
//   } catch (e) {
//     console.log(e.response);
//     swal({
//       text: e.response?.data.msg,
//       icon: "error",
//     });
//   }
// }
