import {ADMIN_SLOT_ADD, ADMIN_ALL_SLOT, ADMIN_REMOVE_SLOT, ADMIN_UPDATE_BY_ID , GET_SLOT_BY_ID} from "../constants/index"

export default (state = { slotData: null, slotDataById : null , slot: null}, action) => {
    switch (action.type) {
      case ADMIN_SLOT_ADD:
        return { ...state};
      case ADMIN_ALL_SLOT:
        return { ...state, slotData: action?.data};
      case ADMIN_REMOVE_SLOT:
        return { ...state};
      case ADMIN_UPDATE_BY_ID:
        return { ...state, slotDataById:  action?.data};
      case GET_SLOT_BY_ID:
        return { ...state, slot:  action?.data};
      default:
        return state;
    }
  };
  