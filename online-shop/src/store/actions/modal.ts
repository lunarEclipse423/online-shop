import { ModalActionTypes } from "../../types/modal";

export const activateModal = () => {
  return {
    type: ModalActionTypes.ACTIVE,
  };
};

export const deactivateModal = () => {
  return {
    type: ModalActionTypes.DISABLED,
  };
};
