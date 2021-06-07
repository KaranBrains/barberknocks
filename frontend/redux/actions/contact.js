import * as api from "../api";
import { CONTACT_US } from "../constants";
import swal from "sweetalert";

export const contactUs = (formData, router) => async (dispatch) => {
  try {
    const { data } = await api.contactUs(formData);
    dispatch({ type: CONTACT_US, data });
    swal({
      text:
        "We have received your message , we will try to get back to you ASAP.",
      icon: "success",
    });
    router.push("/");
  } catch (e) {
    swal({
      text: e.response?.data.msg,
      icon: "error",
    });
  }
};
