import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { PUT_MONEY, GIVE_ITEM_AND_CHANGE } from "../store/mainReducer";

import { GIVE_CHANGE_AND_UPDATE_BALANCE } from "../store/changeReducer";

function getDepositAmount() {
  const depositAmount = Number(prompt("Put your money", 0).trim());

  if (depositAmount >= 0) return depositAmount;

  alert("Incorrect type of Money (Shoul be a positive number)");
  return;
}

export default function MoneyInputOutput() {
  const selectedItem = useSelector((state) => state.main.selectedItem);
  const moneyReceived = useSelector((state) => state.main.moneyReceived);
  const change = useSelector((state) => state.main.change);
  const selectedItemObj = useSelector((state) => state.main.items).find(
    (el) => el.code === Number(selectedItem)
  );
  const allItems = useSelector((state) => state.main.items);
  const selectedItemPrice = selectedItemObj?.price;
  const allNominees = useSelector((state) => state.change.nominees);

  const dispatch = useDispatch();

  const addMoney = (depositAmount) => {
    dispatch({ type: PUT_MONEY, payload: depositAmount });
  };

  const [moneyInVisible, setMoneyInVisible] = useState(null);

  function checkIfDepositEnough() {
    if (moneyReceived >= selectedItemPrice) return;
  }

  function checkIfItemToBuySelected() {
    if (!selectedItem) return;
  }

  function animateMoneyMove() {
    setMoneyInVisible((prev) => true);

    setTimeout(() => {
      setMoneyInVisible((prev) => false);
    }, 1000);
  }

  const handleMoneyInput = () => {
    checkIfDepositEnough();
    checkIfItemToBuySelected();

    const depositAmount = getDepositAmount();

    if (depositAmount) {
      addMoney(depositAmount);
      animateMoneyMove();
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

      const change = moneyReceived - selectedItemPrice;

      const calcChangeBal = () => {
        return allNominees.reduce((acc, nomObj) => {
          return acc + nomObj.nominee * nomObj.qty;
        }, 0);
      };

      const changeBal = calcChangeBal();

      //Case when use Put too much money and we have no such amount on changeBalance
      if (change > changeBal) {
        alert(
          "Not Enough Money to give you a change. Please call customer support: +4 399 399 222"
        );
        dispatch({
          type: GIVE_ITEM_AND_CHANGE,
          payload: {
            itemOutput: "",
            change: 0,
            items: [...updatedAllItems],
          },
        });
        return;
      }

      //Calculate how many nominees needed to give a change

      const changeArr = [];

      const Request = function (amount) {
        this.amount = amount;
        console.log("Requested: $" + amount + "\n");
      };

      Request.prototype = {
        get: function (bill) {
          const currentNomineeQty = allNominees.find(
            (el) => el.nominee === bill
          ).qty;

          const count = Math.floor(this.amount / bill);

          const multiply =
            currentNomineeQty > count ? count : currentNomineeQty;

          this.amount -= multiply * bill;

          const nomineeForChangeObj = {
            nominee: bill,
            qty: multiply,
          };

          changeArr.push(nomineeForChangeObj);

          return this;
        },
      };

      const run = () => {
        const request = new Request(change);

        request.get(100).get(50).get(20).get(10).get(5).get(1);
      };

      run();

      if (changeArr.every((el) => el.qty === 0)) {
        dispatch({ type: PUT_MONEY, payload: 0 });
        alert(
          "We do not have a proper nominees to give you a change. Please call support"
        );

        return;
      }

      const newPayload = allNominees.map((oldNomObj) => {
        const newEntry = changeArr.find(
          (el) => el.nominee === oldNomObj.nominee
        ).qty;

        return {
          nominee: oldNomObj.nominee,
          qty: Number(oldNomObj.qty) - Number(newEntry),
        };
      });

      console.log("newPayload", newPayload);

      dispatch({ type: GIVE_CHANGE_AND_UPDATE_BALANCE, payload: newPayload });

      dispatch({
        type: GIVE_ITEM_AND_CHANGE,
        payload: {
          itemOutput: selectedItemObj,
          change,
          items: [...updatedAllItems],
        },
      });
    }
  }, [
    allItems,
    allNominees,
    moneyReceived,
    dispatch,
    selectedItem,
    selectedItemObj,
    selectedItemPrice,
  ]);

  return (
    <div className="pads-put-money">
      <h5>Put Money Here</h5>
      <div className="pads-display">
        <p>{moneyReceived}</p>
      </div>
      <div
        className={`money-input-output ${selectedItem && "lightgreen"}`}
        onClick={handleMoneyInput}
      >
        <div className="line">
          {moneyInVisible && <div className="money-in"></div>}
        </div>
      </div>
    </div>
  );
}
