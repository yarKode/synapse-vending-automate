import React from "react";
import GoodsShelf from "./GoodsShelf";

export default function GlassCase() {
  return (
    <div className="automate-glass">
      <GoodsShelf itemCode={1} />
      <GoodsShelf itemCode={2} />
      <GoodsShelf itemCode={3} />
      <GoodsShelf itemCode={4} />
    </div>
  );
}
