const initState = false;

const modalReducer = (state = initState, action) => {
  switch (action.type) {
    case "ACTIVE":
      return !state;
    case "DISABLED":
      return false;
    default:
      return state;
  }
};

export default modalReducer;
