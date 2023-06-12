import { productsUrl, usersUrl } from "../constants/urls";

export const getAllProducts = async <T>(): Promise<T | undefined> => {
  try {
    const response = await fetch(productsUrl);
    return response.json() as Promise<T>;
  } catch (error) {
    console.log(error);
  }
};

export const getProductById = async <T>(id: number): Promise<T | undefined> => {
  try {
    const response = await fetch("productsUrl" + id);
    return response.json() as Promise<T>;
  } catch (error) {
    console.log(error);
  }
};

export const getAllUsers = async <T>(): Promise<T | undefined> => {
  try {
    const response = await fetch(usersUrl);
    return response.json() as Promise<T>;
  } catch (error) {
    console.log(error);
  }
};
