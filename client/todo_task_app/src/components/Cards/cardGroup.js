import React from "react";
import Card from "./Card";

const CardCollection = (props) => {
  return (
    <div className="card-deck">
      {Object.entries(props.todoNumbers).map((ele) => (
        <Card key={ele[0]} title={ele[0]} number={ele[1]}></Card>
      ))}
    </div>
  );
};

export default CardCollection;
