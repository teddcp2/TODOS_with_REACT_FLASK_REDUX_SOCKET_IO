import React, { useState, useEffect, Suspense, lazy } from "react";
// import io from "socket.io-client";
import Notification from "./components/Notofication/notification";
import {
  get_socket_connection,
  remove_socket_connection,
  changeLoader,
} from "./actions";
import { connect } from "react-redux";
import "./App.css";
import Loader from "./components/Loaders/loader";
import AddItem from "./components/AddComponent/addItem";
// import { LoaderContext } from "./context";

const Cards = lazy(() => import("./components/Cards/cardGroup"));
const Items = lazy(() => import("./components/ToDos/ToDoContainer"));
const Status = lazy(() =>
  import("./components/StatusComponent/StatusComponent")
);

const ENDPOINT = "http://localhost:5000";

function App(props) {
  // const [data, setData] = useState([]);
  // const [counts, setCounts] = useState({});
  // const [statusCounts, setStatusCounts] = useState({});
  // const [loaderValue, setLoaderValue] = useState(true);
  // const [loaderText, setLoaderText] = useState("Fetching data...");
  // socket = io(ENDPOINT);

  // const setRecords = (response) => {
  //   console.log("response", response);
  //   setData(response.records);
  //   setCounts(response.Counts);
  //   setStatusCounts(response.statusCounts);
  //   setLoaderValue(!loaderValue);
  // };

  // const changeData = () => {
  //   console.log("called Change Data...");
  //   socket.emit("FetchRecords");
  // };

  useEffect(() => {
    // socket.emit("FetchRecords");
    // socket.on("sendingRecords", setRecords);
    // socket.on("ChangeData", changeData);
    props.get_socket_connection(ENDPOINT);
    return () => props.remove_socket_connection();
  }, []);

  // socket.on("sendingRecords", setRecords);
  return (
    // <LoaderContext.Provider
    //   value={{ loaderValue, setLoaderValue, loaderText, setLoaderText }}
    // >
    <div className="App">
      {/* WEBSOCKET with FLASK and REACT...{data.length} */}
      {props.loader.show && (
        <Loader type="mainLoader" text={props.loader.text} />
      )}
      <div className="container">
        <Suspense fallback={<Loader type="cards" />}>
          <Cards />
        </Suspense>
        <div className="ui horizontal divider"></div>
        <AddItem />
        <div className="ui horizontal divider"></div>
        <div className="ui grid">
          <div className="four wide column">
            <Suspense fallback={<Loader />}>
              <Status />
            </Suspense>
          </div>
          <div className="twelve wide column">
            <Suspense fallback={<Loader />} className="center">
              <Items />
            </Suspense>
          </div>
        </div>
        <Notification />
      </div>
    </div>
    // </LoaderContext.Provider>
  );
}

const mapStateToProps = (store) => {
  let data = [...store.data];
  console.log("data", store);
  return { data, loader: { ...store.loader } };
};

export default connect(mapStateToProps, {
  get_socket_connection,
  remove_socket_connection,
})(App);

// export { socket };
