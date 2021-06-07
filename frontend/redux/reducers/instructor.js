import {
  ADMIN_INSTRUCTOR_ADD, 
  ADMIN_ALL_INSTRUCTORS, 
  ADMIN_REMOVE_INSTRUCTOR, 
  ADMIN_GET_INSTRUCTOR_BY_ID,
  ADMIN_INSTRUCTOR_UPDATE} from "../constants/index"

export default (state = { AllData: null, instructorById: null}, action) => {
    switch (action.type) {
      case ADMIN_INSTRUCTOR_ADD:
        return { ...state};
      case ADMIN_ALL_INSTRUCTORS:
        return {...state, AllData: action?.data};
      case ADMIN_REMOVE_INSTRUCTOR:
        return { ...state};
      case ADMIN_GET_INSTRUCTOR_BY_ID:
        return { ...state, instructorById :action?.data};
      case ADMIN_INSTRUCTOR_UPDATE:
        return { ...state};
      default:
        return state;
    }
  };
  