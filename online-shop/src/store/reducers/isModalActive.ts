import { ModalAction, ModalActionTypes } from "../../types/modal";

const initState = false;

const modalReducer = (state = initState, action: ModalAction): boolean => {
  switch (action.type) {
    case ModalActionTypes.ACTIVE:
      return !state;
    case ModalActionTypes.DISABLED:
      return false;
    default:
      return state;
  }
};

export default modalReducer;
