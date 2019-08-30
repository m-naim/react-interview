import React from "react";

export const FilterButton = ({ value, onClick, active }) => (
  <button className={active} onClick={onClick}>
    {value}
  </button>
);

export const NumberButton = ({ value, onClick, active }) => (
  <input type="button" className={active} onClick={onClick} value={value} />
);

export const LikeButton = ({ value, onClick, active }) => (
  <button className={active} onClick={onClick}>
    {value}
  </button>
);
