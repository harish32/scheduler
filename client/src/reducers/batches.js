const batchReducer = (state = [], action) => {
  switch (action.type) {
    case "GET_BATCHES": {
      return action.payload;
    }
    case "ADD_BATCH": {
      return [...state, action.payload];
    }
    case "UPDATE_BATCH": {
      return state.map(ele => {
        if (ele._id === action.payload.id) {
          return action.payload.data;
        }
        return ele;
      });
    }
    case "DELETE_BATCH": {
      return state.filter(ele => ele._id.toString() !== action.payload);
    }
    case "RESET_BATCHES": {
      return [];
    }
    default: {
      return [...state];
    }
  }
};

export default batchReducer;
