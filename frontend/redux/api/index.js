import axios from "axios";

export const url = "http://localhost:8082/api";
export const paymentUrl = "http://localhost:8082/api/create-checkout-session";
// export const baseUrl = "http://localhost:8082/";

// export const url = "https://www.pigameapp.com:8081/api";
export const baseUrl = "https://www.pigameapp.com:8081/";

// export const url = "https://www.pigameapp.com:8081/api";
// export const baseUrl = "https://www.pigameapp.com:8081/";
// export const paymentUrl = "https://www.pigameapp.com:8081/api/create-checkout-session";
// rebuild

export const signIn = (formData) => axios.post(`${url}/login`, formData);
export const signUp = (formData) => axios.post(`${url}/signup`, formData);
export const getEmailOtp = (email) =>
  axios.get(`${url}/get-email-otp?email=${email}`);
export const getPhoneOtp = (phone) =>
  axios.get(`${url}/get-phone-otp?phone=${phone}`);
export const verifyEmailOtp = (otp, email) =>
  axios.post(`${url}/verify-email-otp`, { otp, email });
export const verifyForgotEmailOtp = (otp, email) =>
  axios.post(`${url}/verify-forgot`, { otp, email });
export const verifyPhoneOtp = (otp, email, phone) =>
  axios.post(`${url}/verify-phone-otp?phone=${phone}&email=${email}`, {
    verificationCode: otp,
  });
export const changePassword = (body) =>
  axios.put(`${url}/change-password`, body);

export const addSlot = (formdata) => axios.post(`${url}/add-slot`, formdata);
export const allSlot = () => axios.get(`${url}/all-slots`);
export const removeSlot = (id) => axios.delete(`${url}/delete-slot?id=${id}`);
export const updateSlotById = (id, editFormData) =>
  axios.put(`${url}/slot?id=${id}`, editFormData);
export const addStylist = (formdata) =>
  axios.post(`${url}/add-stylist`, formdata);
export const allStylist = () => axios.get(`${url}/get-stylists`);
export const removeStylist = (id) =>
  axios.delete(`${url}/delete-stylist?id=${id}`);
  export const addService = (formdata) =>
  axios.post(`${url}/add-service`, formdata);
export const allService = () => axios.get(`${url}/get-services`);
export const removeService = (id) =>
  axios.delete(`${url}/delete-services?id=${id}`);
export const getStylistById = (id) =>
  axios.get(`${url}/stylist?id=${id}`);
export const getSlotById = (id) => axios.get(`${url}/slot?id=${id}`);
export const getBookingById = (id) => axios.get(`${url}/booking?id=${id}`);
export const updateInstructor = (id, formdata) =>
  axios.put(`${url}/update-instructor?id=${id}`, formdata);
export const addAddress = (formdata, email) =>
  axios.post(`${url}/add-address?email=${email}`, formdata);
export const contactUs = (formData) =>
  axios.post(`${url}/contact-us`, { formData });
export const getUserByEmail = (email) =>
  axios.get(`${url}/user-email?email=${email}`);
export const endRide = (ride) =>
  axios.get(`${url}/end-ride?ride=${ride}`);
export const confirmRideCash = (formData,address) =>
  axios.post(`${url}/add-booking-cash?address=${address}`, formData);
export const confirmRideOnline = (session,address) =>
  axios.post(`${url}/confirm-ride-online?id=${session}&address=${address}`);
export const payment = (formData) => axios.post(paymentUrl, formData);
export const allUser = () => axios.get(`${url}/admin/get-users`);
export const allBookings = () => axios.get(`${url}/all-bookings`);
export const getUserById = (id) => axios.get(`${url}/admin/get-user?id=${id}`);
export const getRides = (id) => axios.get(`${url}/my-rides?id=${id}`);
export const getRidesById = (id) => axios.get(`${url}/ride?id=${id}`)
export const myBookings = (id) => axios.get(`${url}/my-bookings?id=${id}`);
