import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware } from "redux";
import { RootReducer } from "./reducers/rootReducer";
import { SocketMiddleware } from "./middlewares/socketMiddleware";
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";

import "bootstrap/dist/css/bootstrap.min.css";
import "semantic-ui-css/semantic.min.css";

import "./index.css";
import App from "./App";

// import HomePage from "./components/Homepage";
import reportWebVitals from "./reportWebVitals";

let store = createStore(
  RootReducer,
  composeWithDevTools(applyMiddleware(SocketMiddleware))
);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
    {/* <HomePage />{" "} */}
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
