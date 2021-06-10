import * as api from "../api";
import { CONFIRM_RIDE_CASH, GET_RIDE_BY_ID,CONFIRM_RIDE_ONLINE ,GET_MY_RIDES ,END_RIDE} from "../constants/index";
import swal from "sweetalert";
import jwt from "jwt-decode";

export const confirmRideCash = (slot ,router) => async (dispatch) => {
    try {
        const user = jwt(localStorage.getItem("token"));
        const formData = {
            slot : slot,
            client: user.id
        }
        const address = localStorage.getItem("address");
        const { data } = await api.confirmRideCash(formData,address);
        dispatch({ type: CONFIRM_RIDE_CASH, data });
        swal({
            text: "Booking Confirmed",
            icon: "success",
        });
        router.push('/booking-details/'+data._id)
    } catch (e) {
        console.log(e);
        swal({
            text: e.response?.data.msg,
            icon: "error",
        });
    }
};

export const endRide = (ride ,router) => async (dispatch) => {
    try {
        const { data } = await api.endRide(ride);
        dispatch({ type: END_RIDE, data });
        swal({
            text: "Class Ended",
            icon: "success",
        });
        router.push('/admin/all-rides')
    } catch (e) {
        console.log(e);
        swal({
            text: e.response?.data.msg,
            icon: "error",
        });
    }
};

export const confirmRideOnline = (router) => async (dispatch) => {
    try {
        const session = localStorage.getItem("session");
        const address = localStorage.getItem("address");
        const { data } = await api.confirmRideOnline(session,address);
        dispatch({ type: CONFIRM_RIDE_ONLINE, data });
        swal({
            text: "Booking Confirmed",
            icon: "success",
        });
        router.push('/booking-details/'+data._id)
    } catch (e) {
        swal({
            text: e.response?.data.msg,
            icon: "error",
        });
    }
};

export const getRideById = (id) => async (dispatch) => {
    try {
        const { data } = await api.getRideById(id);
        dispatch({ type: GET_RIDE_BY_ID, data });
    } catch (e) {
        console.log(e.response);
        swal({
            text: e.response?.data.msg,
            icon: "error",
        });
    }
};

export const getMyRides = () => async (dispatch) => {
    try {
        const user = jwt(localStorage.getItem("token"));
        const { data } = await api.getRides(user.id);
        dispatch({ type: GET_MY_RIDES, data });
    } catch (e) {
        console.log(e.response);
        swal({
            text: e.response?.data.msg,
            icon: "error",
        });
    }
};
  
  