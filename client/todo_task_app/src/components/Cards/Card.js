import React from "react";

const Card = (props) => {
  return (
    <div
      className="card border-primary mb-3"
      style={{ maxWidth: "18" + "rem" }}
    >
      <div className="card-header text-center">{props.title}</div>
      <div className="card-body text-primary">
        <h5 className="card-title">{props.number}</h5>
      </div>
    </div>
  );
};

export default Card;
