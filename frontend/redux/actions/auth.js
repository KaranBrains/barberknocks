import * as api from "../api";
import {
  SIGN_IN,
  CLIENT_SIGN_UP,
  VERIFY_EMAIL,
  VERIFY_PHONE,
  EMAIL_OTP,
  PHONE_OTP,
  CHANGE_PASSWORD,
  VERIFY_FORGOT,
  ADD_ADDRESS,
  GET_USER_BY_EMAIL,
  GET_LOGGED_IN_USER,
} from "../constants";
import jwt from "jwt-decode";
import swal from "sweetalert";


// SIGNIN
export const signIn = (formData, router) => async (dispatch) => {
  try {
    const { data } = await api.signIn(formData);
    console.log(jwt(data.token));
    dispatch({ type: SIGN_IN, data });
    const role = jwt(data.token).role;
    if (role === 'admin') {
      window.location.href="/admin/users";
      return;
    }
    window.location.href="/home";
    swal({
      text: `You are logged in as ${role}`,
      icon: "success",
    });
  } catch (e) {
    swal({
      text: e.response?.data.msg,
      icon: "error",
    });
  }
};


// SIGNUP
export const signUp = (formData, router) => async (dispatch) => {
  try {
    try {
      await api.getPhoneOtp(formData.phone);
    } catch (e) {
      swal({
        text: "Wrong Number",
        icon: "error",
      });
      return;
    }
    const { data } = await api.signUp(formData);
    dispatch({ type: CLIENT_SIGN_UP, data });
    swal({
      text: "You are signed up",
      icon: "success",
    });
    await api.getEmailOtp(formData.email);
    localStorage.setItem("isEmailVerified", "false");
    router.push("/auth/email");
  } catch (e) {
    console.log(e.response);
    swal({
      text: e.response?.data.msg,
      icon: "error",
    });
  }
};

//Add Address
export const addAddress = (formData, id, router) => async (dispatch) => {
  try {
    const user = JSON.parse(localStorage.getItem("userProfile"))
    ? JSON.parse(localStorage.getItem("userProfile"))
    : jwt(localStorage.getItem("token"));
    const { data } = await api.addAddress(formData,user.email);
    dispatch({ type: ADD_ADDRESS, data });
    swal({
      text: "Address Added Successfully",
      icon: "success",
    });
    if (id=="address") {
      router.push("/");
    } else {
      router.push("/confirm-address/"+id);
    }
  } catch (e) {
    console.log(e.response);
    swal({
      text: e.response?.data.msg,
      icon: "error",
    });
  }
};


// EMAIL OTP
export const emailOtp = () => async (dispatch) => {
  try {
    const formData = JSON.parse(localStorage.getItem("userProfile"))
      ? JSON.parse(localStorage.getItem("userProfile"))
      : jwt(localStorage.getItem("token"));
    const { data } = await api.getEmailOtp(formData.email);
    swal({
      text: "Code is send to your email successfully",
      icon: "success",
    });
    dispatch({ type: EMAIL_OTP, data });
  } catch (e) {
    swal({
      text: e.response?.data.msg,
      icon: "error",
    });
  }
};

export const verifyEmailOtp = (otp, router) => async (dispatch) => {
  try {
    const formData = JSON.parse(localStorage.getItem("userProfile"))
      ? JSON.parse(localStorage.getItem("userProfile"))
      : jwt(localStorage.getItem("token"));
    const { data } = await api.verifyEmailOtp(otp, formData.email);
    dispatch({ type: VERIFY_EMAIL, data });
    swal({
      text: "Email is Verified",
      icon: "success",
    });
    localStorage.setItem("isEmailVerified", "true");
    localStorage.setItem("isNumberVerified", "false");
    router.push("/auth/phone");
    await api.getPhoneOtp(formData.phone);
  } catch (e) {
    console.log(e.response);
    swal({
      text: e.response?.data.msg,
      icon: "error",
    });
  }
};

export const changePassword = (password, router) => async (dispatch) => {
  try {
    const formData = localStorage.getItem("email");
    const token = localStorage.getItem("token");    
    const body = {
      email: formData,
      token: token,
      pass: password,
    };
    const { data } = await api.changePassword(body);
    dispatch({ type: CHANGE_PASSWORD, data });
    swal({
      text: "Password Changed",
      icon: "success",
    });
    router.push("/auth/login");
  } catch (e) {
    console.log(e);
    swal({
      text: e.response?.data.msg,
      icon: "error",
    });
  }
};

// PHONE OTP
export const phoneOtp = () => async (dispatch) => {
  try {
    const formData = JSON.parse(localStorage.getItem("userProfile"))
      ? JSON.parse(localStorage.getItem("userProfile"))
      : jwt(localStorage.getItem("token"));
    const { data } = await api.getPhoneOtp(formData.email);
    swal({
      text: "Code is send to your Phone successfully",
      icon: "success",
    });
    dispatch({ type: PHONE_OTP, data });
  } catch (e) {
    swal({
      text: e.response?.data.msg,
      icon: "error",
    });
  }
};

export const verifyPhoneOtp = (otp, router) => async (dispatch) => {
  try {
    const formData = JSON.parse(localStorage.getItem("userProfile"))
      ? JSON.parse(localStorage.getItem("userProfile"))
      : jwt(localStorage.getItem("token"));
    const { data } = await api.verifyPhoneOtp(
      otp,
      formData.email,
      `${formData.phone}`
    );
    dispatch({ type: VERIFY_PHONE, data });
    swal({
      text: "Phone Number is Verified",
      icon: "success",
    });
    localStorage.setItem("isNumberVerified", "true");
    router.push("/auth/login");
  } catch (e) {
    swal({
      text: e.response?.data.msg,
      icon: "error",
    });
  }
};

export const getUserByEmail = () => async (dispatch) => {
  try {
    const formData = JSON.parse(localStorage.getItem("userProfile"))
      ? JSON.parse(localStorage.getItem("userProfile"))
      : jwt(localStorage.getItem("token"));
    const { data } = await api.getUserByEmail(
      formData.email
    );
    dispatch({ type: GET_USER_BY_EMAIL, data });
  } catch (e) {
    swal({
      text: e.response?.data.msg,
      icon: "error",
    });
  }
};


export const forgotEmailOtp = (formData, router) => async (dispatch) => {
  try {
    const { data } = await api.getEmailOtp(formData.email);
    localStorage.setItem("email", formData.email);
    swal({
      text: "Code is send to your email successfully",
      icon: "success",
    });
    dispatch({ type: EMAIL_OTP, data });
    router.push("/auth/forgot/otp");
  } catch (e) {
    swal({
      text: e.response?.data.msg,
      icon: "error",
    });
  }
};

// LOGGED IN USER
export const getLoggedInUser= () => async (dispatch) => {
  try {
    const formData = jwt(localStorage.getItem("token"));
    console.log(formData)
      const { data } = await api.getUserById(formData.id);
      dispatch({ type: GET_LOGGED_IN_USER, data });
  } catch (e) {
      swal({
          text: e.response?.data.msg,
          icon: "error",
      });

  }
};

export const verifyForgotEmailOtp = (otp, router) => async (dispatch) => {
  try {
    const formData = localStorage.getItem("email");
    console.log(formData);
    const { data } = await api.verifyForgotEmailOtp(otp, formData);    
    dispatch({ type: VERIFY_FORGOT, data });    
    swal({
      text: "OTP Verified",
      icon: "success",
    });
    router.push("/auth/forgot/password");
  } catch (e) {
    swal({
      text: e.response?.data.msg,
      icon: "error",
    });
  }
};

// CHECKING AUTHENTICATION
export const isAuthenticated = () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      return false;
    } else {
      const decoded = jwt(token);
      if (decoded?.email) {
        return true;
      } else {
        return false;
      }
    }
  } catch (e) {
    swal({
      text: e.message,
      icon: "error",
    });
  }
};

export const isEmailVerified = () => {
  try {
    const isEmailVerified = localStorage.getItem("isEmailVerified");
    if (!isEmailVerified) {
      return "";
    } else {
      return isEmailVerified;
    }
  } catch (e) {
    swal({
      text: e.message,
      icon: "error",
    });
  }
};

export const isNumberVerified = () => {
  try {
    const isNumberVerified = localStorage.getItem("isNumberVerified");
    if (!isNumberVerified) {
      return "";
    } else {
      return isNumberVerified;
    }
  } catch (e) {
    swal({
      text: e.message,
      icon: "error",
    });
  }
};
