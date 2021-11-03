const nominees = [
  { nominee: 100, qty: 3 },
  { nominee: 50, qty: 5 },
  { nominee: 20, qty: 6 },
  { nominee: 10, qty: 8 },
  { nominee: 5, qty: 10 },
  { nominee: 1, qty: 20 },
];

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
