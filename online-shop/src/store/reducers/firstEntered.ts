import { EntryAction, EntryActionTypes } from "../../types/entry";

const initState = true;

const firstEnteredReducer = (state = initState, action: EntryAction): boolean => {
  switch (action.type) {
    case EntryActionTypes.FIRST:
      return false;
    default:
      return state;
  }
};

export default firstEnteredReducer;
