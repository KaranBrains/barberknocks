import {
  ADMIN_STYLIST_ADD, 
  ADMIN_ALL_STYLISTS, 
  ADMIN_REMOVE_STYLIST, 
  ADMIN_GET_STYLIST_BY_ID,
  ADMIN_STYLIST_UPDATE} from "../constants/index"

export default (state = { AllData: null, stylistById: null}, action) => {
    switch (action.type) {
      case ADMIN_STYLIST_ADD:
        return { ...state};
      case ADMIN_ALL_STYLISTS:
        return {...state, AllData: action?.data};
      case ADMIN_REMOVE_STYLIST:
        return { ...state};
      case ADMIN_GET_STYLIST_BY_ID:
        console.log(action?.data)
        return { ...state, stylistById :action?.data};
      case ADMIN_STYLIST_UPDATE:
        return { ...state};
      default:
        return state;
    }
  };
  