import { LoginType } from "../types/login";
import { UserType } from "../types/user";
import { getAllUsers } from "../api/ShopService";

export const authorization = async (
  values: LoginType,
  loggedInRole: string
): Promise<[LoginType, string]> => {
  return new Promise((resolve) =>
    setTimeout(async () => {
      const errors: LoginType = {
        username: "",
        password: "",
      };
      const users = await getAllUsers<UserType[]>();
      users!.forEach((user: UserType) => {
        if (values.username === user.username && values.password === user.password) {
          loggedInRole = user.role;
        }
      });
      if (!loggedInRole) {
        errors["password"] = "This user doesnt exist";
      }
      resolve([errors, loggedInRole]);
    }, 1000)
  );
};
