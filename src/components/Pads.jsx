import { useSelector } from "react-redux";

import React from "react";

import ItemsPad from "./ItemsPad";
import MoneyIn from "./MoneyIn";
import MoneyOut from "./MoneyOut";

export default function Pads() {
  const change = useSelector((state) => state.main.change);

  return (
    <div className="pads">
      <ItemsPad />
      <MoneyIn />
      <MoneyOut change={change} />
    </div>
  );
}
