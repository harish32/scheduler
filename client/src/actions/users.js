import axios from "axios";
import { alert, confirmAlert } from "./alerts";
import {
  startGetSchedules,
  startGetUserSchedules,
  removeSchedule
} from "./schedules";
import { startGetBatches } from "./batches";
import { setLoading, removeLoading } from "./loading";

export const setUser = user => {
  return { type: "SET_USER", payload: user };
};

export const startGetUser = (data, props) => {
  return async dispatch => {
    try {
      dispatch(setLoading());
      const user = await axios.post("/api/user/login", data, {
        withCredentials: true
      });
      if (user.data.success) {
        dispatch(setUser(user.data.data));
        alert("success", "yayy", `welcome back ${user.data.data.name}`);
        dispatch(removeLoading());
        const loc = props.location.state
          ? props.location.state.from.pathname
          : "/";
        console.log(loc);
        props.history.push(loc);
        if (user.data.data.isAdmin) {
          dispatch(startGetSchedules());
          dispatch(startGetBatches());
        } else {
          dispatch(
            startGetUserSchedules(
              user.data.data.schedules.filter(ele => !ele.selected)
            )
          );
        }
      }
    } catch (err) {
      alert("error", "error", err.response.data.err);
    }
  };
};

export const startAddUsers = users => {
  return async dispatch => {
    try {
      const user = await axios.post("/api/users", users, {
        withCredentials: true
      });
      alert("success", "user added successfully");
    } catch (err) {
      alert("error", "error", err.response.data.err);
    }
  };
};

export const startDeleteUser = id => {
  return async dispatch => {
    try {
      const user = await axios.delete(`/api/users/${id}`, {
        withCredentials: true
      });
      alert("success", "user deleted successfully");
    } catch (err) {
      alert("error", "error", err.response.data.err);
    }
  };
};

const removeUser = () => {
  return { type: "REMOVE_USER" };
};

export const startRemoveUser = () => {
  return async dispatch => {
    try {
      await axios.get("/api/user/logout", {
        withCredentials: true
      });
      alert("success", "successfully logged out");
      dispatch(removeUser());
    } catch (err) {
      alert("error", "error", err.response.data.err);
    }
  };
};

const bookSlot = data => {
  return { type: "BOOK_SLOT", payload: data };
};

export const startBookSlot = data => {
  return async dispatch => {
    try {
      const schedule = await axios.put("/api/schedules/slots/update", data, {
        withCredentials: true
      });
      if (schedule.data.success) {
        dispatch(removeSchedule(data.scheduleId));
        const user = await axios.put("/api/users/bookslot", data, {
          withCredentials: true
        });
        if (user.data.success) {
          dispatch(bookSlot(user.data.data));
          alert("success", "yayyy", "booking success");
        }
      }
    } catch (err) {
      alert("error", "error", err.response.data.err);
    }
  };
};
