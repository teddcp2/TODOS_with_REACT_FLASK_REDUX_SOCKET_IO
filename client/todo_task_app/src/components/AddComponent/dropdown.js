import React, { useState } from "react";

const DropDown = (props) => {
  return (
    <select
      className="ui compact selection dropdown"
      value={props.value}
      onChange={props.typeUpdate}
    >
      <option value="select">select</option>
      <option value="study">Study</option>
      <option value="shopping">Shopping</option>
      <option value="travelling">Tavelling</option>
    </select>
  );
};

export default DropDown;
