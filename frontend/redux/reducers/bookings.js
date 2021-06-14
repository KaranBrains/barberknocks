import { GET_MY_BOOKINGS, ALL_BOOKINGS, GET_BOOKING_BY_ID ,END_BOOKING , GIVE_FEEDBACK , CANCEL_BOOKING} from "../constants/index"

export default (state = { MyBookingData: null, AllBbookings: null, BookingByID: null , endBooking: null ,feedback: null , cancel: null}, action) => {
    switch (action.type) {
    case GET_MY_BOOKINGS:
        return { ...state, MyBookingData: action?.data};
      case ALL_BOOKINGS:
          console.log(action?.data)
        return { ...state, AllBbookings : action?.data};
      case GET_BOOKING_BY_ID:
        console.log(action?.data)
      return { ...state, BookingByID : action?.data};
      case END_BOOKING:
        console.log(action?.data)
      return { ...state, endBooking : action?.data};
      case GIVE_FEEDBACK:
        console.log(action?.data)
      return { ...state, feedback : action?.data};
      case CANCEL_BOOKING:
        console.log(action?.data)
      return { ...state, cancel : action?.data};
      default:
        return state;
    }
  };
  