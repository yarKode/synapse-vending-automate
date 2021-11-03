import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { SHOW_ADMIN } from "../store";

export default function RefillSwitcher() {
  const [activeOption, setActiveOption] = useState(true);
  const dispatch = useDispatch();

  function changeActiveOption() {
    setActiveOption((prev) => !prev);

    dispatch({ type: SHOW_ADMIN });
  }

  return (
    <div className="refill-switcher">
      <div className="refill-switcher-option">
        <input
          type="radio"
          id="user-mode"
          name="maintenance-mode"
          checked={activeOption}
          onChange={changeActiveOption}
        ></input>
        <label htmlFor="user-mode">Customer</label>
      </div>
      <div className="refill-switcher-option">
        <input
          type="radio"
          id="admin-mode"
          name="maintenance-mode"
          checked={!activeOption}
          onChange={changeActiveOption}
        ></input>
        <label htmlFor="admin-mode">Admin</label>
      </div>
    </div>
  );
}
