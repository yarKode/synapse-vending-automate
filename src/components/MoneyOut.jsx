import React, { useState, useEffect } from "react";
import { GET_CHANGE, TOGGLE_MODAL } from "../store/mainReducer";
import { useDispatch } from "react-redux";

export default function MoneyOut({ change }) {
  const dispatch = useDispatch();

  function getChange() {
    dispatch({ type: GET_CHANGE });
  }

  function showModal() {
    dispatch({ type: TOGGLE_MODAL });
  }

  function hideMoney() {
    if (change > 0) {
      setMoneyOutVisible((prev) => false);
    }
  }

  function showMoney() {
    if (change > 0) {
      setMoneyOutVisible((prev) => true);
    }
  }

  function handleMoneyOutClick() {
    if (change === 0) return;
    hideMoney();
    showModal();
    getChange();
  }

  const [moneyOutVisible, setMoneyOutVisible] = useState(false);

  useEffect(() => {
    showMoney();
  }, [change]);

  return (
    <div className="pads-put-money">
      <h5>Get Your Change</h5>
      <div className="pads-display">
        <p>{change}</p>
      </div>
      <div
        className={`money-input-output ${change && "lightgreen"}`}
        onClick={handleMoneyOutClick}
      >
        <div className="line">
          {moneyOutVisible && <div className="money-out"></div>}
        </div>
      </div>
    </div>
  );
}
