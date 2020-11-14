import React from "react";
import { connect } from "react-redux";
import MyItem from "./ToDOItem";

const MyItems = ({ items }) => {
  let contents = items.map((item) => <MyItem key={item.item_id} item={item} />);
  return <div className="ui three stackable cards">{contents}</div>;
};

const mapStateToProps = (store) => {
  let data = [...store.data];
  // console.log("data", store);
  return { items: data };
};

export default connect(mapStateToProps, {})(MyItems);
