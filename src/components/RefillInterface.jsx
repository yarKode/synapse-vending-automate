import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import uniqid from "uniqid";
import { REFILL_CHANGE } from "../store/changeReducer";

export default function RefillInterface() {
  const showRefilInterface = useSelector((state) => state.main.refillInterface);

  const allNominees = useSelector((state) => state.change.nominees);

  const dispatch = useDispatch();

  const initState = allNominees.map((nomObj) => ({
    nominee: nomObj.nominee,
    qty: "",
  }));

  const [qtyFileds, setQtyFields] = useState(initState);

  const qtyInputHandler = (e) => {
    setQtyFields((prev) => {
      const newArr = prev.filter(
        (el) => el.nominee !== Number(e.target.dataset.nominee)
      );

      return [
        ...newArr,
        {
          nominee: Number(e.target.dataset.nominee),
          qty: Number(e.target.value),
        },
      ];
    });
  };

  const submitHandler = () => {
    const newPayload = allNominees.map((nomObj) => {
      const nomObjNominee = nomObj.nominee;
      const newQty = qtyFileds.find((el) => el.nominee === nomObjNominee).qty;
      return {
        nominee: nomObj.nominee,
        qty: Number(nomObj.qty) + Number(newQty),
      };
    });

    dispatch({ type: REFILL_CHANGE, payload: newPayload });
    setQtyFields((prev) => initState);
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
          const newVal = qtyFileds.find((obj) => obj.nominee === nominee);

          return (
            <div key={uniqid()} className="refill-interface-nominee-row">
              <div className="nominee">
                <p>{nominee} x</p>
              </div>
              <div className="nominee-qty">{qty}</div>
              <div className="nominee-qty-field">
                <input
                  maxLength="3"
                  size="3"
                  type="text"
                  id="nominee-qty-input"
                  onChange={qtyInputHandler}
                  data-nominee={nominee}
                  data-qty={qty}
                  value={newVal?.qty}
                ></input>
                <label htmlFor="nominee-qty-input">Qty to add:</label>
              </div>
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
