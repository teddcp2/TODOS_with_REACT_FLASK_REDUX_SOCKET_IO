import React, { useState, useContext } from "react";
import { connect } from "react-redux";
import { addItem, changeLoader } from "../../actions";
// import { LoaderContext } from "../../context";
import "./addItem.css";

import Dropdown from "./dropdown";

const AddItem = (props) => {
  let [text, setText] = useState("");
  let [type, setValue] = useState("select one");
  // let loader = useContext(LoaderContext);

  const storeValue = (e) => {
    // console.log(e.target);
    setValue(e.target.value);
  };
  const storeText = (e) => {
    // console.log(e.target);
    setText(e.target.value);
  };

  const addItem = (e) => {
    // loader.setLoaderText("Adding one Data...");
    // loader.setLoaderValue(!loader.loaderValue);
    // socket.emit("AddRecord", { value: text, type: type });
    props.addItem(text, type);
    setText("");
    setValue("select");
  };

  return (
    <div className="ui fluid action input centered">
      <input
        type="text"
        placeholder="Type to add..."
        value={text}
        onChange={storeText}
      />
      <Dropdown value={type} typeUpdate={storeValue} />
      <div className="ui button" onClick={addItem}>
        Add
      </div>
    </div>
  );
};

const mapStateToProps = (store) => {
  return { loader: { ...store.loader } };
};

export default connect(mapStateToProps, {
  addItem,
  changeLoader,
})(AddItem);
