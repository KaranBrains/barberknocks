import {
    CONFIRM_RIDE_CASH,
    GET_RIDE_BY_ID,
    CONFIRM_RIDE_ONLINE,
    GET_MY_RIDES,
    END_RIDE
  } from "../constants";
  
  export default (state = { rideData: null }, action) => {
    switch (action.type) {
      case CONFIRM_RIDE_CASH:
        console.log(action?.data);
        return { ...state, rideData: action?.data };
    case CONFIRM_RIDE_ONLINE:
        console.log(action?.data);
        return { ...state, rideData: action?.data };
    case GET_RIDE_BY_ID:
        console.log(action?.data);
        return { ...state, rideData: action?.data };
    case GET_MY_RIDES:
        console.log(action?.data);
        return { ...state, rideData: action?.data };
    case END_RIDE:
        console.log(action?.data);
        return { ...state, rideData: action?.data };
      default:
        return state;
    }
  };
  