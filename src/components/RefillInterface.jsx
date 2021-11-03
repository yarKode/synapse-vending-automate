import React from "react";
import { useSelector } from "react-redux";
export default function RefillInterface() {
  const showRefilInterface = useSelector((state) => state.refillInterface);

  if (showRefilInterface) {
    return <div className="refill-interface"></div>;
  }
  return null;
}
