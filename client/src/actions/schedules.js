import axios from "axios";
import socketio from "socket.io-client";
import { alert, confirmAlert } from "./alerts";
// import socket from "../index";
const updateSchedule = (id, schedule) => {
  return { type: "UPDATE_SCHEDULE", payload: { id, schedule } };
};

const getSchedules = schedules => {
  return { type: "GET_SCHEDULES", payload: schedules };
};

export const startGetSchedules = () => {
  return async dispatch => {
    try {
      let schedules = await axios.get("/api/schedules", {
        withCredentials: true
      });
      schedules = schedules.data.data;
      dispatch(getSchedules(schedules));
    } catch (err) {
      alert("error", "error", err.response.data.err);
    }
  };
};

export const removeSchedule = id => {
  return { type: "REMOVE_SCHEDULE", payload: id };
};

export const startRemoveSchedule = (id, history) => {
  return async dispatch => {
    try {
      const confirm = await confirmAlert(
        "do you really want to delete this Schedule"
      );
      console.log(confirm);
      if (confirm.value) {
        await axios.delete(`/api/schedules/${id}`, {
          withCredentials: true
        });
        alert("success", "Success", "schedule deleted successfully");
        history.push("/schedules");
        dispatch(removeSchedule(id));
      }
    } catch (err) {
      alert("error", "error", err.response.data.err);
    }
  };
};

export const addSchedule = schedule => {
  return {
    type: "ADD_SCHEDULE",
    payload: schedule
  };
};

export const submitSchedule = data => {
  return async dispatch => {
    try {
      let schedule = await axios.post("/api/schedules", data, {
        withCredentials: true
      });
      alert("success", "success", "schedule added successfully");
      schedule = schedule.data.data;
      dispatch(addSchedule(schedule));
    } catch (err) {
      alert("error", "error", err.response.data.err);
    }
  };
};

export const startUpdateSchedule = (id, data) => {
  return async dispatch => {
    try {
      let schedule = await axios.put(`/api/schedules/${id}`, data, {
        withCredentials: true
      });
      alert("success", "updated successfully");
      dispatch(updateSchedule(id, schedule.data.data));
    } catch (err) {
      alert("error", "error", err.response.data.err);
    }
  };
};
export const watchSchedule = id => {
  // console.log(id);
  return dispatch => {
    const socket = socketio("/");
    socket.on(`schedules/${id}`, data => {
      dispatch(updateSchedule(id, data));
    });
  };
};

const startGetSchedule = id => {
  return async dispatch => {
    try {
      let schedule = await axios.get(`/api/schedules/${id}`, {
        withCredentials: true
      });
      schedule = schedule.data.data;
      dispatch(addSchedule(schedule));
      dispatch(watchSchedule(schedule._id));
    } catch (err) {
      alert("error", "error", err.response.data.err);
    }
  };
};

export const resetSchedules = () => {
  return { type: "RESET_SCHEDULES" };
};

export const startGetUserSchedules = schedules => {
  return dispatch => {
    dispatch(resetSchedules());
    schedules.forEach(ele => {
      dispatch(startGetSchedule(ele.scheduleId));
    });
  };
};
