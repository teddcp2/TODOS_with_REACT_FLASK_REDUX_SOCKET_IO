export const get_socket_connection = (url = null) => {
  return {
    type: "SOCKET_CONNECTION",
    payload: { url },
  };
};

export const remove_socket_connection = () => {
  return {
    type: "REMOVE_SOCKET_CONNECTION",
  };
};

export const get_socket_records = () => {
  return {
    type: "SOCKET_GET_RECORDS",
  };
};

// export const changed_socket_records = () => {
//   console.log("Changed..");
//   return {
//     type: "SOCKET_CHANGED_RECORDS",
//   };
// };

export const set_socket_records = (data) => {
  return {
    type: "SOCKET_SET_RECORDS",
    payload: { data },
  };
};

export const store_records = (data) => {
  return {
    type: "STORE_RECORDS",
    payload: { ...data },
  };
};

export const changeLoader = (show = false, text = null) => {
  return {
    type: "CHANGE_LOADER",
    payload: { text, show },
  };
};

export const change_card_status_socket = (
  id = null,
  markType = "",
  text = ""
) => {
  console.log("called..2");
  return {
    type: "CHANGE_STATUS_SOCKET",
    payload: { id, markType, text },
  };
};

export const addItem = (name = null, itemType = null) => {
  return {
    type: "ADD_ITEM",
    payload: { name, itemType },
  };
};
