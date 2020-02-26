const loadingReducer = (state = false, action) => {
  switch (action.type) {
    case "SET_LOADING": {
      return true;
    }
    case "REMOVE_LOADING": {
      return false;
    }
    default: {
      return state;
    }
  }
};

export default loadingReducer;
