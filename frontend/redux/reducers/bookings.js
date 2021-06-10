import { GET_MY_BOOKINGS } from "../constants/index"

export default (state = { MyBookingData: null}, action) => {
    switch (action.type) {
      case GET_MY_BOOKINGS:
        return { ...state, MyBookingData: action?.data};
      default:
        return state;
    }
  };
  