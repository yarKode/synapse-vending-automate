import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import uniqid from "uniqid";
import { REFILL_CHANGE } from "../store/changeReducer";
import { nominees } from "../configure";

export default function RefillInterface() {
  const showRefilInterface = useSelector((state) => state.main.refillInterface);

  const allNominees = useSelector((state) => state.change.nominees);

  const dispatch = useDispatch();

  const submitHandler = () => {
    dispatch({ type: REFILL_CHANGE, payload: nominees });
  };

  const totalBal = allNominees.reduce((acc, el) => {
    return acc + el.nominee * el.qty;
  }, 0);

  if (showRefilInterface) {
    return (
      <div className="refill-interface">
        <div className="refill-interface-header">
          <p>{`Current Change Bal.: $${totalBal}`}</p>
        </div>

        {allNominees.map(({ nominee, qty }) => {
          return (
            <div key={uniqid()} className="refill-interface-nominee-row">
              <div className="nominee">
                <p>{nominee} x</p>
              </div>
              <div className="nominee-qty">{qty}</div>
            </div>
          );
        })}

        <button className="refill-btn" onClick={submitHandler}>
          Refill
        </button>
      </div>
    );
  }
  return null;
}
