import { CONTACT_US } from "../constants";

export default (state = { contactData: null }, action) => {
  switch (action.type) {
    case CONTACT_US:
      console.log(action?.data);
      return { ...state, contactData: action?.data };
    default:
      return state;
  }
};
