import React from "react";
import GlassCase from "./GlassCase";
import Pads from "./Pads";
import ItemOutput from "./ItemOutput";
import RefillSwitcher from "./RefillSwitcher";

export default function Automate() {
  return (
    <div className="automate">
      <GlassCase />
      <Pads />
      <ItemOutput />
      <RefillSwitcher />
    </div>
  );
}
