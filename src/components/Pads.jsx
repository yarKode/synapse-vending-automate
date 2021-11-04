import { useSelector } from "react-redux";

import React from "react";

import ItemsPad from "./ItemsPad";
import MoneyInputOutput from "./MoneyInputOutput";
import MoneyOut from "./MoneyOut";

export default function Pads() {
  const change = useSelector((state) => state.main.change);

  return (
    <div className="pads">
      <ItemsPad />
      <MoneyInputOutput />
      <MoneyOut change={change} />
    </div>
  );
}
