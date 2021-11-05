import React from "react";
import uniqid from "uniqid";

import GoodsShelf from "./GoodsShelf";
import { items } from "../configure";

const itemsCodes = items.map((el) => el.code);

export default function GlassCase() {
  return (
    <div className="automate-glass">
      {itemsCodes.map((code) => {
        return <GoodsShelf itemCode={code} key={uniqid()} />;
      })}
    </div>
  );
}
