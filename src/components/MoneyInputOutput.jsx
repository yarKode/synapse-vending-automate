import React, { useEffect, useState, useCallback, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";

import { PUT_MONEY, GIVE_ITEM_AND_CHANGE } from "../store/mainReducer";
import { GIVE_CHANGE_AND_UPDATE_BALANCE } from "../store/changeReducer";

import { calcChangeArr } from "../utils";

function getDepositAmount() {
  const depositAmount = Number(prompt("Put your money", 0).trim());

  if (depositAmount >= 0) return depositAmount;

  alert("Incorrect type of Money (Shoul be a positive number)");
  return;
}

export default function MoneyInputOutput() {
  const selectedItem = useSelector((state) => state.main.selectedItem);
  const moneyReceived = useSelector((state) => state.main.moneyReceived);
  const allItems = useSelector((state) => state.main.items);
  const selectedItemObj = allItems.find(
    (el) => el.code === Number(selectedItem)
  );
  const selectedItemPrice = selectedItemObj?.price;
  const allNominees = useSelector((state) => state.change.nominees);

  const dispatch = useDispatch();

  const addMoney = (depositAmount) => {
    dispatch({ type: PUT_MONEY, payload: depositAmount });
  };

  const updatedItemsAfterSale = useMemo(() => {
    const updatedSepItem = {
      ...selectedItemObj,
      qty: selectedItemObj?.qty - 1,
    };
    return [
      ...allItems.filter((el) => el.code !== Number(selectedItem)),
      updatedSepItem,
    ];
  }, [allItems, selectedItem, selectedItemObj]);

  const giveChangeAndUpdateChangeBalance = useCallback(
    (newNomineesArr) => {
      dispatch({
        type: GIVE_CHANGE_AND_UPDATE_BALANCE,
        payload: newNomineesArr,
      });
    },
    [dispatch]
  );

  const giveItemAndChangeUI = useCallback(
    (selectedItem, updatedItemsArr, change) => {
      dispatch({
        type: GIVE_ITEM_AND_CHANGE,
        payload: {
          itemOutput: selectedItem,
          change,
          items: [...updatedItemsArr],
        },
      });
    },
    [dispatch]
  );

  const [moneyInVisible, setMoneyInVisible] = useState(null);

  function checkIfDepositEnough() {
    if (moneyReceived >= selectedItemPrice) return;
  }

  function animateMoneyMove() {
    setMoneyInVisible((prev) => true);

    setTimeout(() => {
      setMoneyInVisible((prev) => false);
    }, 1000);
  }

  const totalChangeBalance = useMemo(() => {
    return allNominees.reduce((acc, nomObj) => {
      return acc + nomObj.nominee * nomObj.qty;
    }, 0);
  }, [allNominees]);

  const handleMoneyInput = () => {
    checkIfDepositEnough();

    if (!selectedItem) return;

    const depositAmount = getDepositAmount();

    if (depositAmount) {
      addMoney(depositAmount);
      animateMoneyMove();
    }
  };

  useEffect(() => {
    const change = moneyReceived - selectedItemPrice;

    if (change >= 0) {
      //Case when use Put too much money and we have no such amount on changeBalance
      if (change > totalChangeBalance) {
        alert(
          "Not Enough Money to give you a change. Please call customer support: +4 399 399 222"
        );
        giveItemAndChangeUI("", allItems, 0);
        return;
      }
      //Calculate how many nominees needed to give a change

      const changeArr = calcChangeArr(change, allNominees);

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

      giveChangeAndUpdateChangeBalance(newPayload);
      giveItemAndChangeUI(selectedItemObj, updatedItemsAfterSale, change);
    }
  }, [
    allItems,
    allNominees,
    moneyReceived,
    dispatch,
    selectedItem,
    selectedItemObj,
    selectedItemPrice,
    giveChangeAndUpdateChangeBalance,
    giveItemAndChangeUI,
    totalChangeBalance,
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
