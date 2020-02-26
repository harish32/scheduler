import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import schedulesReducer from "../reducers/schedules";
import userReducer from "../reducers/users";
import batchReducer from "../reducers/batches";
import loadingReducer from "../reducers/loading";

const configureStore = () => {
  const store = createStore(
    combineReducers({
      schedules: schedulesReducer,
      user: userReducer,
      batches: batchReducer,
      loading: loadingReducer
    }),
    applyMiddleware(thunk)
  );
  return store;
};

export default configureStore;
