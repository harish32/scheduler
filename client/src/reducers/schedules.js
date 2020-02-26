const scheduleReducer = (state = [], action) => {
  switch (action.type) {
    case "GET_SCHEDULES": {
      return action.payload;
    }
    case "ADD_SCHEDULE": {
      return [...state, action.payload];
    }
    case "REMOVE_SCHEDULE": {
      return state.filter(ele => ele._id !== action.payload);
    }
    case "UPDATE_SCHEDULE": {
      return state.map(ele => {
        if (ele._id === action.payload.id) {
          return action.payload.schedule;
        }
        return ele;
      });
    }
    case "RESET_SCHEDULES": {
      return [];
    }
    default: {
      return [...state];
    }
  }
};

export default scheduleReducer;
