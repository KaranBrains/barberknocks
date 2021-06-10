import { GET_MY_BOOKINGS, ALL_BOOKINGS, GET_BOOKING_BY_ID } from "../constants/index"

export default (state = { MyBookingData: null, AllBbookings: null, BookingByID: null}, action) => {
    switch (action.type) {
    case GET_MY_BOOKINGS:
        return { ...state, MyBookingData: action?.data};
      case ALL_BOOKINGS:
          console.log(action?.data)
        return { ...state, AllBbookings : action?.data};
      case GET_BOOKING_BY_ID:
        console.log(action?.data)
      return { ...state, BookingByID : action?.data};
      default:
        return state;
    }
  };
  