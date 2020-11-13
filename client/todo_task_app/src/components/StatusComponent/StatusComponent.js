import React from "react";
import "./status.css";

const arr = ["New", "Progress", "Completed", "Deleted"];

const StatusComponent = (props) => {
  return (
    <div className="ui statistics">
      {arr.map((ele) => (
        <div key={ele} class="statistic">
          <div class="value">{props.status[ele]}</div>
          <div class="label">{ele}</div>
        </div>
      ))}
    </div>
  );
};

export default StatusComponent;
