import axios from "axios";
import { alert, confirmAlert } from "./alerts";

const getBatches = batches => {
  return { type: "GET_BATCHES", payload: batches };
};

const addBatch = batch => {
  return { type: "ADD_BATCH", payload: batch };
};

export const startGetBatches = () => {
  return async dispatch => {
    try {
      let batches = await axios.get("/api/batches", {
        withCredentials: true
      });
      batches = batches.data.data;
      dispatch(getBatches(batches));
    } catch (err) {
      alert("error", "error", err.response.data.err);
    }
  };
};

export const startAddbatch = batch => {
  return async dispatch => {
    try {
      const newbatch = await axios.post("/api/batches", batch, {
        withCredentials: true
      });
      if (newbatch.data.success) {
        alert("success", "success", "batch added successfully");
        dispatch(addBatch(newbatch.data.data));
      }
    } catch (err) {
      alert("error", "error", err.response.data.err);
    }
  };
};

const updateBatch = (id, data) => {
  return { type: "UPDATE_BATCH", payload: { id, data } };
};

export const startUpdatebatch = (id, data) => {
  return async dispatch => {
    try {
      const batch = await axios.put(`/api/batches/${id}`, data, {
        withCredentials: true
      });
      if (batch.data.success) {
        alert("success", "Success", "batch updated successfully");
        dispatch(updateBatch(id, batch.data.data));
      }
    } catch (err) {
      alert("error", "error", err.response.data.err);
    }
  };
};

const removeBatch = id => {
  return { type: "DELETE_BATCH", payload: id };
};

export const startDeleteBatch = id => {
  return async dispatch => {
    try {
      const confirm = await confirmAlert(
        "do you really want to delete this batch?"
      );
      if (confirm.value) {
        const batch = await axios.delete(`/api/batches/${id}`, {
          withCredentials: true
        });
        if (batch.data.success) {
          alert("success", "batch deleted successfully");
          dispatch(removeBatch(id));
        }
      }
    } catch (err) {
      alert("error", "error", err.response.data.err);
    }
  };
};

export const resetBatches = () => {
  return { type: "RESET_BATCHES" };
};
