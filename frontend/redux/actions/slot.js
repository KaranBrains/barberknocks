import * as api from "../api";
import { 
  ADMIN_SLOT_ADD, 
  ADMIN_ALL_SLOT, 
  ADMIN_REMOVE_SLOT, 
  ADMIN_UPDATE_BY_ID,
  GET_SLOT_BY_ID ,
  SERVICE_SLOT
} from "../constants/index";
import swal from "sweetalert";

export const AddSlot = (formData, router) => async (dispatch) => {
    try {
      const { data } = await api.addSlot(formData);
      dispatch({ type: ADMIN_SLOT_ADD, data });
      console.log(data);
      swal({
        text: "Slot Added",
        icon: "success",
      });
      router.push("/admin/slots");
    } catch (e) {
      console.log(e.response);
      swal({
        text: e.response?.data.msg,
        icon: "error",
      });
    }
};

export const AllSlots = () => async (dispatch) => {
  try {
    const { data } = await api.allSlot();
    dispatch({ type: ADMIN_ALL_SLOT, data });
  } catch (e) {
    console.log(e);
    swal({
      text: e.response?.data.msg,
      icon: "error",
    });
}
};

export const serviceSlots = (service,city) => async (dispatch) => {
  try {
    const { data } = await api.serviceSlot(service,city);
    dispatch({ type: SERVICE_SLOT, data });
  } catch (e) {
    console.log(e);
    swal({
      text: e.response?.data.msg,
      icon: "error",
    });
}
};

export const RemoveSlot = (id) => async (dispatch) => {
  try {
    const { data } = await api.removeSlot(id);
    dispatch({ type: ADMIN_REMOVE_SLOT, data });
    swal({
      text: "Slot Removed",
      icon: "success",
    });
  } catch (e) {
    console.log(e.response);
    swal({
      text:e.response?.data.msg ,
      icon: "error",
    });
}
};

export const UpdateSlot = (id, editFormData) => async (dispatch) => {
  try {
    const { data } = await api.updateSlotById(id, editFormData);
    dispatch({ type: ADMIN_UPDATE_BY_ID, data });
    swal({
      text: "Slot Updated",
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

export const GetSlotById = (id) => async (dispatch) => {
  try {
    const { data } = await api.getSlotById(id);
    dispatch({ type: GET_SLOT_BY_ID, data });
  } catch (e) {
    console.log(e.response);
    swal({
      text: e.response?.data.msg,
      icon: "error",
    });
}
}

  