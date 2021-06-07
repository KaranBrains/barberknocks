import * as api from "../api";
import { 
  ADMIN_INSTRUCTOR_ADD,
  ADMIN_ALL_INSTRUCTORS, 
  ADMIN_REMOVE_INSTRUCTOR, 
  ADMIN_GET_INSTRUCTOR_BY_ID, 
  ADMIN_INSTRUCTOR_UPDATE } from "../constants/index";
import swal from "sweetalert";

export const AddInstructor = (formData, router) => async (dispatch) => {
    try {
      const { data } = await api.addInstructor(formData);
      dispatch({ type: ADMIN_INSTRUCTOR_ADD, data });
      swal({
        text: "Instructor Added",
        icon: "success",
      });
      router.push("/admin/instructor");
    } catch (e) {
      console.log(e.response);
      swal({
        text: e.response?.data.msg,
        icon: "error",
      });
    }
};

export const AllInstructor = () => async (dispatch) => {
  try {
    const { data } = await api.allInstructor();
    dispatch({ type: ADMIN_ALL_INSTRUCTORS, data });
  } catch (e) {
    console.log(e.response);
    swal({
      text: e.response?.data.msg,
      icon: "error",
  });
}
};

export const RemoveInstructor = (id) => async (dispatch) => {
  try {
    const { data } = await api.removeInstructor(id);
    dispatch({ type: ADMIN_REMOVE_INSTRUCTOR, data });
    swal({
      text: "Instructor Removed",
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

export const GetInstructorById = (id) => async (dispatch) => {
  try {
    const { data } = await api.getInstructorById(id);
    dispatch({ type: ADMIN_GET_INSTRUCTOR_BY_ID, data });
  } catch (e) {
    console.log(e.response);
    swal({
      text: e.response?.data.msg,
      icon: "error",
  });
}
}

export const UpdateInstructorById = (id,formData) => async (dispatch) => {
  try {
    const { data } = await api.updateInstructor(id,formData);
    dispatch({ type: ADMIN_INSTRUCTOR_UPDATE, data });
    swal({
      text: "Instructor Updated",
      icon: "success",
    });
  } catch (e) {
    console.log(e.response);
    swal({
      text: e.response?.data.msg,
      icon: "error",
    });
  }
}
