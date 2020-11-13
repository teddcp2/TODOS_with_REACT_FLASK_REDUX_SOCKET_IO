import React, { useState, useEffect, Suspense, lazy } from "react";
import io from "socket.io-client";
import "./App.css";
import Loader from "./components/Loaders/loader";
import AddItem from "./components/AddComponent/addItem";
import { LoaderContext } from "./context";

const Cards = lazy(() => import("./components/Cards/cardGroup"));
const Items = lazy(() => import("./components/ToDos/ToDoContainer"));
const Status = lazy(() =>
  import("./components/StatusComponent/StatusComponent")
);

const ENDPOINT = "http://localhost:5000";
let socket = "";

function App() {
  const [data, setData] = useState([]);
  const [counts, setCounts] = useState({});
  const [statusCounts, setStatusCounts] = useState({});
  const [loaderValue, setLoaderValue] = useState(true);
  const [loaderText, setLoaderText] = useState("Fetching data...");
  socket = io(ENDPOINT);

  const setRecords = (response) => {
    console.log("response", response);
    setData(response.records);
    setCounts(response.Counts);
    setStatusCounts(response.statusCounts);
    setLoaderValue(!loaderValue);
  };

  const changeData = () => {
    console.log("called Change Data...");
    socket.emit("FetchRecords");
  };

  useEffect(() => {
    socket.emit("FetchRecords");
    socket.on("sendingRecords", setRecords);
    socket.on("ChangeData", changeData);

    return () => socket.disconnect();
  }, []);

  // socket.on("sendingRecords", setRecords);
  console.log();
  return (
    <LoaderContext.Provider
      value={{ loaderValue, setLoaderValue, loaderText, setLoaderText }}
    >
      <div className="App">
        WEBSOCKET with FLASK and REACT...{data.length}
        {loaderValue && <Loader type="mainLoader" />}
        <div className="container">
          <Suspense fallback={<Loader type="cards" />}>
            <Cards todoNumbers={counts} />
          </Suspense>
          <div className="ui horizontal divider"></div>
          <AddItem />
          <div className="ui horizontal divider"></div>
          <div className="ui grid">
            <div className="four wide column">
              <Suspense fallback={<Loader />}>
                <Status status={statusCounts} />
              </Suspense>
            </div>
            <div className="twelve wide column">
              <Suspense fallback={<Loader />} className="center">
                <Items items={data} />
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </LoaderContext.Provider>
  );
}

export { socket };
export default App;
