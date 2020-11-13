import React, { Fragment, useContext } from "react";
import { socket } from "../../App";
import { LoaderContext } from "../../context";
import "./todo.css";

const MyItem = ({ item }) => {
  const loader = useContext(LoaderContext);
  // console.log(loader);
  const getStatus = (status) => {
    let item = "";

    switch (status) {
      case "new":
        item = <div className="description meta">Yet to start</div>;
        break;

      case "completed":
        item = (
          <div className="ui bottom attached  progress success">
            <div className="bar"></div>
          </div>
        );
        break;

      default:
        item = (
          <div className="ui bottom attached active warning  progress">
            <div className="bar"></div>
          </div>
        );

        break;
    }
    return item;
  };

  const getButtonText = (status) => {
    let item = "";
    let title = "";
    let fun = "";

    switch (status) {
      case "new":
        item = "Start";
        title = "start the task";
        fun = markProgress;
        break;

      case "completed":
        item = "";
        title = "";
        fun = "";
        break;

      default:
        fun = markComplete;
        item = "Complete";
        title = "complete the task";
        break;
    }
    return [item, title, fun];
  };

  const markProgress = () => {
    loader.setLoaderText("marking as In-Progress..");
    loader.setLoaderValue(!loader.loaderValue);
    socket.emit("MarkAsProgress", { item_id: item.item_id });
  };
  const markComplete = () => {
    loader.setLoaderText("marking as Completed..");
    loader.setLoaderValue(!loader.loaderValue);
    socket.emit("MarkAsComplete", { item_id: item.item_id });
  };
  const markDelete = () => {
    loader.setLoaderText("Deleting..");
    loader.setLoaderValue(!loader.loaderValue);
    socket.emit("MarkAsDelete", { item_id: item.item_id });
  };

  let [text, title, fun] = [...getButtonText(item.status)];
  // console.log(item.status, text, title, fun);

  return (
    <div className="ui card">
      {item.delete === "yes" ? (
        <div className="m-auto text-center bg-white text-danger">Deleted</div>
      ) : (
        <Fragment>
          <div className="content">
            <a className="header">{item.name}</a>
            <div className="meta">
              <span className="date">{item.type}</span>
            </div>
          </div>
          <div className="extra content">
            <div className="ui two buttons">
              {text !== "" && (
                <div
                  className="ui basic green button"
                  title={title}
                  onClick={fun}
                >
                  {text}
                </div>
              )}
              <div
                className="ui basic red button"
                title="click to delete"
                onClick={markDelete}
              >
                Delete
              </div>
            </div>
          </div>
        </Fragment>
      )}
      {item.delete === "no" && getStatus(item.status)}
    </div>
  );
};

export default MyItem;
