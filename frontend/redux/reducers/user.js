import { ALL_USERS, USER_BY_ID } from "../constants/index"

export default (state = { AllUsers: null, UsersById : null}, action) => {
    switch (action.type) {
      case ALL_USERS:
          console.log(action?.data)
        return { ...state, AllUsers : action?.data};
      case USER_BY_ID:
        console.log(action?.data)
      return { ...state, UsersById : action?.data};
      default:
        return state;
    }
  };
  