export const baseImageUrl =
  "https://raw.githubusercontent.com/lunarEclipse423/online-shop-api/main/img/";

export const getAllProducts = async <T>(): Promise<T | undefined> => {
  try {
    const response = await fetch(
      "https://online-shop-api-project.herokuapp.com/products"
    );
    return response.json() as Promise<T>;
  } catch (error) {
    console.log(error);
  }
};

export const getProductById = async <T>(id: number): Promise<T | undefined> => {
  try {
    const response = await fetch(
      "https://online-shop-api-project.herokuapp.com/products/" + id
    );
    return response.json() as Promise<T>;
  } catch (error) {
    console.log(error);
  }
};

export const getAllUsers = async <T>(): Promise<T | undefined> => {
  try {
    const response = await fetch("https://online-shop-api-project.herokuapp.com/users");
    return response.json() as Promise<T>;
  } catch (error) {
    console.log(error);
  }
};
