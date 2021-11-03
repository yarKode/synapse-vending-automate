import { createStore } from "redux";

export const items = [
  { code: 1, name: "js", price: 10, qty: 5, color: "#845EC2" },
  { code: 2, name: "react", price: 12, qty: 1, color: "#2C73D2" },
  { code: 3, name: "redux", price: 9, qty: 3, color: "#00C9A7" },
  { code: 4, name: "next.js", price: 11, qty: 2, color: "#4D8076" },
];

const initState = {
  itemPadVal: "-",
  selectedItem: "",
  moneyReceived: 0,
  change: 0,
  itemOutput: "",
  items,
  refillInterface: false,
};

export const ITEM_PAD_VAL = "ITEM_PAD_VALUE";
export const RESET_PAD = "RESET_PAD";
export const SET_SELECTED_ITEM = "SET_SELECTED_ITEM";
export const PUT_MONEY = "PUT_MONEY";
export const GIVE_ITEM_AND_CHANGE = "GIVE_ITEM_AND_CHANGE";
export const GET_CHANGE = "GET_CHANGE";
export const GET_ITEM = "GET_ITEM";
export const SHOW_ADMIN = "SHOW_ADMIN";

const reducer = (state = initState, action) => {
  switch (action.type) {
    case "ITEM_PAD_VALUE":
      return {
        ...state,
        itemPadVal:
          state.itemPadVal === "-"
            ? String(action.payload)
            : String(state.itemPadVal) + action.payload,
      };
    case "RESET_PAD":
      return {
        ...state,
        itemPadVal: action.payload,
      };
    case "SET_SELECTED_ITEM":
      return { ...state, selectedItem: action.payload };
    case "PUT_MONEY":
      return {
        ...state,
        moneyReceived: state.moneyReceived + action.payload,
      };
    case "GIVE_ITEM_AND_CHANGE":
      return {
        ...state,
        itemPadVal: "-",
        selectedItem: "",
        moneyReceived: 0,
        itemOutput: action.payload.itemOutput,
        change: action.payload.change,
        items: action.payload.items,
      };
    case "GET_CHANGE":
      return {
        ...state,
        change: 0,
      };
    case "GET_ITEM":
      return {
        ...state,
        itemOutput: "",
      };
    case "SHOW_ADMIN":
      return {
        ...state,
        refillInterface: !state.refillInterface,
      };
    default:
      return state;
  }
};

export const store = createStore(reducer);
