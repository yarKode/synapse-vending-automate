import React from "react";
import { createPortal } from "react-dom";
import { useSelector, useDispatch } from "react-redux";
import uniqid from "uniqid";
import { TOGGLE_MODAL } from "../store/mainReducer";

export default function Modal() {
  const isShown = useSelector((state) => state.main.modalWindow.isShown);
  const title = useSelector((state) => state.main.modalWindow.title);
  const usersChangeArr = useSelector((state) => state.main.modalWindow.content);

  const dispatch = useDispatch();

  const filteredUsersChangeArr = usersChangeArr.filter((el) => el?.qty !== 0);

  function toggleModal() {
    dispatch({ type: TOGGLE_MODAL });
  }

  if (!isShown) return null;
  return createPortal(
    <div className="modal">
      <div className="modal-overlay">
        <div className="modal-container">
          <h4 className="modal-title">{title}</h4>
          <div className="modal-content">
            {filteredUsersChangeArr.map((el) => {
              return (
                <div className="modal-content-str" key={uniqid()}>
                  <p>{`Nominee $${el.nominee}: ${el.qty}`}</p>
                </div>
              );
            })}
          </div>
          <button onClick={toggleModal}>Close</button>
        </div>
      </div>
    </div>,
    document.getElementById("modal")
  );
}
