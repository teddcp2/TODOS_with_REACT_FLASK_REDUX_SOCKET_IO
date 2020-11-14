import React from "react";
import { connect } from "react-redux";
import Card from "./Card";

const CardCollection = (props) => {
  return (
    <div className="card-deck">
      {Object.entries(props.data).map((ele) => (
        <Card key={ele[0]} title={ele[0]} number={ele[1]}></Card>
      ))}
    </div>
  );
};

const mapStateToProps = (store) => {
  let data = { ...store.counts };
  // console.log("data", store);
  return { data };
};

export default connect(mapStateToProps, {})(CardCollection);
