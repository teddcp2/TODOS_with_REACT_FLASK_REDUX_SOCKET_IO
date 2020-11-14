import { combineReducers } from "redux";
import { dataReducer } from "./dataRedcuer";
import { countReducer } from "./CountRedcuer";
import { statusCountReducer } from "./StatusCountRedcuer";
import { loaderReducer } from "./loaderRedcuer";

export const RootReducer = combineReducers({
  data: dataReducer,
  counts: countReducer,
  statusCounts: statusCountReducer,
  loader: loaderReducer,
});
