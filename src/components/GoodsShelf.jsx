import React from "react";
import Item from "./Item";
import { useSelector } from "react-redux";

export default function GoodsShelf({ itemCode }) {
  const allItems = useSelector((state) => state.items);

  const selectedItem = useSelector((state) => state.selectedItem);

  const currentItems = allItems.find((el) => el.code === itemCode);

  const highLightCurrent = Number(selectedItem) === itemCode;

  const { code, name, price, qty, color } = currentItems;

  return (
    <div
      className="automate-item-shelf"
      style={{
        borderBottom: `${
          highLightCurrent ? "4px solid green" : "2px solid grey"
        }`,
      }}
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
