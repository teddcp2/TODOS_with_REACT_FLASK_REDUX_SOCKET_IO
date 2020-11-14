import React from "react";
import { connect } from "react-redux";
import "./status.css";

const arr = ["New", "Progress", "Completed", "Deleted"];

const StatusComponent = (props) => {
  return (
    <div className="ui statistics">
      {arr.map((ele) => (
        <div key={ele} className="statistic">
          <div className="value">{props.status[ele]}</div>
          <div className="label">{ele}</div>
        </div>
      ))}
    </div>
  );
};

const mapStateToProps = (store) => {
  let data = { ...store.statusCounts };
  // console.log("data", store);
  return { status: data };
};

export default connect(mapStateToProps, {})(StatusComponent);
