import React, { useContext } from "react";
import { LoaderContext } from "../../context";

const Loader = (props) => {
  let content = "";
  let context = useContext(LoaderContext);

  switch (props.type) {
    case "cards":
      content = (
        <div className="card-group">
          <div
            className="card border-primary mb-3"
            style={{ maxWidth: "18" + "rem" }}
          >
            <div className="spinner-border card-title" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
          <div
            className="card border-primary mb-3"
            style={{ maxWidth: "18" + "rem" }}
          >
            <div className="spinner-border card-title" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
          <div
            className="card border-primary mb-3"
            style={{ maxWidth: "18" + "rem" }}
          >
            <div className="spinner-border card-title" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
          <div
            className="card border-primary mb-3"
            style={{ maxWidth: "18" + "rem" }}
          >
            <div className="spinner-border card-title" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        </div>
      );
      break;

    case "mainLoader":
      content = (
        <div class="ui active inverted dimmer">
          <div class="ui large text loader">{context.loaderText}</div>
        </div>
      );
      break;

    default:
      content = (
        <div className="d-flex justify-content-center">
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      );
      break;
  }

  return content;
};

export default Loader;
