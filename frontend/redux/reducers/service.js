import {
    ADMIN_SERVICE_ADD, 
    ADMIN_ALL_SERVICES, 
    ADMIN_REMOVE_SERVICE, 
} from "../constants/index"
  
  export default (state = { AllData: null}, action) => {
      switch (action.type) {
        case ADMIN_SERVICE_ADD:
          return { ...state};
        case ADMIN_ALL_SERVICES:
          return {...state, AllData: action?.data};
        case ADMIN_REMOVE_SERVICE:
          return { ...state};
        default:
          return state;
      }
    };
    