const userReducer = (state = {}, action) => {
  switch (action.type) {
    case "SET_USER": {
      return action.payload;
    }
    case "REMOVE_USER": {
      return {};
    }
    case "BOOK_SLOT": {
      return {
        ...state,
        schedules: state.schedules.map(ele => {
          if (ele.scheduleId == action.payload.scheduleId) {
            return {
              ...ele,
              selected: true,
              from: action.payload.from,
              to: action.payload.to,
              position: action.payload.position
            };
          }
          return ele;
        })
      };
    }
    default: {
      return state;
    }
  }
};

export default userReducer;
