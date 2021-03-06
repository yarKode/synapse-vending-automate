import React from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  ITEM_PAD_VAL,
  RESET_PAD,
  SET_SELECTED_ITEM,
  ITEM_PAD_ERR,
} from "../store/mainReducer";

import { wrongCodeDisplayErr, padsTitles } from "../configure";
import PadsTitle from "./PadsTitle";

export default function ItemsPad() {
  const dataFromState = useSelector(
    ({ main: { itemPadVal, selectedItem, items, itemOutput } }) => ({
      itemPadVal,
      selectedItem,
      items,
      itemOutput,
    })
  );

  const {
    itemPadVal,
    selectedItem,
    items: allItems,
    itemOutput,
  } = dataFromState;
  const dispatch = useDispatch();

  const titleString = padsTitles.itemPad;

  const resetPad = () => {
    dispatch({ type: RESET_PAD, payload: "-" });
    dispatch({ type: SET_SELECTED_ITEM, payload: "" });
  };

  const typeNumValue = (payload) => {
    if (!itemPadVal) {
      resetPad();
    }
    if (selectedItem) return;
    if (itemOutput) {
      alert("Please get recently bought item out of vault firstly");
      return;
    }

    dispatch({ type: ITEM_PAD_VAL, payload });
  };

  const submitCode = () => {
    if (selectedItem) return;
    if (allItems.find((el) => el.code === Number(itemPadVal))?.qty <= 0) {
      alert("Chosen item is out of stock");
      resetPad();
      return;
    }

    const correctItemCode = allItems.some(
      (el) => el.code === Number(itemPadVal)
    );

    if (correctItemCode) {
      dispatch({ type: SET_SELECTED_ITEM, payload: itemPadVal });

      return;
    }
    resetPad();
    dispatch({ type: ITEM_PAD_ERR, payload: false });
  };

  return (
    <div className="pads-choose-item">
      <PadsTitle title={padsTitles.itemPad} />
      <div className="pads-display">
        <p>{itemPadVal ? itemPadVal : wrongCodeDisplayErr}</p>
      </div>
      <div className="pads-choose-item-buttons">
        <div
          className="choose-item-pad-btn"
          onClick={() => {
            typeNumValue(1);
          }}
        >
          <p>1</p>
        </div>
        <div
          className="choose-item-pad-btn"
          onClick={() => {
            typeNumValue(2);
          }}
        >
          <p>2</p>
        </div>
        <div
          className="choose-item-pad-btn"
          onClick={() => {
            typeNumValue(3);
          }}
        >
          <p>3</p>
        </div>
        <div
          className="choose-item-pad-btn"
          onClick={() => {
            typeNumValue(4);
          }}
        >
          <p>4</p>
        </div>
        <div
          className="choose-item-pad-btn"
          onClick={() => {
            typeNumValue(5);
          }}
        >
          <p>5</p>
        </div>
        <div
          className="choose-item-pad-btn"
          onClick={() => {
            typeNumValue(6);
          }}
        >
          <p>6</p>
        </div>
        <div
          className="choose-item-pad-btn"
          onClick={() => {
            typeNumValue(7);
          }}
        >
          <p>7</p>
        </div>
        <div
          className="choose-item-pad-btn"
          onClick={() => {
            typeNumValue(8);
          }}
        >
          <p>8</p>
        </div>
        <div
          className="choose-item-pad-btn"
          onClick={() => {
            typeNumValue(9);
          }}
        >
          <p>9</p>
        </div>
        <div
          className="choose-item-pad-btn"
          onClick={() => {
            resetPad();
          }}
        >
          <p>X</p>
        </div>
        <div
          className="choose-item-pad-btn"
          onClick={() => {
            typeNumValue(0);
          }}
        >
          <p>0</p>
        </div>
        <div className="choose-item-pad-btn" onClick={() => submitCode()}>
          <p>Ok</p>
        </div>
      </div>
    </div>
  );
}
