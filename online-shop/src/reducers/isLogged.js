const initState = "unauthorized";

const loggedReducer = (state = initState, action) => {
  switch (action.type) {
    case "USER":
      return "user";
    case "ADMIN":
      return "admin";
    case "UNAUTHORIZED":
      return "unauthorized";
    default:
      return state;
  }
};

export default loggedReducer;
