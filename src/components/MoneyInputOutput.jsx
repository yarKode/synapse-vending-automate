import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { PUT_MONEY, GIVE_ITEM_AND_CHANGE, GET_CHANGE } from "../store";

export default function MoneyInputOutput({ type }) {
  const selectedItem = useSelector((state) => state.selectedItem);
  const moneyReceived = useSelector((state) => state.moneyReceived);
  const change = useSelector((state) => state.change);
  const selectedItemObj = useSelector((state) => state.items).find(
    (el) => el.code === Number(selectedItem)
  );
  const allItems = useSelector((state) => state.items);
  const selectedItemPrice = selectedItemObj?.price;

  const dispatch = useDispatch();

  const addMoney = (payload) => {
    dispatch({ type: PUT_MONEY, payload });
  };

  const handleMoney = () => {
    if (moneyReceived >= selectedItemPrice) return;

    if (type === "output" && change > 0) {
      dispatch({ type: GET_CHANGE });
    }
    if (!selectedItem) return;
    if (type === "input") {
      const amount = Number(prompt("Put your money", 0));
      if (amount >= 0) {
        addMoney(amount);
        return;
      }
      alert("Incorrect type of Money (Shoul be a positive number)");
    }
  };

  useEffect(() => {
    if (moneyReceived >= selectedItemPrice) {
      const updatedSepItem = {
        ...selectedItemObj,
        qty: selectedItemObj.qty - 1,
      };
      const updatedAllItems = [
        ...allItems.filter((el) => el.code !== Number(selectedItem)),
        updatedSepItem,
      ];

      dispatch({
        type: GIVE_ITEM_AND_CHANGE,
        payload: {
          itemOutput: selectedItemObj,
          change: moneyReceived - selectedItemPrice,
          items: [...updatedAllItems],
        },
      });
    }
  }, [
    allItems,
    dispatch,
    moneyReceived,
    selectedItem,
    selectedItemObj,
    selectedItemPrice,
  ]);

  return (
    <div className="pads-put-money">
      {type === "input" ? <h5>Put Money Here</h5> : <h5>Get Your Change</h5>}
      <div className="pads-display">
        {type === "input" ? <p>{moneyReceived}</p> : <p>{change}</p>}
      </div>
      <div
        className="money-input-output"
        style={{ backgroundColor: `${selectedItem && "lightgreen"}` }}
        onClick={handleMoney}
      >
        <div className="line"></div>
      </div>
    </div>
  );
}
