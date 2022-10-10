const modalReducer = (state = false, action) => {
  switch (action.type) {
    case "ACTIVE":
      return !state;
    case "DISABLED":
      return false;
    default:
      return false;
  }
};

export default modalReducer;
