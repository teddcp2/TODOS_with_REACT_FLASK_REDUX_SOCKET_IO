import React from "react";
import MyItem from "./ToDOItem";

const MyItems = ({ items }) => {
  let contents = items.map((item) => <MyItem key={item.item_id} item={item} />);
  return <div className="ui three stackable cards">{contents}</div>;
};

export default MyItems;
