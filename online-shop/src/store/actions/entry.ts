import { EntryActionTypes } from "../../types/entry";

export const firstEntry = () => {
  return {
    type: EntryActionTypes.FIRST,
  };
};
