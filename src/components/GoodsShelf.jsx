import React from "react";
import Item from "./Item";
import { useSelector } from "react-redux";

export default function GoodsShelf({ itemCode }) {
  const allItems = useSelector((state) => state.main.items);

  const selectedItem = useSelector((state) => state.main.selectedItem);

  const currentItems = allItems.find((el) => el.code === itemCode);

  const isShelfHighlighted = Number(selectedItem) === itemCode;

  const { code, name, price, qty, color } = currentItems;

  return (
    <div
      className={`automate-item-shelf ${
        isShelfHighlighted && "automate-shelf-active"
      }`}
    >
      <div className="automate-item-container">
        {qty <= 0 ? null : (
          <Item name={name} price={price} code={code} color={color} />
        )}
      </div>
      <div className="automate-item-container">
        {qty === 1 || qty <= 0 ? null : (
          <Item name={name} price={price} code={code} color={color} />
        )}
      </div>
      <div className="automate-item-container">
        {qty === 2 || qty === 1 || qty <= 0 ? null : (
          <Item name={name} price={price} code={code} color={color} />
        )}
      </div>
    </div>
  );
}
