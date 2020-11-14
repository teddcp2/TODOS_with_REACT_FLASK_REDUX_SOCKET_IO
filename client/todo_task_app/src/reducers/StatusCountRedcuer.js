export const statusCountReducer = (store = {}, action) => {
  if (action.type === "STORE_RECORDS") {
    return { ...action.payload.statusCounts };
  }
  return store;
};
