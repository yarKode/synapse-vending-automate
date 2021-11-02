import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { GET_ITEM } from "../store";

export default function Item({ code, name, price, color, type }) {
  const itemOutput = useSelector((state) => state.itemOutput);

  const dispatch = useDispatch();

  const clickItemHandle = () => {
    if (!type) return;
    dispatch({ type: GET_ITEM });
  };

  return (
    <div
      className="automate-item"
      style={{ backgroundColor: `${type ? itemOutput.color : color}` }}
      onClick={clickItemHandle}
    >
      <p className="item-name">{type ? itemOutput.name : name}</p>
      <p className="item-price">{`Price: $${
        type ? itemOutput.price : price
      }`}</p>
      <p className="item-code">{`Code: ${type ? itemOutput.code : code}`}</p>
    </div>
  );
}
