export enum LoggedActionTypes {
  USER = "USER",
  ADMIN = "ADMIN",
  UNAUTHORIZED = "UNAUTHORIZED",
}

export interface LoggedAction {
  type: string;
}
