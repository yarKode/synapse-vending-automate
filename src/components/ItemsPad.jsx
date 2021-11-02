import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ITEM_PAD_VAL, RESET_PAD, SET_SELECTED_ITEM } from "../store";

export default function ItemsPad() {
  const itemPadVal = useSelector((state) => state.itemPadVal);
  const selectedItem = useSelector((state) => state.selectedItem);
  const dispatch = useDispatch();
  const allItems = useSelector((state) => state.items);

  const itemOutput = useSelector((state) => state.itemOutput);

  const typeNumValue = (payload) => {
    if (selectedItem) return;
    if (itemOutput) {
      alert("Please get recently bought item out of vault firstly");
      return;
    }

    dispatch({ type: ITEM_PAD_VAL, payload });
  };

  const resetPad = () => {
    dispatch({ type: RESET_PAD, payload: "-" });
    dispatch({ type: SET_SELECTED_ITEM, payload: "" });
  };

  const submitCode = () => {
    if (selectedItem) return;
    const correctItemCode = allItems.some(
      (el) => el.code === Number(itemPadVal)
    );

    if (correctItemCode) {
      dispatch({ type: SET_SELECTED_ITEM, payload: itemPadVal });
      console.log(correctItemCode);
      return;
    }
    resetPad();
    dispatch({ type: ITEM_PAD_VAL, payload: "err: wrong code" });

    console.log(correctItemCode);
  };

  return (
    <div className="pads-choose-item">
      <h5>Choose Item</h5>
      <div className="pads-display">
        <p>{itemPadVal}</p>
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
