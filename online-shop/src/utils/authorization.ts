import { LoginType } from "../types/login";
import { UserType } from "../types/user";
import { getAllUsers } from "../api/ShopService";

const USER_DONT_EXIST_ERROR = "This user doesn't exist";

export const authorization = async (values: LoginType): Promise<[LoginType, string]> => {
  return new Promise((resolve) =>
    setTimeout(async () => {
      const errors: LoginType = {
        username: "",
        password: "",
      };
      const users = await getAllUsers<UserType[]>();
      let loggedInRole = "";
      users!.forEach((user: UserType) => {
        if (values.username === user.username && values.password === user.password) {
          loggedInRole = user.role;
        }
      });
      if (!loggedInRole) {
        errors["password"] = USER_DONT_EXIST_ERROR;
      }
      resolve([errors, loggedInRole]);
    }, 1000)
  );
};
