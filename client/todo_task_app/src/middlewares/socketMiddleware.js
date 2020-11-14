import {
  get_socket_connection,
  get_socket_records,
  set_socket_records,
  store_records,
  changeLoader,
  remove_socket_connection,
} from "../actions";
import io from "socket.io-client";
import { toast } from "react-toastify";

export const SocketMiddleware = (store) => {
  let socket = "";
  return (next) => (action) => {
    let data = store.getState();

    const ChangeData = () => {
      console.log("data Changed..");
      socket.emit("FetchRecords");
    };

    // console.log(data);
    switch (action.type) {
      case "SOCKET_CONNECTION":
        socket = io(action.payload.url);
        socket.on("Success", (data) => console.log(data));
        socket.on("ChangeData", ChangeData);
        socket.on("Notify", (data) =>
          toast.success(data.response, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          })
        );

        socket.on("SendingRecords", (response) => {
          //   console.log("setting Records...");
          return store.dispatch(set_socket_records(response));
        });
        // console.log("getting records..");
        return store.dispatch(get_socket_records());

      case "SOCKET_GET_RECORDS":
        store.dispatch(changeLoader(!data.loader.show, "Fetching Records..."));
        return socket.emit("FetchRecords");

      //   case "SOCKET_CHANGED_RECORDS":
      //     console.log("Middleware Changed");
      //     return;

      case "SOCKET_SET_RECORDS":
        store.dispatch(store_records(action.payload.data));
        // console.log("got the data", !data.loader.show);
        if (data.loader.show) {
          store.dispatch(changeLoader(!data.loader.show));
        }
        return;

      case "CHANGE_STATUS_SOCKET":
        // console.log("called..2", action.payload, data.loader);
        store.dispatch(changeLoader(!data.loader.show, action.payload.text));
        socket.emit(action.payload.markType, { item_id: action.payload.id });
        return;
      // console.log("Marked..");
      // store.dispatch(changeLoader(!data.loader.show));

      case "ADD_ITEM":
        store.dispatch(changeLoader(!data.loader.show, "Adding one Data..."));
        socket.emit("AddRecord", {
          value: action.payload.name,
          type: action.payload.itemType,
        });
        // toast.success("Added one item...", {
        //   position: "top-right",
        //   autoClose: 5000,
        //   hideProgressBar: true,
        //   closeOnClick: true,
        //   pauseOnHover: true,
        //   draggable: true,
        //   progress: undefined,
        // });
        return;

      case "REMOVE_SOCKET_CONNECTION":
        socket.disconnect();
        console.log("disconnected..");
        return;
    }
    return next(action);
  };
};
