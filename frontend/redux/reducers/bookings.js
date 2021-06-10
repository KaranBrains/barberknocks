import { ALL_BOOKINGS, GET_BOOKING_BY_ID } from "../constants/index"

export default (state = { AllBbookings: null, BookingByID: null}, action) => {
    switch (action.type) {
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
  