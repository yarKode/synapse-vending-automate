import { items } from "./../configure";

const initState = {
  itemPadVal: "-",
  selectedItem: "",
  moneyReceived: 0,
  change: 0,
  itemOutput: "",
  items,
  refillInterface: false,
  modalWindow: {
    isShown: false,
    title: "Your Change:",
    content: [],
  },
};

export const ITEM_PAD_VAL = "ITEM_PAD_VALUE";
export const RESET_PAD = "RESET_PAD";
export const SET_SELECTED_ITEM = "SET_SELECTED_ITEM";
export const PUT_MONEY = "PUT_MONEY";
export const GIVE_ITEM_AND_CHANGE = "GIVE_ITEM_AND_CHANGE";
export const GET_CHANGE = "GET_CHANGE";
export const GET_ITEM = "GET_ITEM";
export const SHOW_ADMIN = "SHOW_ADMIN";
export const ITEM_PAD_ERR = "ITEM_PAD_ERR";
export const TOGGLE_MODAL = "TOGGLE_MODAL";
export const SET_MODAL_CONTENT = "SET_MODAL_CONTENT";

export const mainReducer = (state = initState, action) => {
  switch (action.type) {
    case "ITEM_PAD_VALUE":
      return {
        ...state,
        itemPadVal:
          state.itemPadVal === "-"
            ? String(action.payload)
            : String(state.itemPadVal) + action.payload,
      };
    case "ITEM_PAD_ERR": {
      return {
        ...state,
        itemPadVal: action.payload,
      };
    }
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
    case TOGGLE_MODAL:
      return {
        ...state,
        modalWindow: {
          ...state.modalWindow,
          isShown: !state.modalWindow.isShown,
        },
      };
    case SET_MODAL_CONTENT:
      return {
        ...state,
        modalWindow: {
          ...state.modalWindow,
          content: action.payload,
        },
      };
    default:
      return state;
  }
};
