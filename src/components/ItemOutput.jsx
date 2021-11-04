import React from "react";
import { useSelector } from "react-redux";
import Item from "./Item";

export default function ItemOutput() {
  const itemOutput = useSelector((state) => state.main.itemOutput);
  console.log("state.main", itemOutput);
  return (
    <div className="item-output">
      <div className="automate-item-container">
        {itemOutput && <Item type="sold" />}
      </div>
    </div>
  );
}
