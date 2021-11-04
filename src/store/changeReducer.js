import { nominees } from "../configure";

const initState = {
  nominees,
};

export const REFILL_CHANGE = "REFILL_CHANGE";
export const GIVE_CHANGE_AND_UPDATE_BALANCE = "GIVE_CHANGE ";

export const changeReducer = (state = initState, action) => {
  switch (action.type) {
    case "REFILL_CHANGE":
      return { ...state, nominees: action.payload };
    case "GIVE_CHANGE ":
      return {
        ...state,
        nominees: action.payload,
      };
    default:
      return state;
  }
};
