export const dataReducer = (store = [], action) => {
  if (action.type === "STORE_RECORDS") {
    return [...action.payload.records];
  }
  return store;
};
