const initState = true;

const firstEnteredReducer = (state = initState, action) => {
  switch (action.type) {
    case "FIRST":
      return false;
    default:
      return state;
  }
};

export default firstEnteredReducer;
