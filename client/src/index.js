import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import configureStore from "./store/configurestore";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";
import { startGetSchedules, startGetUserSchedules } from "./actions/schedules";
import { startGetBatches } from "./actions/batches";
import { setUser } from "./actions/users";
import { setLoading, removeLoading } from "./actions/loading";

const store = configureStore();
const getUser = async () => {
  try {
    store.dispatch(setLoading());
    const user = await axios.get("/api/getuser", {
      withCredentials: true
    });
    if (user.data.success) {
      store.dispatch(setUser(user.data.data));
      if (user.data.data.isAdmin) {
        store.dispatch(startGetSchedules());
        store.dispatch(startGetBatches());
      } else {
        store.dispatch(
          startGetUserSchedules(
            user.data.data.schedules.filter(ele => !ele.selected)
          )
        );
      }
    }
    store.dispatch(removeLoading());
  } catch (err) {
    store.dispatch(removeLoading());
    // console.log(err.response.data.err);
  }
};

getUser();

store.subscribe(() => {
  console.log(store.getState());
});

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById("root")
);

// export default socket;
