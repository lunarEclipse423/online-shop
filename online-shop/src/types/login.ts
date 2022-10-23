export enum LoggedActionTypes {
  USER = "USER",
  ADMIN = "ADMIN",
  UNAUTHORIZED = "UNAUTHORIZED",
}

export type LoginType = {
  [key: string]: string;
  username: string;
  password: string;
};

export interface LoggedAction {
  type: string;
}
