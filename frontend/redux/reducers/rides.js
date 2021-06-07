import { ALL_RIDES, GET_RIDE_BY_ID } from "../constants/index"

export default (state = { AllRides: null, RideByID: null}, action) => {
    switch (action.type) {
      case ALL_RIDES:
          console.log(action?.data)
        return { ...state, AllRides : action?.data};
      case GET_RIDE_BY_ID:
        console.log(action?.data)
      return { ...state, RideByID : action?.data};
      default:
        return state;
    }
  };
  