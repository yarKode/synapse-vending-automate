import React from "react";
import ItemsPad from "./ItemsPad";
import MoneyInputOutput from "./MoneyInputOutput";

export default function Pads() {
  return (
    <div className="pads">
      <ItemsPad />
      <MoneyInputOutput type="input" />
      <MoneyInputOutput type="output" />
    </div>
  );
}
