export const loaderReducer = (
  store = { show: false, text: "loading" },
  action
) => {
  if (action.type === "CHANGE_LOADER") {
    return { show: action.payload.show, text: action.payload.text };
  }
  return store;
};
