export const countReducer = (store = {}, action) => {
  // console.log(action.payload);
  if (action.type === "STORE_RECORDS") {
    return { ...action.payload.Counts };
  }
  return store;
};
